import type { Work } from "./microcms";

/**
 * microCMS の環境変数が未設定のときに表示するサンプル。
 * 旧サイトの仮データ（img/sample）をそのまま使っている。
 */
const images: [slug: string, width: number, height: number][] = [
  ["sfidax", 1885, 900],
  ["berkry", 1891, 907],
  ["seikaen", 1878, 912],
  ["goto", 1886, 898],
  ["epoque", 1896, 913],
  ["honbu", 1879, 882],
  ["kawahuku", 1878, 878],
  ["omnibios", 1891, 828],
  ["telluse", 1889, 901],
  ["tokkyu", 1862, 892],
];

const date = "2025-01-01T00:00:00.000Z";

export const sampleWorks: Work[] = images.map(([slug, width, height]) => ({
  id: slug,
  createdAt: date,
  updatedAt: date,
  publishedAt: date,
  revisedAt: date,
  title: "サイトの名前が入ります。",
  thumbnail: { url: `/img/sample/${slug}.png`, width, height },
  contract: "PC",
  skills: ["HTML", "CSS", "SCSS", "JS", "jQuery", "PHP", "Laravel"],
  url: "",
}));
