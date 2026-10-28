"use client";

/*
 * ドロワーメニュー
 * テンプレートの drawer.js（jquery-drawer 置き換え版）を React に移植したもの。
 * クラス名・CSS（styles/_drawer_base.scss）は同じものを使う。
 *  - 開閉は body の .drawer-open の付け外しだけ。動きは CSS の transform
 *  - 背面は body を position:fixed + top で固定（iOS の慣性スクロール抜け対策）
 *  - resize は幅が変わったときだけ閉じる（URLバーの開閉では閉じない）
 *  - .drawer-menu 内のリンク / Esc / ハンバーガー再タップで閉じる
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { isCurrent } from "./Header";
import { CONTACT_URL, INSTAGRAM_URL, NAV_ITEMS, SITE_NAME } from "@/lib/site";

const CLASS_OPEN = "drawer-open";
const CLASS_ANIMATING = "drawer-animating";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// CSS 変数から transition の時間(ms)を読む。CSS 側を直せば JS も追従する
function durationMs(name: string, fallback: number) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const value = parseFloat(raw);
  if (!raw || Number.isNaN(value)) return fallback;
  return raw.endsWith("ms") ? value : value * 1000;
}

function isVisible(el: HTMLElement) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

export default function Drawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isOpenRef = useRef(false);
  const scrollYRef = useRef(0);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const animTimerRef = useRef<number | null>(null);

  const finishAnimation = useCallback(() => {
    if (animTimerRef.current) {
      clearTimeout(animTimerRef.current);
      animTimerRef.current = null;
    }
    document.body.classList.remove(CLASS_ANIMATING);
  }, []);

  const markAnimating = useCallback(() => {
    document.body.classList.add(CLASS_ANIMATING);
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    // display:none の環境では transitionend が来ないので保険を掛ける
    animTimerRef.current = window.setTimeout(
      finishAnimation,
      durationMs("--drawer-duration", 600) + 120,
    );
  }, [finishAnimation]);

  const openDrawer = useCallback(() => {
    if (isOpenRef.current) return;
    isOpenRef.current = true;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const { body, documentElement: root } = document;
    scrollYRef.current = window.scrollY;
    // スクロールバーが消えて横幅が広がる分を埋め、開いた瞬間のガタつきを防ぐ
    const gap = window.innerWidth - root.clientWidth;
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    body.style.top = `${-scrollYRef.current}px`;

    markAnimating();
    body.classList.add(CLASS_OPEN);
    setOpen(true);

    // visibility が visible に切り替わってからフォーカスする（同フレームでは失敗する）
    requestAnimationFrame(() => {
      if (isOpenRef.current) navRef.current?.focus({ preventScroll: true });
    });
  }, [markAnimating]);

  const closeDrawer = useCallback(() => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;

    const { body, documentElement: root } = document;
    const focusWasInside = !!navRef.current?.contains(document.activeElement);

    markAnimating();
    body.classList.remove(CLASS_OPEN);
    body.style.top = "";
    body.style.paddingRight = "";
    // scroll-behavior: smooth が効いていても、復帰は一瞬で終わらせる
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, scrollYRef.current);
    root.style.scrollBehavior = previous;

    // フォーカスを戻してから inert にする（inert は再描画で付く）
    if (focusWasInside) lastFocusedRef.current?.focus({ preventScroll: true });
    setOpen(false);
  }, [markAnimating]);

  const toggleDrawer = () => (isOpenRef.current ? closeDrawer() : openDrawer());

  useEffect(() => {
    // Esc で閉じる / Tab をドロワー内に閉じ込める
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isOpenRef.current) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key !== "Tab" || !navRef.current) return;

      const items = [
        toggleRef.current,
        ...navRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((el): el is HTMLElement => !!el && isVisible(el));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === navRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // 画面幅が変わったときだけ閉じる
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      closeDrawer();
    };

    // 戻るボタンでキャッシュから復帰したときは、閉じた状態に揃えるだけ
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      isOpenRef.current = false;
      finishAnimation();
      document.body.classList.remove(CLASS_OPEN);
      document.body.style.top = "";
      document.body.style.paddingRight = "";
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onPageShow);
      finishAnimation();
    };
  }, [closeDrawer, finishAnimation]);

  // ブラウザバックなど、リンク以外でページが変わったときも閉じる
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  return (
    <div role="banner" className="pc-none">
      <div className="drawer-hamburger-wrp">
        <button
          ref={toggleRef}
          type="button"
          className="drawer-toggle drawer-hamburger"
          aria-controls="drawer-nav"
          aria-expanded={open}
          onClick={toggleDrawer}
        >
          <span className="sr-only">toggle navigation</span>
          <span className="drawer-hamburger-icon"></span>
          <span className="drawer-hamburger-txt">MENU</span>
        </button>
      </div>

      <div
        ref={navRef}
        id="drawer-nav"
        className="drawer-nav"
        role="navigation"
        tabIndex={-1}
        inert={!open}
        onTransitionEnd={(e) => {
          if (e.target === navRef.current && e.propertyName === "transform")
            finishAnimation();
        }}
      >
        <p className="drawer-logo">
          <Link href="/">
            <Image
              src="/img/common/hd-logo.png"
              alt={SITE_NAME}
              width={84}
              height={51}
            />
          </Link>
        </p>
        {/* capture で拾い、ページ遷移のスクロールより先に背面のロックを解除する */}
        <ul
          className="drawer-menu"
          onClickCapture={(e) => {
            if ((e.target as HTMLElement).closest("a[href]")) closeDrawer();
          }}
        >
          {NAV_ITEMS.filter((item) => item.href !== CONTACT_URL).map((item) => (
            <li
              key={item.href}
              className={isCurrent(pathname, item.href) ? "current" : undefined}
            >
              <Link href={item.href} className="drawer-menu-item">
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="drawer-info">
          {INSTAGRAM_URL && (
            <ul className="sns-list flex flx-alitem-c flx-center">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/img/common/instagram-logo.png"
                    alt="instagram"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
            </ul>
          )}
          {CONTACT_URL && (
            <Link
              href={CONTACT_URL}
              className="drawer-mail-btn"
              onClick={closeDrawer}
            >
              <span>CONTACT</span>
            </Link>
          )}
        </div>
      </div>
      <div className="drawer-overlay" aria-hidden="true"></div>
    </div>
  );
}
