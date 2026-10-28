import Link from "next/link";
import SubVisual from "@/components/SubVisual";

export default function NotFound() {
  return (
    <>
      <SubVisual title="ページが見つかりません" />
      <div id="contents-u">
        <section className="inbox" style={{ textAlign: "center", padding: "5% 0" }}>
          <p style={{ marginBottom: "40px" }}>お探しのページは移動または削除された可能性があります。</p>
          <Link href="/" className="more-btn">
            <span>Top</span>
          </Link>
        </section>
      </div>
    </>
  );
}
