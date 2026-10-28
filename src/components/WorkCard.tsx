import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/microcms";
import SkillList from "./SkillList";

type Props = {
  work: Work;
  /** トップは "top"、一覧は "all"（旧サイトのクラス名 com-top-works / com-all-works に対応） */
  variant: "top" | "all";
};

export default function WorkCard({ work, variant }: Props) {
  return (
    <article className={`com-${variant}-works`}>
      <Link href={`/works/${work.id}`}>
        <div className="com-img">
          <Image
            src={work.thumbnail.url}
            alt={work.title}
            width={work.thumbnail.width ?? 1880}
            height={work.thumbnail.height ?? 900}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
        <h4 className="site-name">{work.title}</h4>
        <dl className={`${variant}-works-skill${variant === "all" ? " eng" : ""}`}>
          {work.role && (
            <div className="in-dl flex">
              <dt>担当</dt>
              <dd>{work.role}</dd>
            </div>
          )}
          {!!work.skills?.length && (
            <div className="in-dl flex">
              <dt>言語</dt>
              <dd>
                <SkillList skills={work.skills} />
              </dd>
            </div>
          )}
        </dl>
      </Link>
    </article>
  );
}
