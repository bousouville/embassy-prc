"use client";

import Link from "next/link";
import { PageTitle } from "@/components/common";
import { useI18n } from "@/lib/i18n";

export default function NotFoundView() {
  const { t } = useI18n();
  return (
    <div className="text-center">
      <PageTitle title={t("notFound.title")} />
      <p className="page-subtitle mx-auto max-w-md">{t("notFound.desc")}</p>
      <p className="mt-4">
        <Link href="/" className="btn-3d">
          {t("notFound.back")}
        </Link>
      </p>
    </div>
  );
}
