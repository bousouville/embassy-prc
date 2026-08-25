import type { Metadata } from "next";
import { HomeView } from "@/components/views/home-view";
import { getNewsIndex } from "@/lib/content";

export const metadata: Metadata = {
  description:
    "布索維爾共和國駐中華人民共和國大使館官方網站：使館簡介、雙邊關係與歷史、領事服務、經貿合作、文化教育交流與新聞公告。",
};

export default function HomePage() {
  const news = getNewsIndex();
  return <HomeView news={news} />;
}
