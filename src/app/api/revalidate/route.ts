import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { WORKS_TAG } from "@/lib/microcms";

/**
 * microCMS の Webhook（カスタム通知）の受け口。
 * コンテンツを公開・更新・削除したときに作品データのキャッシュを破棄する。
 * 署名（X-MICROCMS-Signature）は MICROCMS_WEBHOOK_SECRET で検証する。
 */
export async function POST(request: Request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ message: "MICROCMS_WEBHOOK_SECRET is not set" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("x-microcms-signature") ?? "";
  const expected = createHmac("sha256", secret).update(body).digest("hex");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag(WORKS_TAG, "max");
  return Response.json({ revalidated: true });
}
