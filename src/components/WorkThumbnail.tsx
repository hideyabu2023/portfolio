import Image from "next/image";
import type { Work } from "@/lib/microcms";

type Props = { work: Work; priority?: boolean };

/** 作品の画像。未登録のときはグレーの枠だけ出す */
export default function WorkThumbnail({ work, priority }: Props) {
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
        priority={priority}
      />
    </div>
  );
}
