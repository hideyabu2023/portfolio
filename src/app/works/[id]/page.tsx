import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SkillList from "@/components/SkillList";
import SubVisual from "@/components/SubVisual";
import WorkThumbnail from "@/components/WorkThumbnail";
import { getWork, getWorks } from "@/lib/microcms";

export async function generateStaticParams() {
  const works = await getWorks();
  // Cache Components では空配列がビルドエラーになるため、0件のときはダミーを1つ返す（404になる）
  return works.length ? works.map((work) => ({ id: work.id })) : [{ id: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/works/[id]">): Promise<Metadata> {
  const { id } = await params;
  const work = await getWork(id);
  return { title: work?.title ?? "制作実績" };
}

async function WorkDetail({ params }: Pick<PageProps<"/works/[id]">, "params">) {
  const { id } = await params;
  const work = await getWork(id);
  if (!work) notFound();

  const rows: [string, React.ReactNode][] = [
    ["契約", work.contract],
    ["言語", work.skills?.length ? <SkillList skills={work.skills} /> : null],
  ];

  return (
    <section id="s-works">
      <h3 className="s-works-ttl com-ttl">
        <span className="ja">{work.title}</span>
      </h3>
      <div className="s-works-container flex flx-btw flx-alitem-strt">
        <WorkThumbnail work={work} eager />
        <div className="s-works-bx">
          <dl className="s-works-dl eng">
            {rows
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label} className="in-dl flex">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
          {work.description && <p className="s-works-txt">{work.description.trim()}</p>}
        </div>
      </div>
      {work.url && (
        <a href={work.url} className="more-btn" target="_blank" rel="noopener noreferrer">
          <span>制作サイトを見る</span>
        </a>
      )}
    </section>
  );
}

export default function WorkPage({ params }: PageProps<"/works/[id]">) {
  return (
    <>
      <SubVisual title="制作実績" />
      <div id="contents-u" className="works-u">
        <Suspense fallback={null}>
          <WorkDetail params={params} />
        </Suspense>
      </div>
    </>
  );
}
