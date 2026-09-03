import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { CATEGORIES } from "./config/site";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    desc: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    desc: z.string().max(200),
    date: z.coerce.date(),
    status: z.enum(["wip", "stable", "active", "beta", "maintenance", "archived"]),
    tech: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    license: z.string().default("MIT"),
    featured: z.boolean().default(false),
  }),
});

const moments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/moments" }),
  schema: z.object({
    text: z.string().max(300),
    date: z.coerce.date(),
  }),
});

const friends = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/friends" }),
  schema: z.object({
    name: z.string(),
    desc: z.string(),
    url: z.string().url(),
    avatar: z.string().optional(),
  }),
});

export const collections = { posts, projects, moments, friends };
