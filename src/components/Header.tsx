"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_NAME } from "@/lib/site";

export function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header id="header" className="hd-wrp flex flx-btw flx-alitem-c">
      <h1 className="hd-l">
        <Link href="/">
          <Image
            src="/img/common/hd-logo.png"
            alt={SITE_NAME}
            width={84}
            height={51}
            priority
          />
        </Link>
      </h1>
      <div className="hd-r">
        <nav id="nav" className="sp-none">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.href}
                className={
                  isCurrent(pathname, item.href) ? "current" : undefined
                }
              >
                <Link href={item.href} className="eng">
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
