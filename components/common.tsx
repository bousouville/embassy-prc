"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import type { NewsItem, LocalizedDoc } from "@/lib/content";

/* ── page title ───────────────────────────────────────────── */

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-4">
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle mt-1">{subtitle}</p>}
    </header>
  );
}

/* ── prose (MDX html) ─────────────────────────────────────── */

export function ProseArticle({ doc }: { doc: LocalizedDoc }) {
  const { locale } = useI18n();
  return (
    <article
      className="prose-gov"
      lang={locale === "en" ? "en" : undefined}
      dangerouslySetInnerHTML={{ __html: doc.html[locale] }}
    />
  );
}

/* ── news card ────────────────────────────────────────────── */

export function NewsCard({ item }: { item: NewsItem }) {
  const { locale, t } = useI18n();
  const meta = item.meta[locale] ?? item.meta["zh-Hant"];
  return (
    <Link href={`/news/${item.slug}`} className="news-card block">
      <span className="flex items-baseline gap-3">
        <span className="cat">{t(`cat.${meta.category}` as never)}</span>
        <span className="title flex-1">{meta.title}</span>
        <span className="date">{meta.date}</span>
      </span>
      <span className="excerpt block">{meta.excerpt}</span>
    </Link>
  );
}

/* ── boxes ────────────────────────────────────────────────── */

export function InfoNote({ children }: { children: ReactNode }) {
  return <div className="info-note">{children}</div>;
}

export function AlertBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="alert-box" role="note">
      <div className="title">{title}</div>
      <div className="mt-1 text-[12.5px]">{children}</div>
    </div>
  );
}

/* ── anchor menu (consular etc.) ──────────────────────────── */

export function AnchorMenu({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <div className="side-panel mb-4">
      <div className="panel-body">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="btn-3d" style={{ margin: 0 }}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Resolve a localized field from a locales map (client-safe). */
export function pick<T>(map: Partial<Record<Locale, T>>, locale: Locale): T | undefined {
  return map[locale] ?? map["zh-Hant"];
}
