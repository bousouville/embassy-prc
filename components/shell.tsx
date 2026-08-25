"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, useI18n } from "@/lib/i18n";
import {
  COOKIE_NAME,
  LOCALE_LABELS,
  LOCALES,
  type Locale,
} from "@/lib/locale";
import { SITE } from "@/lib/site";

/* ── helpers ──────────────────────────────────────────────── */

const NAV_ITEMS: { href: string; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/history", key: "history" },
  { href: "/ambassador", key: "ambassador" },
  { href: "/consular-services", key: "consular" },
  { href: "/trade", key: "trade" },
  { href: "/culture-education", key: "culture" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/news") return pathname.startsWith("/news");
  return pathname === href;
}

function sectionLabel(pathname: string, t: ReturnType<typeof useI18n>["t"]) {
  const seg = pathname.split("/")[1] ?? "";
  if (seg === "") return null;
  const match = NAV_ITEMS.find(
    (n) => n.href === `/${seg}` || (n.href === "/news" && seg === "news"),
  );
  if (!match) return pathname;
  return t(`nav.${match.key}` as never);
}

/* ── locale switcher (retro link style) ───────────────────── */

function LocaleSwitcher({ compact }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  return (
    <span className="inline-flex items-center">
      {LOCALES.map((l: Locale, i: number) => (
        <span key={l} className="inline-flex items-center">
          {i > 0 && <span className="sep" aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            className={
              l === locale
                ? "font-bold text-[#e8c96a] underline"
                : "hover:text-white hover:underline"
            }
            lang={l === "en" ? "en" : undefined}
            aria-current={l === locale ? "true" : undefined}
            style={{ background: "none", border: 0, padding: "0 2px", font: "inherit", cursor: "pointer", color: "inherit" }}
          >
            {compact ? LOCALE_LABELS[l] : l === "en" ? "ENGLISH" : l === "zh-Hant" ? "繁體版" : "簡體版"}
          </button>
        </span>
      ))}
    </span>
  );
}

/* ── toolbar ──────────────────────────────────────────────── */

function Toolbar() {
  const { t } = useI18n();

  const setHomePage = () => {
    try {
      // Classic IE-era API; silently unused in modern browsers.
      (window as unknown as { external?: { setHomePage?: (u: string) => void } })
        .external?.setHomePage?.(location.href);
    } catch {
      /* not supported */
    }
  };

  const addFavourite = () => {
    try {
      const ext = (
        window as unknown as { external?: { AddFavorite?: (u: string, t: string) => void } }
      ).external;
      if (ext?.AddFavorite) {
        ext.AddFavorite(location.href, document.title);
        return;
      }
    } catch {
      /* fall through */
    }
    alert(t("toolbar.favHint"));
  };

  return (
    <div className="toolbar">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-4 py-1">
        <span className="flex items-center">
          <span>{t("toolbar.hotline")}：</span>
          <a
            href={`tel:${SITE.protectionPhone.replace(/[^+\d]/g, "")}`}
            className="font-bold"
            lang="en"
          >
            {SITE.protectionPhone}
          </a>
        </span>
        <span className="flex items-center">
          <button type="button" onClick={setHomePage} style={{ background: "none", border: 0, padding: "0 2px", font: "inherit", cursor: "pointer", color: "inherit" }}>
            {t("toolbar.setHome")}
          </button>
          <span className="sep" aria-hidden="true">|</span>
          <button type="button" onClick={addFavourite} style={{ background: "none", border: 0, padding: "0 2px", font: "inherit", cursor: "pointer", color: "inherit" }}>
            {t("toolbar.addFav")}
          </button>
          <span className="sep" aria-hidden="true">|</span>
          <LocaleSwitcher />
        </span>
      </div>
    </div>
  );
}

/* ── banner ───────────────────────────────────────────────── */

function Banner() {
  const { t } = useI18n();
  return (
    <div className="banner">
      <div className="mx-auto flex max-w-[960px] items-center gap-4">
        <Link href="/" aria-label={SITE.nameZhShort}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/emblem-128.png"
            alt=""
            width={88}
            height={88}
            className="brand-emblem h-[88px] w-[88px]"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="brand-zh">{SITE.nameZh}</div>
          <div className="brand-latin mt-1">
            Embassy of the Republic of Bousoville in the People&apos;s Republic
            of China
          </div>
          <div className="brand-motto mt-1">
            「{SITE.mottoZh}」— {SITE.mottoEn}
          </div>
        </div>
        <div className="hidden shrink-0 sm:block">
          <Link
            href="/history"
            className="anniversary-seal block"
            aria-label={t("home.anniversary")}
          >
            {t("home.anniversaryShort")}
            <small>1960 — 2026</small>
          </Link>
        </div>
        <Link href="/history" className="shrink-0" aria-label={t("meta.history")}>
          <span className="flag-frame h-[74px]" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/flag-og.png" alt="" width={43} height={64} />
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ── main nav ─────────────────────────────────────────────── */

function MainNav() {
  const pathname = usePathname();
  const { t } = useI18n();
  return (
    <nav aria-label="主導覽" className="mainnav">
      <ul className="mx-auto flex max-w-[960px] list-none items-stretch px-3 py-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="flex">
            <Link
              href={item.href}
              className={isActive(item.href, pathname) ? "active" : undefined}
            >
              {t(`nav.${item.key}` as never)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── breadcrumb ───────────────────────────────────────────── */

export function Breadcrumb() {
  const pathname = usePathname();
  const { t } = useI18n();
  const label = sectionLabel(pathname, t);
  return (
    <div className="crumb">
      {t("crumb.here")}：
      <Link href="/">{t("crumb.home")}</Link>
      {label && (
        <>
          <span aria-hidden="true"> &gt; </span>
          <span>{label}</span>
        </>
      )}
    </div>
  );
}

/* ── sidebar ──────────────────────────────────────────────── */

function Sidebar() {
  const { t } = useI18n();
  const services = [
    { href: "/consular-services#visa", key: "visa" },
    { href: "/consular-services#passport", key: "passport" },
    { href: "/consular-services#notarization", key: "notarization" },
    { href: "/consular-services#protection", key: "protection" },
  ];
  const related = [
    {
      href: `https://${SITE.domain}/`,
      key: "govSite",
    },
    {
      href: `https://${SITE.domain}/en/government/ministries/foreign-affairs/`,
      key: "mfa",
    },
    {
      href: `https://${SITE.domain}/services/crown-witness/`,
      key: "crownDesk",
    },
    {
      href: `https://${SITE.domain}/foreign-affairs/`,
      key: "specialRegime",
    },
  ];
  return (
    <aside className="w-[212px] shrink-0 space-y-4">
      <div className="side-panel">
        <h3 className="panel-title">
          {t("sidebar.commonServices")}
          <span className="deco" aria-hidden="true"><i /><i /><i /></span>
        </h3>
        <div className="panel-body">
          <ul className="list-none space-y-1.5">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-[13px]">
                  → {t(`sidebar.${s.key}` as never)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hotline-box">
        <div className="text-[12px] font-bold text-[#a03030]">
          {t("sidebar.hotTitle")}
        </div>
        <div className="text-[11.5px] text-[#6b4a12]">{t("sidebar.hotDesc")}</div>
        <div className="num mt-1">{SITE.protectionPhone}</div>
      </div>

      <div className="side-panel">
        <h3 className="panel-title">
          {t("sidebar.relatedTitle")}
          <span className="deco" aria-hidden="true"><i /><i /><i /></span>
        </h3>
        <div className="panel-body">
          <ul className="list-none space-y-1.5">
            {related.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px]"
                >
                  {t(`sidebar.${r.key}` as never)} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="side-panel">
        <h3 className="panel-title">
          {t("home.embassyInfoTitle")}
          <span className="deco" aria-hidden="true"><i /><i /><i /></span>
        </h3>
        <div className="panel-body">
          <p className="my-0 text-[12px] leading-relaxed">
            <b>{t("home.info.address")}</b>：{SITE.addressZh}
            <br />
            <b>{t("home.info.phone")}</b>：
            <span lang="en">{SITE.phone}</span>
            <br />
            <b>{t("home.info.fax")}</b>：
            <span lang="en">{SITE.fax}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}

/* ── visitor counter ──────────────────────────────────────── */

function VisitorCounter() {
  /** Decorative base figure; only the last visit count is stored locally. */
  const BASE_VISITS = 24861932;
  const [count, setCount] = useState(BASE_VISITS);
  useEffect(() => {
    let local = 0;
    try {
      local = parseInt(window.localStorage.getItem("bousoville-visits") ?? "0", 10) || 0;
      window.localStorage.setItem("bousoville-visits", String(local + 1));
    } catch {
      /* storage unavailable */
    }
    setCount(BASE_VISITS + local + 1);
  }, []);
  return (
    <span className="counter" lang="en">
      {String(count).padStart(8, "0")}
    </span>
  );
}

/* ── footer ───────────────────────────────────────────────── */

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-6 px-5 py-5 sm:grid-cols-3">
        <div>
          <h4>{t("sidebar.menu")}</h4>
          {NAV_ITEMS.filter((n) => n.href !== "/").map((n) => (
            <Link key={n.href} href={n.href}>
              {t(`nav.${n.key}` as never)}
            </Link>
          ))}
        </div>
        <div>
          <h4>{t("meta.contact")}</h4>
          <p className="my-0 text-[12px] leading-relaxed">
            {SITE.addressZh} {SITE.postalCode}
            <br />
            {t("home.info.phone")}：<span lang="en">{SITE.phone}</span>
            <br />
            {t("home.info.fax")}：<span lang="en">{SITE.fax}</span>
            <br />
            {t("home.info.hours")}
            <br />
            {t("home.emergencyTitle")}：<span lang="en">{SITE.protectionPhone}</span>
          </p>
        </div>
        <div>
          <h4>{t("sidebar.relatedTitle")}</h4>
          <a href={`https://${SITE.domain}/`} target="_blank" rel="noopener noreferrer">
            {t("sidebar.govSite")} ↗
          </a>
          <a
            href={`https://${SITE.domain}/en/government/ministries/foreign-affairs/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sidebar.mfa")} ↗
          </a>
          <a
            href={`https://${SITE.domain}/services/crown-witness/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sidebar.crownDesk")} ↗
          </a>
          <span className="text-[11.5px] text-[var(--color-ink-soft)]">
            © 1960–2026 {SITE.nameZh}
          </span>
        </div>
      </div>
      <div className="footer-bar">
        <div>
          © 1960–2026 {SITE.nameZh} · {t("footer.copyright")}
        </div>
        <div>{t("footer.relationsSince")}</div>
        <div>{t("footer.siteSince")}</div>
        <div>
          {t("footer.runBy")} · {t("footer.webmaster")}：
          <a href={`mailto:${SITE.emails.webmaster}`}>{SITE.emails.webmaster}</a>
        </div>
        <div>
          {t("footer.bestView")} · {t("footer.visitor")}{" "}
          <VisitorCounter /> {t("footer.visitorTail")}
        </div>
        <div className="text-[11px]">{t("footer.officialNote")}</div>
      </div>
    </footer>
  );
}

/* ── shell ────────────────────────────────────────────────── */

export function Shell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const contentKey = pathname;

  return (
    <div className="site-skin">
      <a className="skip-link" href="#main">
        {t("common.skip")}
      </a>
      <Toolbar />
      <Banner />
      <MainNav />
      <Breadcrumb />
      <div className="flex gap-5 px-4 pb-10 pt-4">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main id="main" className="min-w-0 flex-1" key={contentKey}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

/* Export a helper to read the persisted locale on the server. */
export { COOKIE_NAME, DEFAULT_LOCALE };
