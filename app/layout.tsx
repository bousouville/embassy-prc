import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { LocaleProvider } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/locale";
import { SITE } from "@/lib/site";
import { Shell } from "@/components/shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nameZhShort}`,
    template: `%s｜${SITE.nameZhShort}`,
  },
  description:
    "布索維爾共和國駐中華人民共和國大使館官方網站：使館簡介、雙邊關係與歷史、領事服務、經貿合作、文化教育交流與新聞公告。",
  keywords: [
    "布索維爾",
    "Bousoville",
    "駐華大使館",
    "Embassy in China",
    "領事服務",
    "簽證",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.nameZh,
    title: SITE.nameZh,
    description: "布索維爾共和國駐中華人民共和國大使館官方網站。",
    url: SITE.url,
    locale: "zh_Hant",
    alternateLocale: ["zh_CN", "en_US"],
    images: [{ url: "/og.png", width: 512, height: 512, alt: SITE.nameZh }],
  },
  twitter: {
    card: "summary",
    title: SITE.nameZh,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} data-locale={DEFAULT_LOCALE}>
      <body>
        <LocaleProvider>
          <Shell>{children}</Shell>
        </LocaleProvider>
      </body>
    </html>
  );
}
