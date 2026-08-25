/**
 * SERVER-ONLY module. Loads MDX content (content/**) from disk and compiles
 * it to static HTML for pages. Client components must never import this
 * module at runtime (type-only imports are erased).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALES,
  type Locale,
} from "./locale";

export type NewsCategory = "announcement" | "press" | "notice";

export interface NewsMeta {
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  category: NewsCategory;
}

export interface NewsItem {
  slug: string;
  date: string;
  meta: Record<Locale, NewsMeta>;
}

export interface NewsArticle extends NewsItem {
  html: Record<Locale, string>;
  index: number;
  prev: { slug: string; meta: Record<Locale, NewsMeta> } | null;
  next: { slug: string; meta: Record<Locale, NewsMeta> } | null;
}

export interface LocalizedDoc {
  meta: Record<Locale, Record<string, unknown>>;
  html: Record<Locale, string>;
}

interface ParsedEntry {
  collection: string;
  slug: string;
  locale: Locale;
  data: Record<string, unknown>;
  content: string;
}

/* ── loader (sync, runs in the Node server runtime) ───────── */

const CONTENT_ROOT = path.join(process.cwd(), "content");

function walkMdx(dir: string, out: string[]): void {
  let names: fs.Dirent[];
  try {
    names = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const name of names) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walkMdx(full, out);
    else if (name.name.endsWith(".mdx")) out.push(full);
  }
}

function normalizeData(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...data };
  for (const key of Object.keys(out)) {
    const value = out[key];
    // YAML parses bare dates like 2026-08-25 as Date objects; normalise to ISO day strings.
    if (value instanceof Date) out[key] = value.toISOString().slice(0, 10);
  }
  return out;
}

function parseAll(): ParsedEntry[] {
  const files: string[] = [];
  walkMdx(CONTENT_ROOT, files);
  const entries: ParsedEntry[] = [];
  for (const file of files) {
    const rel = path.relative(CONTENT_ROOT, file).split(path.sep).join("/");
    const m = rel.match(/^([^/]+)\/(?:([^/]+)\/)?([^/.]+)\.mdx$/);
    if (!m) continue;
    const [, collection, sub, localeRaw] = m;
    if (collection.startsWith("_")) continue;
    if (!isLocale(localeRaw)) continue;
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    entries.push({
      collection,
      slug: sub ?? "",
      locale: localeRaw,
      data: normalizeData(data),
      content,
    });
  }
  return entries;
}

let ENTRIES: ParsedEntry[] | null = null;

function entries(): ParsedEntry[] {
  if (!ENTRIES) ENTRIES = parseAll();
  return ENTRIES;
}

/* ── compiler (cached) ────────────────────────────────────── */

const htmlCache = new Map<string, Promise<string>>();

function renderHtml(source: string): Promise<string> {
  let pending = htmlCache.get(source);
  if (!pending) {
    pending = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: "append",
        content: { type: "text", value: "#" },
      })
      .use(rehypeStringify)
      .process(source)
      .then((file) => String(file));
    htmlCache.set(source, pending);
  }
  return pending;
}

function entriesOf(collection: string, slug?: string): ParsedEntry[] {
  return entries().filter(
    (e) =>
      e.collection === collection &&
      (slug === undefined ? e.slug === "" : e.slug === slug),
  );
}

function pickEntry(
  items: ParsedEntry[],
  locale: Locale,
): ParsedEntry | undefined {
  return (
    items.find((e) => e.locale === locale) ??
    items.find((e) => e.locale === DEFAULT_LOCALE)
  );
}

/* ── document getters ─────────────────────────────────────── */

export async function getDoc(
  collection: string,
  slug?: string,
): Promise<LocalizedDoc | null> {
  const items = entriesOf(collection, slug);
  if (items.length === 0) return null;
  const meta = {} as Record<Locale, Record<string, unknown>>;
  const html = {} as Record<Locale, string>;
  for (const locale of LOCALES) {
    const entry = pickEntry(items, locale);
    meta[locale] = entry?.data ?? {};
    html[locale] = entry ? await renderHtml(entry.content) : "";
  }
  return { meta, html };
}

/* ── news ─────────────────────────────────────────────────── */

const NEWS_CATEGORIES: readonly NewsCategory[] = [
  "announcement",
  "press",
  "notice",
];

function isNewsMeta(data: Record<string, unknown>): data is NewsMeta &
  Record<string, unknown> {
  return (
    typeof data.title === "string" &&
    typeof data.excerpt === "string" &&
    typeof data.date === "string" &&
    NEWS_CATEGORIES.includes(data.category as NewsCategory)
  );
}

export function getNewsIndex(): NewsItem[] {
  const bySlug = new Map<string, NewsItem>();
  for (const entry of entries()) {
    if (entry.collection !== "news" || !entry.slug) continue;
    const item = bySlug.get(entry.slug) ?? {
      slug: entry.slug,
      date: "",
      meta: {} as Record<Locale, NewsMeta>,
    };
    item.meta[entry.locale] = isNewsMeta(entry.data)
      ? entry.data
      : { title: entry.slug, excerpt: "", date: "", category: "notice" };
    if (entry.locale === DEFAULT_LOCALE) {
      item.date = item.meta[DEFAULT_LOCALE].date;
    }
    bySlug.set(entry.slug, item);
  }
  return [...bySlug.values()]
    .map((item) => ({
      ...item,
      date:
        (item.date ||
          Object.values(item.meta)
            .map((m) => m.date)
            .sort()
            .at(-1)) ?? "",
    }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getNewsArticle(
  slug: string,
): Promise<NewsArticle | null> {
  const index = getNewsIndex();
  const found = index.findIndex((item) => item.slug === slug);
  if (found === -1) return null;
  const html = {} as Record<Locale, string>;
  for (const locale of LOCALES) {
    const entry = pickEntry(entriesOf("news", slug), locale);
    html[locale] = entry ? await renderHtml(entry.content) : "";
  }
  const prev = index[found + 1] ?? null;
  const next = index[found - 1] ?? null;
  return {
    ...index[found],
    html,
    index: found,
    prev: prev ? { slug: prev.slug, meta: prev.meta } : null,
    next: next ? { slug: next.slug, meta: next.meta } : null,
  };
}

export function getNewsSlugs(): string[] {
  return getNewsIndex().map((item) => item.slug);
}
