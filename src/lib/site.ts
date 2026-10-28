export const SITE_NAME = "notfound";

/** お問い合わせ先。空のあいだはヘッダー・ドロワー・フッターの Contact を出さない */
export const CONTACT_URL = "";

/** Instagram のURL。空のあいだはドロワーのアイコンを出さない */
export const INSTAGRAM_URL = "";

export const NAV_ITEMS = [
  { href: "/", label: "Top" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  ...(CONTACT_URL ? [{ href: CONTACT_URL, label: "Contact" }] : []),
];

/** 作品一覧の絞り込みボタン。microCMS のセレクトフィールドの選択肢と揃える */
export const WORK_CATEGORIES = ["コーポレート", "LP", "EC", "challenge"];
