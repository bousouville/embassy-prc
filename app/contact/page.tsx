import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";
import { dict } from "@/lib/i18n-dict";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: dict["zh-Hant"]["meta.contact"],
  description: `使館地址、電話、電子郵箱與辦公時間：${SITE.addressZh}。`,
};

export default function ContactPage() {
  return <ContactView />;
}
