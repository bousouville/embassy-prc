/**
 * Site-wide configuration for the Embassy of the Republic of Bousoville
 * in the People's Republic of China.
 */
export const SITE = {
  /** Full official name (zh-Hant) */
  nameZh: "布索維爾共和國駐中華人民共和國大使館",
  /** Short official name (zh-Hant) */
  nameZhShort: "布索維爾共和國駐華大使館",
  /** Full official name (English) */
  nameEn:
    "Embassy of the Republic of Bousoville in the People's Republic of China",
  /** Short official name (English) */
  nameEnShort: "Embassy of the Republic of Bousoville",
  mottoZh: "凡在王下，皆宜安生",
  mottoEn: "Beneath the Crown, all may live in peace.",

  /** Diplomatic relations established */
  relationsYear: 1960,
  relationsDate: "1960-05-09",
  /** Embassy opened in Beijing */
  embassyYear: 1961,
  embassyDate: "1961-03-01",

  /** Production URL; override with NEXT_PUBLIC_SITE_URL. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://prc.embassy.bousoville.hk.cn/",

  /** Address */
  addressZh: "中國北京市朝陽區東直門外大街 27 號",
  addressEn: "No. 27 Dongzhimenwai Dajie, Chaoyang District, Beijing 100600, China",
  postalCode: "100600",

  phone: "+86-10-6532-2288",
  consulPhone: "+86-10-6532-2266",
  protectionPhone: "+86-10-6532-2212",
  fax: "+86-10-6532-2299",

  emails: {
    /** Embassy (Beijing) mailbox — embassy domain */
    general: "embassy@prc.embassy.bousoville.hk.cn",
    consular: "consular@prc.embassy.bousoville.hk.cn",
    commercial: "commercial@prc.embassy.bousoville.hk.cn",
    media: "media@prc.embassy.bousoville.hk.cn",
    webmaster: "webmaster@prc.embassy.bousoville.hk.cn",
    /** Domestic government mailbox — government domain */
    crowndesk: "crown-witness@bousoville.hk.cn",
  },

  /** Home-country public channels */
  hotline: "118",
  emergency: "999",

  domain: "bousoville.hk.cn",
} as const;
