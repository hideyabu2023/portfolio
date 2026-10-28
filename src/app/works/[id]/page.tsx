import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SkillList from "@/components/SkillList";
import SubVisual from "@/components/SubVisual";
import { getWork, getWorks } from "@/lib/microcms";

export async function generateStaticParams() {
  const works = await getWorks();
  // Cache Components では空配列がビルドエラーになるため、0件のときはダミーを1つ返す（404になる）
  return works.length ? works.map((work) => ({ id: work.id })) : [{ id: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/works/[id]">): Promise<Metadata> {
  const { id } = await params;
  const work = await getWork(id);
  return { title: work ? `${work.title}｜制作実績` : "制作実績" };
}

async function WorkDetail({ params }: Pick<PageProps<"/works/[id]">, "params">) {
  const { id } = await params;
  const work = await getWork(id);
  if (!work) notFound();

  const rows: [string, React.ReactNode][] = [
    ["会社名", work.company],
    ["契約", work.contract],
    ["担当", work.role],
    ["言語", work.skills?.length ? <SkillList skills={work.skills} /> : null],
    ["工数", work.workload],
  ];

  return (
    <section id="s-works">
      <h3 className="s-works-ttl com-ttl">
        <span className="ja">{work.title}</span>
      </h3>
      <div className="s-works-container flex flx-btw flx-alitem-strt">
        <div className="com-img">
          <Image
            src={work.thumbnail.url}
            alt={work.title}
            width={work.thumbnail.width ?? 1880}
            height={work.thumbnail.height ?? 900}
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
          />
        </div>
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
