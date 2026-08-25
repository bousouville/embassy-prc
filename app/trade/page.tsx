import type { Metadata } from "next";
import { TradeView } from "@/components/views/page-views";
import { getDoc } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.trade"],
  description: "雙邊經貿合作、投資促進與商務往來。",
};

export default async function TradePage() {
  const doc = (await getDoc("trade")) ?? {
    meta: { "zh-Hant": {}, "zh-CN": {}, en: {} },
    html: { "zh-Hant": "", "zh-CN": "", en: "" },
  };
  return <TradeView doc={doc} />;
}
