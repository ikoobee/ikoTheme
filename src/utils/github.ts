/**
 * Real GitHub activity for the about-page heatmap (last ~26 weeks).
 *
 * Layered fetch strategy, all official endpoints, no third-party services:
 *  1. GraphQL contributionsCalendar  — exact per-day counts; used when
 *     GITHUB_TOKEN is set (local or CI secret)
 *  2. REST /users/:u/events/public   — anonymous, no token needed, but
 *     GitHub only exposes the most recent ~90 days
 *  3. data/github-contributions.json — committed snapshot from the last
 *     successful fetch (kept fresh by local builds) so CI/limited builds
 *     still show real data
 *  4. deterministic placeholder      — flagged "示意" in the UI
 *
 * A committed snapshot younger than 24h short-circuits the network entirely
 * (renders must never block on api.github.com — set GITHUB_HEAT_REFRESH=1 to
 * force a re-fetch); any successful fetch rewrites the snapshot.
 */
import fs from "node:fs";
import path from "node:path";

export interface HeatDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: number; // 0-4
}
export type HeatSource = "graphql" | "rest" | "snapshot" | "demo";

const WEEKS = 26;
const SNAPSHOT = "data/github-contributions.json";

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function buildRange(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setUTCHours(12, 0, 0, 0);
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - (WEEKS * 7 - 1));
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    days.push(d);
  }
  return days;
}

function toLevels(counts: Map<string, number>): HeatDay[] {
  const max = Math.max(1, ...counts.values());
  return buildRange().map((d) => {
    const key = dayKey(d);
    const count = counts.get(key) ?? 0;
    const level = count === 0 ? 0 : Math.min(4, Math.ceil((count / max) * 4));
    return { date: key, count, level };
  });
}

async function fetchGraphQL(handle: string, from: Date, to: Date): Promise<Map<string, number> | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  const query = `query($u:String!,$from:DateTime!,$to:DateTime!){
    user(login:$u){
      contributionsCollection(from:$from,to:$to){
        contributionCalendar{
          weeks{ contributionDays{ date contributionCount } }
        }
      }
    }
  }`;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { u: handle, from: from.toISOString(), to: to.toISOString() },
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const weeks =
      (await res.json())?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
    const counts = new Map<string, number>();
    for (const w of weeks) {
      for (const day of w.contributionDays ?? []) {
        if (day.contributionCount > 0) counts.set(day.date, day.contributionCount);
      }
    }
    return counts;
  } catch {
    return null;
  }
}

async function fetchRest(handle: string): Promise<Map<string, number> | null> {
  const counts = new Map<string, number>();
  try {
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/users/${handle}/events/public?per_page=100&page=${page}`,
        {
          headers: { accept: "application/vnd.github+json", "user-agent": "ikoTheme" },
          signal: AbortSignal.timeout(4000),
        },
      );
      if (!res.ok) return null;
      const events = (await res.json()) as Array<{
        type: string;
        created_at: string;
        payload?: { size?: number };
      }>;
      if (!events.length) break;
      for (const ev of events) {
        const day = ev.created_at.slice(0, 10);
        const add =
          ev.type === "PushEvent" ? Math.max(1, ev.payload?.size ?? 1) : 1;
        counts.set(day, (counts.get(day) ?? 0) + add);
      }
    }
    return counts;
  } catch {
    return null;
  }
}

interface Snapshot {
  fetchedAt: string;
  days: { date: string; count: number }[];
}

function readSnapshotRaw(): Snapshot | null {
  try {
    const snap = JSON.parse(fs.readFileSync(path.resolve(SNAPSHOT), "utf8")) as Snapshot;
    return Array.isArray(snap.days) ? snap : null;
  } catch {
    return null;
  }
}
function readSnapshot(): Map<string, number> | null {
  const snap = readSnapshotRaw();
  if (!snap) return null;
  return new Map(snap.days.filter((d) => d.count > 0).map((d) => [d.date, d.count]));
}
function readSnapshotMeta(): string {
  return readSnapshotRaw()?.fetchedAt ?? new Date(0).toISOString();
}

function writeSnapshot(counts: Map<string, number>) {
  const file = path.resolve(SNAPSHOT);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const snap: Snapshot = {
    fetchedAt: new Date().toISOString(),
    days: [...counts.entries()].map(([date, count]) => ({ date, count })),
  };
  fs.writeFileSync(file, JSON.stringify(snap, null, 2) + "\n");
}

function demoCounts(): Map<string, number> {
  // deterministic placeholder so the layout never breaks offline
  const counts = new Map<string, number>();
  for (const d of buildRange()) {
    const lv = (d.getUTCFullYear() + d.getUTCMonth() * 31 + d.getUTCDate() * 7) % 5;
    if (lv > 0) counts.set(dayKey(d), lv);
  }
  return counts;
}

export async function githubHeat(
  handle: string,
): Promise<{ days: HeatDay[]; source: HeatSource; range: string }> {
  const days = buildRange();
  const from = days[0]!;
  const to = days[days.length - 1]!;
  const range = `${dayKey(from)} ~ ${dayKey(to)}`;

  // fresh committed snapshot (<24h, no GITHUB_HEAT_REFRESH) skips the network
  // entirely so page renders never block on api.github.com
  const force = process.env.GITHUB_HEAT_REFRESH === "1";
  const snap = readSnapshot();
  const snapAge = snap ? Date.now() - new Date(readSnapshotMeta()).getTime() : Infinity;
  if (snap && !force && snapAge < 24 * 3600 * 1000) {
    return { days: toLevels(snap), source: "snapshot", range };
  }

  let counts = await fetchGraphQL(handle, from, to);
  let source: HeatSource = "graphql";
  if (!counts) {
    counts = await fetchRest(handle);
    source = "rest";
  }
  if (counts) {
    writeSnapshot(counts);
    return { days: toLevels(counts), source, range };
  }

  if (snap) {
    return { days: toLevels(snap), source: "snapshot", range };
  }

  return { days: toLevels(demoCounts()), source: "demo", range };
}
