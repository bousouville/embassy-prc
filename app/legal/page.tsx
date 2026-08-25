import type { Metadata } from "next";
import { LegalView } from "@/components/views/page-views";
import { getDoc } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.legal"],
  description: "網站聲明：隱私政策、版權與使用條款。",
};

export default async function LegalPage() {
  const doc = (await getDoc("legal")) ?? {
    meta: { "zh-Hant": {}, "zh-CN": {}, en: {} },
    html: { "zh-Hant": "", "zh-CN": "", en: "" },
  };
  return <LegalView doc={doc} />;
}
