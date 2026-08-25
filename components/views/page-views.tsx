"use client";

import { InfoNote, PageTitle, ProseArticle } from "@/components/common";
import { useI18n } from "@/lib/i18n";
import type { LocalizedDoc } from "@/lib/content";
import { SITE } from "@/lib/site";

type Doc = LocalizedDoc;

/* ── 使館簡介 ──────────────────────────────────────────────── */
export function AboutView({ doc }: { doc: Doc }) {
  const { t } = useI18n();
  return (
    <div>
      <PageTitle title={t("meta.about")} />
      <ProseArticle doc={doc} />
    </div>
  );
}

/* ── 雙邊關係與使館歷史 ────────────────────────────────────── */
export function HistoryView({ doc }: { doc: Doc }) {
  const { t } = useI18n();
  const images = [
    {
      src: "/images/emblem-256.png",
      width: 120,
      height: 120,
      caption: t("img.emblem"),
      flag: false,
    },
    {
      src: "/images/flag.png",
      width: 132,
      height: 88,
      caption: t("img.flag"),
      flag: true,
    },
    {
      src: "/images/crests/foreign-affairs.jpg",
      width: 120,
      height: 120,
      caption: t("img.mfa"),
      flag: false,
    },
  ];
  return (
    <div>
      <PageTitle title={t("meta.history")} />
      <div className="mb-5 flex flex-wrap items-center justify-center gap-6">
        {images.map((img) => (
          <figure key={img.src} className="m-0 text-center">
            {img.flag ? (
              <span className="flag-frame inline-block" style={{ height: 96 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.caption}
                  width={img.width}
                  height={img.height}
                />
              </span>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={img.src}
                alt={img.caption}
                width={img.width}
                height={img.height}
                className="gold-frame inline-block"
                style={{ maxWidth: img.width }}
              />
            )}
            <figcaption className="frame-caption">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
      <ProseArticle doc={doc} />
    </div>
  );
}

/* ── 大使致辭 ──────────────────────────────────────────────── */
export function AmbassadorView({
  message,
  bio,
  former,
}: {
  message: Doc;
  bio: Doc;
  former: Doc;
}) {
  const { t } = useI18n();
  return (
    <div>
      <PageTitle title={t("meta.ambassador")} />
      <div className="mb-4 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/crests/foreign-affairs.jpg"
          alt={t("ambassador.crestCaption")}
          width={132}
          height={132}
          className="gold-frame inline-block"
        />
        <figcaption className="frame-caption">{t("ambassador.crestCaption")}</figcaption>
      </div>
      <ProseArticle doc={message} />
      <hr className="dashed-sep" />
      <ProseArticle doc={bio} />
      <hr className="dashed-sep" />
      <ProseArticle doc={former} />
    </div>
  );
}

/* ── 經貿合作 ──────────────────────────────────────────────── */
export function TradeView({ doc }: { doc: Doc }) {
  const { t } = useI18n();
  return (
    <div>
      <PageTitle title={t("meta.trade")} />
      <InfoNote>
        <b>{t("trade.contactTitle")}</b>：
        <a href={`mailto:${SITE.emails.commercial}`}>{SITE.emails.commercial}</a>
        {" · "}
        <span lang="en">{SITE.phone}</span>
      </InfoNote>
      <div className="mt-4">
        <ProseArticle doc={doc} />
      </div>
    </div>
  );
}

/* ── 文化教育交流 ──────────────────────────────────────────── */
export function CultureView({ doc }: { doc: Doc }) {
  const { t } = useI18n();
  return (
    <div>
      <PageTitle title={t("meta.culture")} />
      <InfoNote>
        <b>{t("culture.contactTitle")}</b>：
        <a href={`mailto:${SITE.emails.general}`}>{SITE.emails.general}</a>
        {" · "}
        <span lang="en">{SITE.phone}</span>
      </InfoNote>
      <div className="mt-4">
        <ProseArticle doc={doc} />
      </div>
    </div>
  );
}

/* ── 網站聲明 ──────────────────────────────────────────────── */
export function LegalView({ doc }: { doc: Doc }) {
  const { t } = useI18n();
  return (
    <div>
      <PageTitle title={t("meta.legal")} />
      <ProseArticle doc={doc} />
    </div>
  );
}
