"use client";

import { AlertBox, AnchorMenu, PageTitle, ProseArticle } from "@/components/common";
import { useI18n } from "@/lib/i18n";
import type { LocalizedDoc } from "@/lib/content";
import { SITE } from "@/lib/site";

type Doc = LocalizedDoc;

export interface ConsularData {
  visa: Doc;
  passport: Doc;
  notarization: Doc;
  protection: Doc;
}

/** 領事服務：錨點導航 + 四個專節 + 緊急求助框。 */
export function ConsularView({ data }: { data: ConsularData }) {
  const { t } = useI18n();
  const menu = [
    { id: "visa", label: t("consular.anchor.visa") },
    { id: "passport", label: t("consular.anchor.passport") },
    { id: "notarization", label: t("consular.anchor.notarization") },
    { id: "protection", label: t("consular.anchor.protection") },
  ];

  return (
    <div>
      <PageTitle title={t("meta.consular")} />
      <AnchorMenu items={menu} />

      <AlertBox title={t("alert.protection")}>
        {t("alert.protectionDesc")} <b lang="en">{SITE.protectionPhone}</b>
      </AlertBox>

      {menu.map((m, i) => {
        const key = m.id as keyof ConsularData;
        return (
          <section key={m.id} id={m.id} className="scroll-mt-4">
            <h2 className="panel-title">{m.label}</h2>
            <ProseArticle doc={data[key]} />
            {i < menu.length - 1 && <hr className="dashed-sep" />}
          </section>
        );
      })}
    </div>
  );
}
