import type { Work } from "./microcms";

/**
 * microCMS の環境変数が未設定のときに表示するサンプル。
 * 旧サイトの仮データ（img/sample）をそのまま使っている。
 */
const images: [slug: string, width: number, height: number, category: string][] = [
  ["sfidax", 1885, 900, "コーポレート"],
  ["berkry", 1891, 907, "EC"],
  ["seikaen", 1878, 912, "コーポレート"],
  ["goto", 1886, 898, "LP"],
  ["epoque", 1896, 913, "コーポレート"],
  ["honbu", 1879, 882, "コーポレート"],
  ["kawahuku", 1878, 878, "LP"],
  ["omnibios", 1891, 828, "EC"],
  ["telluse", 1889, 901, "challenge"],
  ["tokkyu", 1862, 892, "コーポレート"],
];

const date = "2025-01-01T00:00:00.000Z";

export const sampleWorks: Work[] = images.map(([slug, width, height, category]) => ({
  id: slug,
  createdAt: date,
  updatedAt: date,
  publishedAt: date,
  revisedAt: date,
  title: "サイトの名前が入ります。",
  thumbnail: { url: `/img/sample/${slug}.png`, width, height },
  category: [category],
  company: "会社名が入ります。",
  contract: "PC",
  role: "コーディング",
  skills: ["HTML", "CSS", "SCSS", "JS", "jQuery", "PHP", "Laravel"],
  workload: "3日",
  url: "",
}));
