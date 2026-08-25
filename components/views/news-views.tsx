"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NewsCard, PageTitle } from "@/components/common";
import { useI18n } from "@/lib/i18n";
import type {
  NewsArticle,
  NewsCategory,
  NewsItem,
} from "@/lib/content";

const CATEGORIES: NewsCategory[] = ["announcement", "press", "notice"];

/** 新聞列表：分類篩選。 */
export function NewsListView({ items }: { items: NewsItem[] }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<NewsCategory | "all">("all");
  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.meta["zh-Hant"].category === filter)),
    [items, filter],
  );

  return (
    <div>
      <PageTitle title={t("meta.news")} subtitle={t("news.subtitle")} />
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            className="btn-3d"
            aria-pressed={filter === cat}
            style={
              filter === cat
                ? { fontWeight: 700, borderStyle: "inset", color: "var(--color-gold-dark)" }
                : undefined
            }
            onClick={() => setFilter(cat)}
          >
            {cat === "all" ? t("common.all") : t(`cat.${cat}` as never)}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p>{t("news.empty")}</p>
      ) : (
        visible.map((item) => <NewsCard key={item.slug} item={item} />)
      )}
    </div>
  );
}

/** 新聞詳情。 */
export function NewsDetailView({ article }: { article: NewsArticle }) {
  const { t, locale } = useI18n();
  const meta = article.meta[locale] ?? article.meta["zh-Hant"];
  const prevMeta = article.prev ? article.prev.meta[locale] ?? article.prev.meta["zh-Hant"] : null;
  const nextMeta = article.next ? article.next.meta[locale] ?? article.next.meta["zh-Hant"] : null;

  return (
    <article>
      <header className="mb-4">
        <div className="mb-1 flex flex-wrap items-center gap-3 text-[12px]">
          <span className="cat py-0.5" style={{ border: "1px solid var(--color-gold)", color: "var(--color-gold-dark)", padding: "0 6px", fontWeight: 700 }}>
            {t(`cat.${meta.category}` as never)}
          </span>
          <span className="date" style={{ fontFamily: "var(--font-latin)", color: "var(--color-ink-soft)" }}>
            {meta.date}
          </span>
        </div>
        <h1 className="page-title">{meta.title}</h1>
        <p className="page-subtitle mt-2">{meta.excerpt}</p>
      </header>

      <div
        className="prose-gov"
        lang={locale === "en" ? "en" : undefined}
        dangerouslySetInnerHTML={{ __html: article.html[locale] }}
      />

      <hr className="dashed-sep" />
      <div className="flex flex-col gap-1 text-[12.5px]">
        {article.prev && (
          <div>
            {t("common.prev")}：<Link href={`/news/${article.prev.slug}`}>{prevMeta?.title}</Link>
          </div>
        )}
        {article.next && (
          <div>
            {t("common.next")}：<Link href={`/news/${article.next.slug}`}>{nextMeta?.title}</Link>
          </div>
        )}
        <div>
          <Link href="/news">← {t("common.backToList")}</Link>
        </div>
      </div>
    </article>
  );
}
