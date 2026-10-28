import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import PageTop from "./PageTop";
import { NAV_ITEMS, SITE_NAME } from "@/lib/site";

// 現在時刻はプリレンダーでそのまま使えないので、年はキャッシュして出す
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer id="footer">
      <PageTop />
      <div className="ft-wrp">
        <p className="ft-logo">
          <Link href="/">
            <Image
              src="/img/common/ft-logo.png"
              alt={SITE_NAME}
              width={82}
              height={50}
            />
          </Link>
        </p>
        <ul className="ft-sitemap flex flx-center flx-alitem-c">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="eng">
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div id="copyright" className="eng">
        <small>
          Copyright &copy; <CurrentYear /> <Link href="/">portfolio</Link> All
          Rights Reserved.
        </small>
      </div>
    </footer>
  );
}
