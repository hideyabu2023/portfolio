import type { Metadata } from "next";
import SubVisual from "@/components/SubVisual";
import WorkCard from "@/components/WorkCard";
import WorksFilter from "./WorksFilter";
import { getWorks } from "@/lib/microcms";

export const metadata: Metadata = { title: "制作実績" };

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <>
      <SubVisual title="制作実績" />
      <div id="contents-u" className="works-u">
        {/* カードはサーバーで描画し、絞り込みだけをクライアントで行う */}
        <WorksFilter
          items={works.map((work) => ({
            categories: work.category ?? [],
            card: <WorkCard key={work.id} work={work} variant="all" />,
          }))}
        />
      </div>
    </>
  );
}
