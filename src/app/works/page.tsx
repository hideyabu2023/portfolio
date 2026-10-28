import type { Metadata } from "next";
import SubVisual from "@/components/SubVisual";
import WorkCard from "@/components/WorkCard";
import { getWorks } from "@/lib/microcms";

export const metadata: Metadata = { title: "制作実績" };

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <>
      <SubVisual title="制作実績" />
      <div id="contents-u" className="works-u">
        <section id="all-works">
          <h3 className="all-works-ttl com-ttl">
            <span className="eng">ALL Works</span>
            <span className="ja">制作実績一覧</span>
          </h3>
          <div className="all-works-container flex flx-wrp">
            {works.length ? (
              works.map((work) => <WorkCard key={work.id} work={work} variant="all" />)
            ) : (
              <p>実績は準備中です。</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
