"use client";

import { useState } from "react";
import { WORK_CATEGORIES } from "@/lib/site";

type Item = { categories: string[]; card: React.ReactNode };

const ALL = "ALL";

export default function WorksFilter({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState(ALL);
  const visible = selected === ALL ? items : items.filter((item) => item.categories.includes(selected));

  return (
    <>
      <ul className="all-works-list tag-btn-list flex flx-center flx-alitem-c">
        {[...WORK_CATEGORIES, ALL].map((category) => (
          <li key={category}>
            <button
              type="button"
              className={`more-btn${selected === category ? " is-active" : ""}`}
              aria-pressed={selected === category}
              onClick={() => setSelected(category)}
            >
              <span>{category}</span>
            </button>
          </li>
        ))}
      </ul>
      <section id="all-works">
        <h3 className="all-works-ttl com-ttl">
          <span className="eng">{selected === ALL ? "ALL Works" : selected}</span>
          <span className="ja">制作実績一覧</span>
        </h3>
        <div className="all-works-container flex flx-wrp">
          {visible.length ? visible.map((item) => item.card) : <p>該当する実績はまだありません。</p>}
        </div>
      </section>
    </>
  );
}
