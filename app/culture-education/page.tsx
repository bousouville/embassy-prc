import type { Metadata } from "next";
import { CultureView } from "@/components/views/page-views";
import { getDoc } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.culture"],
  description: "文化與教育交流、留學與旅遊、特別往來便利制度。",
};

export default async function CulturePage() {
  const doc = (await getDoc("culture")) ?? {
    meta: { "zh-Hant": {}, "zh-CN": {}, en: {} },
    html: { "zh-Hant": "", "zh-CN": "", en: "" },
  };
  return <CultureView doc={doc} />;
}
