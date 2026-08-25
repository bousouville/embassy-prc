import type { Metadata } from "next";
import { AmbassadorView } from "@/components/views/page-views";
import { getDoc } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.ambassador"],
  description: "沈國維大使致辭與簡歷。",
};

const EMPTY = {
  meta: { "zh-Hant": {}, "zh-CN": {}, en: {} },
  html: { "zh-Hant": "", "zh-CN": "", en: "" },
};

export default async function AmbassadorPage() {
  const message = (await getDoc("ambassador", "message")) ?? EMPTY;
  const bio = (await getDoc("ambassador", "bio")) ?? EMPTY;
  const former = (await getDoc("ambassador", "former")) ?? EMPTY;
  return <AmbassadorView message={message} bio={bio} former={former} />;
}
