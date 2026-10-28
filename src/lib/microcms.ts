import "server-only";
import { createClient, type MicroCMSImage, type MicroCMSListContent } from "microcms-js-sdk";
import { cacheLife, cacheTag } from "next/cache";
import { sampleWorks } from "./sample-works";

/**
 * microCMS の API「works」（リスト形式）のスキーマ。
 * フィールドIDを変えた場合はここと README の表を合わせて直す。
 */
export type Work = MicroCMSListContent & {
  /** サイト名 */
  title: string;
  /** サムネイル（未登録だとグレーの枠になる） */
  thumbnail?: MicroCMSImage;
  /** 説明文（テキストエリア。改行はそのまま表示） */
  description?: string;
  /** 契約 */
  contract?: string;
  /** 言語（セレクト・複数選択） */
  skills?: string[];
  /** 制作サイトURL */
  url?: string;
};

/** webhook から revalidateTag するときのタグ */
export const WORKS_TAG = "works";

const ENDPOINT = "works";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// 環境変数が無いとき（API 未設定のローカル確認など）はサンプルデータで表示する
const client =
  serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

if (!client) {
  console.warn(
    "[microcms] MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定のため、サンプルデータを表示しています。",
  );
}

/** 作品一覧（公開日の新しい順） */
export async function getWorks(limit = 100): Promise<Work[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(WORKS_TAG);

  if (!client) return sampleWorks.slice(0, limit);

  const res = await client.getList<Work>({
    endpoint: ENDPOINT,
    queries: { limit, orders: "-publishedAt" },
  });
  return res.contents;
}

/** 作品詳細。存在しない ID のときは null */
export async function getWork(id: string): Promise<Work | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(WORKS_TAG);

  if (!client) return sampleWorks.find((w) => w.id === id) ?? null;

  try {
    return await client.getListDetail<Work>({ endpoint: ENDPOINT, contentId: id });
  } catch (e) {
    // microcms-js-sdk は 404 を例外（status 付き）で返す
    if (e instanceof Error && "status" in e && e.status === 404) return null;
    throw e;
  }
}
