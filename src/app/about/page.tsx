import type { Metadata } from "next";
import Image from "next/image";
import SubVisual from "@/components/SubVisual";

export const metadata: Metadata = { title: "私について" };

const profile = [
  ["Name", "大藪　英雄 (Hideo Oyabu)"],
  ["Address", "兵庫県神戸市"],
  ["Skill", "HTML/CSS/SCSS/Javascript/JQuery/PHP"],
  ["CMS", "Wordpress/EC-CUBE"],
  ["Position", "コーディングリーダー"],
];

const history: { year: string; lines: React.ReactNode[] }[] = [
  {
    year: "2012",
    lines: [
      "産業機械のレンタル・リースを行う会社へ営業職で入社。",
      "テレアポ、飛び込み営業で顧客を獲得",
    ],
  },
  {
    year: "2013",
    lines: [
      "フォルクスワーゲンの正規ディーラー店の営業職として転職。",
      "入社1カ月、月間業績1位を獲得。",
    ],
  },
  {
    year: "2014",
    lines: [
      "店舗閉店により退職。",
      "市内のステッカーデザイン会社へ転職。",
      "デザイナー、管理職、営業職を兼任する。",
    ],
  },
  {
    year: "2017",
    lines: [
      "経費、残業業務兼ね合いを考え、印刷業界からWeb業界への転身を決意。",
      "下積みのためHP制作会社へ転職。",
      "HTMLやCSS、Wordpressを一から学ぶ。",
    ],
  },
  {
    year: "2018",
    lines: [
      "コーダーとして就職。",
      <>
        SCSSの導入を始め、コーポレート・LP・Wordpressなど、
        <br className="sp-none" />
        自社CMSのインハウスコーダーとして勤務し、社内対応案件数1位を獲得(社長賞)。
      </>,
      <>
        通常案件に加え、マニュアル作成や業務改善、教育などの管理業務を兼任。
        <br className="sp-none" />
        全国のコーディングリーダーとして勤務。
      </>,
    ],
  },
  {
    year: "2024",
    lines: [
      "Webエンジニアとして就職。",
      <>
        CMS連携や静的サイトのみではなく、Webサービスへの知見を高める必要があると考え、長年勤めた企業を退職。{" "}
        <br className="sp-none" />
        現在はフロントエンドエンジニアとして勤務しています。
      </>,
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <SubVisual title="私について" />
      <div id="contents-u" className="about-u">
        <section id="about-profile">
          <div className="inbox">
            <h3 className="all-profile-ttl com-ttl">
              <span className="eng">Profile</span>
              <span className="ja">プロフィール</span>
            </h3>
            <div className="about-profile-container flex flx-alitem-strt flx-btw">
              <div className="com-img">
                <Image
                  src="/img/about/profile-img.jpg"
                  alt="大藪英雄"
                  width={383}
                  height={362}
                />
              </div>
              <dl className="about-profile-dl eng">
                {profile.map(([label, value]) => (
                  <div key={label} className="in-dl flex flx-alitem-strt">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="history">
          <div className="inbox">
            <h3 className="all-history-ttl com-ttl">
              <span className="eng">History</span>
              <span className="ja">経歴</span>
            </h3>
            <dl className="history-dl">
              {history.map(({ year, lines }) => (
                <div key={year} className="in-dl flex flx-alitem-strt flx-btw">
                  <dt className="flex flx-alitem-c flx-center">{year}</dt>
                  <dd>
                    {lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}
