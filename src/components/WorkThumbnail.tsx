import Image from "next/image";
import type { Work } from "@/lib/microcms";

/** eager: ファーストビューに入る画像（LCP）は遅延読み込みしない */
type Props = { work: Work; eager?: boolean };

/** 作品の画像。未登録のときはグレーの枠だけ出す */
export default function WorkThumbnail({ work, eager }: Props) {
  const { thumbnail } = work;

  if (!thumbnail) return <div className="com-img is-empty"></div>;

  return (
    <div className="com-img">
      <Image
        src={thumbnail.url}
        alt={work.title}
        width={thumbnail.width ?? 1880}
        height={thumbnail.height ?? 900}
        sizes="(max-width: 767px) 100vw, 50vw"
        loading={eager ? "eager" : undefined}
      />
    </div>
  );
}
