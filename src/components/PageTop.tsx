"use client";

import { useEffect, useState } from "react";

/** 100px 以上スクロールしたら表示し、押すとページ先頭へ戻る */
export default function PageTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <p id="pagetop" style={visible ? undefined : { display: "none" }}>
      <a
        href="#"
        className="eng"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span>PAGE TOP</span>
      </a>
    </p>
  );
}
