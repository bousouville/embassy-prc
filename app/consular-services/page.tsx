import type { Metadata } from "next";
import { ConsularView } from "@/components/views/consular-view";
import { getDoc } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.consular"],
  description:
    "簽證申請、護照與旅行證件、公證與認證、領事保護與緊急求助。",
};

const EMPTY = {
  meta: { "zh-Hant": {}, "zh-CN": {}, en: {} },
  html: { "zh-Hant": "", "zh-CN": "", en: "" },
};

async function section(name: string) {
  return (await getDoc("consular", name)) ?? EMPTY;
}

export default async function ConsularPage() {
  const [visa, passport, notarization, protection] = await Promise.all([
    section("visa"),
    section("passport"),
    section("notarization"),
    section("protection"),
  ]);
  return (
    <ConsularView data={{ visa, passport, notarization, protection }} />
  );
}
