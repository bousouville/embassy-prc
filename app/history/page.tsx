import type { Metadata } from "next";
import { HistoryView } from "@/components/views/page-views";
import { getDoc } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.history"],
  description:
    "兩國於1960年建交，使館1961年開館：六十六年雙邊關係與使館沿革。",
};

export default async function HistoryPage() {
  const doc = (await getDoc("history")) ?? {
    meta: { "zh-Hant": {}, "zh-CN": {}, en: {} },
    html: { "zh-Hant": "", "zh-CN": "", en: "" },
  };
  return <HistoryView doc={doc} />;
}
