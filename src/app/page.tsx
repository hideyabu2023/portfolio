import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import { getWorks } from "@/lib/microcms";

export default async function Home() {
  const works = await getWorks(4);

  return (
    <>
      <div id="mv" className="flex flx-btw flx-rr">
        <div className="mv-r"></div>
        <div className="mv-l flex flx-alitem-c flx-center">
          <h2 className="catch">
            <small>いつだって、</small>
            <span className="main">
              選択は
              <br />
              自由だ
            </span>
          </h2>
        </div>
      </div>

      <div id="contents" className="top">
        <section id="top-about">
          <div className="top-about-container flex flx-btw flx-alitem-c">
            <div className="top-about-img sp-none"></div>
            <div className="top-about-info">
              <h3 className="top-about-ttl">
                <span className="eng">About</span>
                <span className="ja">
                  <em>おおやぶ</em>って
                  <br className="pc-none" />
                  どんなひと？
                </span>
              </h3>
              <div className="top-about-img pc-none"></div>
              <div className="top-about-info-txt">
                <p className="strong-txt">
                  <strong>
                    「やるか」
                    <br />
                    「やらないか」
                  </strong>
                </p>
                <p>人生はその選択の連続です。</p>
                <p>
                  デザインもコーディングも、すべて未経験からスタートし、
                  <br className="sp-none" />
                  一から学んできました。
                </p>
                <p>
                  もちろん、すべて独学というわけではありません。
                  <br />
                  企業に努め、下積みを経て現在に至ります。
                </p>
                <p>
                  やってやれないことはない。
                  <br />
                  何かをはじめることに遅いなんてない。
                  <br />
                  わからないことは恥ずかしいことじゃない。
                </p>
                <p>
                  昨日の自分より「一歩前へ」
                  <br />
                  「おおやぶ」はそんな人生を歩んできました。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="top-works">
          <h3 className="top-works-ttl">
            <span className="eng">Works</span>
            <span className="ja">これまでの実績</span>
          </h3>
          <div className="top-works-container flex flx-wrp">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} variant="top" />
            ))}
          </div>
          <Link href="/works" className="more-btn">
            <span>All Works</span>
          </Link>
        </section>
      </div>
    </>
  );
}
