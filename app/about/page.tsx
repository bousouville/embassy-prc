import type { Metadata } from "next";
import { AboutView } from "@/components/views/page-views";
import { getDoc } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.about"],
  description: "使館使命與職能、組織架構、國家概覽與辦工時間。",
};

export default async function AboutPage() {
  const doc = (await getDoc("about")) ?? {
    meta: { "zh-Hant": {}, "zh-CN": {}, en: {} },
    html: { "zh-Hant": "", "zh-CN": "", en: "" },
  };
  return <AboutView doc={doc} />;
}
