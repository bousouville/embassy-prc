"use client";

import { useState, type FormEvent } from "react";
import { AlertBox, PageTitle } from "@/components/common";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** 聯繫我們：聯絡資料表、電子郵箱表、到館說明、留言表（純前端演示）。 */
export function ContactView() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const compose = (e: FormEvent) => {
    e.preventDefault();
    const to = SITE.emails.general;
    const body = encodeURIComponent(message);
    const subj = encodeURIComponent(subject ? `[${name}] ${subject}` : `[${name}]`);
    window.location.href = `mailto:${to}?subject=${subj}&body=${body}`;
    setPrepared(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.emails.general);
      setCopied(true);
    } catch {
      alert(SITE.emails.general);
    }
  };

  return (
    <div>
      <PageTitle title={t("meta.contact")} />

      <h2 className="panel-title">{t("home.embassyInfoTitle")}</h2>
      <table className="gov-table">
        <tbody>
          <tr>
            <td className="key">{t("home.info.address")}</td>
            <td>
              {SITE.addressZh}（{SITE.postalCode}）
            </td>
          </tr>
          <tr>
            <td className="key">{t("home.info.phone")}</td>
            <td lang="en">{SITE.phone}</td>
          </tr>
          <tr>
            <td className="key">{t("contact.consulPhone")}</td>
            <td lang="en">{SITE.consulPhone}</td>
          </tr>
          <tr>
            <td className="key">{t("home.info.protection")}</td>
            <td lang="en">{SITE.protectionPhone}</td>
          </tr>
          <tr>
            <td className="key">{t("home.info.fax")}</td>
            <td lang="en">{SITE.fax}</td>
          </tr>
          <tr>
            <td className="key">{t("contact.hoursTitle")}</td>
            <td>{t("contact.hours")}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="panel-title">{t("contact.emailSection")}</h2>
      <table className="gov-table">
        <tbody>
          {(
            [
              ["general", SITE.emails.general],
              ["consular", SITE.emails.consular],
              ["commercial", SITE.emails.commercial],
              ["media", SITE.emails.media],
              ["crown", SITE.emails.crowndesk],
              ["webmaster", SITE.emails.webmaster],
            ] as const
          ).map(([kind, addr]) => (
            <tr key={kind}>
              <td className="key">{t(`email.${kind}` as never)}</td>
              <td>
                <a href={`mailto:${addr}`}>{addr}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="info-note">{t("contact.emailNote")}</div>

      <div className="info-note">
        <b>{t("contact.directionTitle")}</b>
        <div className="mt-1">{t("contact.directionDesc")}</div>
      </div>

      <h2 className="panel-title">{t("contact.formTitle")}</h2>
      <AlertBox title={t("contact.mailtoHint")}>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <button type="button" className="btn-3d" onClick={copyEmail}>
            {copied ? t("contact.copied") : t("contact.copyEmail")}
          </button>
          <span lang="en">{SITE.emails.general}</span>
        </div>
      </AlertBox>

      <form className="gov-form" onSubmit={compose}>
        <label htmlFor="c-name">{t("contact.name")}</label>
        <input
          id="c-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <label htmlFor="c-email">{t("contact.email")}</label>
        <input
          id="c-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <label htmlFor="c-subject">{t("contact.subject")}</label>
        <input
          id="c-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label htmlFor="c-message">{t("contact.message")}</label>
        <textarea
          id="c-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-3d">
            {t("contact.submit")}
          </button>
          <button
            type="reset"
            className="btn-3d"
            onClick={() => {
              setName("");
              setEmail("");
              setSubject("");
              setMessage("");
              setPrepared(false);
            }}
          >
            {t("contact.reset")}
          </button>
        </div>
        {prepared && (
          <p className="mt-2 text-[12.5px] text-[var(--color-navy)]">
            {t("contact.prepared")}
          </p>
        )}
      </form>
    </div>
  );
}
