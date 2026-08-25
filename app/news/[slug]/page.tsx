import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetailView } from "@/components/views/news-views";
import { getNewsArticle, getNewsSlugs } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return {};
  const meta = article.meta["zh-Hant"];
  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: { title: meta.title, description: meta.excerpt, type: "article" },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();
  return <NewsDetailView article={article} />;
}
