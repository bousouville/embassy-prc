import type { MetadataRoute } from "next";
import { getNewsSlugs } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const paths = [
    "",
    "/about",
    "/history",
    "/ambassador",
    "/consular-services",
    "/trade",
    "/culture-education",
    "/news",
    "/contact",
    "/legal",
  ];
  const today = new Date();
  const entries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  entries.push(
    ...getNewsSlugs().map((slug) => ({
      url: `${base}/news/${slug}`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );
  return entries;
}
