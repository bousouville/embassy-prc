"use client";

import Link from "next/link";
import { NewsCard } from "@/components/common";
import { useI18n } from "@/lib/i18n";
import type { NewsItem } from "@/lib/content";
import { SITE } from "@/lib/site";

/** 首頁：公告滾動條、快捷服務、最新公告、使館信息、緊急聯繫。 */
export function HomeView({ news }: { news: NewsItem[] }) {
  const { t } = useI18n();
  const marqueeItems = news.slice(0, 6);
  const latest = news.slice(0, 3);

  const quick = [
    {
      href: "/consular-services#visa",
      mark: "簽",
      title: t("home.quick.visa"),
      desc: t("home.quick.visaDesc"),
    },
    {
      href: "/consular-services#passport",
      mark: "證",
      title: t("home.quick.passport"),
      desc: t("home.quick.passportDesc"),
    },
    {
      href: "/trade",
      mark: "貿",
      title: t("home.quick.trade"),
      desc: t("home.quick.tradeDesc"),
    },
    {
      href: "/culture-education",
      mark: "文",
      title: t("home.quick.culture"),
      desc: t("home.quick.cultureDesc"),
    },
  ];

  return (
    <div className="space-y-5">
      {/* 公告滾動條 */}
      <section aria-label={t("home.latestTitle")} className="marquee">
        <span className="label">{t("home.latestTitle")}</span>
        <div className="viewport">
          <div className="track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => {
              const meta = item.meta["zh-Hant"];
              const hidden = i >= marqueeItems.length;
              return (
                <a
                  key={`${item.slug}-${i}`}
                  href={`/news/${item.slug}`}
                  aria-hidden={hidden || undefined}
                  tabIndex={hidden ? -1 : undefined}
                >
                  {meta.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 快捷服務 */}
      <section>
        <h2 className="panel-title">{t("home.quickTitle")}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quick.map((q) => (
            <Link key={q.href} href={q.href} className="quick-box">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--color-gold)] bg-[#f6edd2] text-[15px] font-bold text-[var(--color-navy-deep)]">
                  {q.mark}
                </span>
                <span className="qt">{q.title}</span>
              </div>
              <div className="qd mt-2">{q.desc}</div>
              <div className="mt-2 text-right text-[11.5px] text-[var(--color-gold-dark)]">
                {t("common.more")}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新公告 */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="panel-title mb-0">{t("home.latestTitle")}</h2>
          <Link href="/news" className="text-[12.5px]">
            {t("common.more")}
          </Link>
        </div>
        {latest.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </section>

      {/* 使館信息 */}
      <section>
        <h2 className="panel-title">{t("home.embassyInfoTitle")}</h2>
        <table className="gov-table">
          <tbody>
            <tr>
              <td className="key">{t("home.info.address")}</td>
              <td>
                {SITE.addressZh}（{SITE.postalCode}）
              </td>
            </tr>
            <tr>
              <td className="key">{t("home.info.phone")}</td>
              <td lang="en">
                {SITE.phone} / {SITE.fax}（{t("home.info.fax")}）
              </td>
            </tr>
            <tr>
              <td className="key">{t("home.info.hours")}</td>
              <td>{t("home.infoHours")}</td>
            </tr>
            <tr>
              <td className="key">{t("home.info.protection")}</td>
              <td lang="en">{SITE.protectionPhone}</td>
            </tr>
            <tr>
              <td className="key">{t("contact.emailSection")}</td>
              <td>
                <a href={`mailto:${SITE.emails.general}`}>{SITE.emails.general}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 緊急聯繫 */}
      <div className="alert-box" role="note">
        <div className="title">{t("home.emergencyTitle")}</div>
        <div className="text-[12.5px]">
          {t("home.emergencyDesc")}
          <br />
          <b lang="en">{SITE.protectionPhone}</b>（{t("sidebar.hotDesc")}）
        </div>
      </div>
    </div>
  );
}
