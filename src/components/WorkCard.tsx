import Link from "next/link";
import type { Work } from "@/lib/microcms";
import SkillList from "./SkillList";
import WorkThumbnail from "./WorkThumbnail";

type Props = {
  work: Work;
  /** トップは "top"、一覧は "all"（旧サイトのクラス名 com-top-works / com-all-works に対応） */
  variant: "top" | "all";
  /** ファーストビューに入るカードの画像を遅延読み込みしない */
  eager?: boolean;
};

export default function WorkCard({ work, variant, eager }: Props) {
  return (
    <article className={`com-${variant}-works`}>
      <Link href={`/works/${work.id}`}>
        <WorkThumbnail work={work} eager={eager} />
        <h4 className="site-name">{work.title}</h4>
        <dl
          className={`${variant}-works-skill${variant === "all" ? " eng" : ""}`}
        >
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
