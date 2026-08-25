import type { Metadata } from "next";
import { NewsListView } from "@/components/views/news-views";
import { getNewsIndex } from "@/lib/content";
import { dict } from "@/lib/i18n-dict";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.news"],
  description: "使館公告、新聞稿與通知。",
};

export default function NewsPage() {
  const items = getNewsIndex();
  return <NewsListView items={items} />;
}
