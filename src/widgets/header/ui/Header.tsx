import { useEffect, useRef, useState } from "react";

import styles from "./Header.module.css";

interface NavigationItem {
  href: string;
  content: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "#about", content: "Обо мне" },
  { href: "#experience", content: "Опыт" },
  { href: "#projects", content: "Работы" },
  { href: "#telegram", content: "Telegram" },
  { href: "#setup", content: "Сетап" },
  { href: "#contacts", content: "Контакты" },
];

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

const LOGO_FRAMES = [
  "(˶˃ ᵕ ˂˶)",
  "(˶˃ ᴗ ᵔ˶)",
  "(˶ᵔ ᴗ ˂˶)",
  "(˶˃ ᵕ ˂˶)",
] as const;

const LOGO_FACES: Record<string, string> = {
  "#about": "(˶˃ ᵕ ˂˶)",
  "#experience": "( •̀ᴗ•́ )",
  "#projects": "(⌐■_■)",
  "#telegram": "( •̀ڡ•́ )",
  "#setup": "(¬‿¬)",
  "#contacts": "(ᵔ◡ᵔ)",
};

function isNavigationHash(hash: string) {
  return NAVIGATION_ITEMS.some((item) => item.href === hash);
}

function getInitialActiveSection(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return isNavigationHash(window.location.hash) ? window.location.hash : null;
}

function getInitialNavigationTarget(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const hash = window.location.hash;

  if (isNavigationHash(hash) || hash === "#hero") {
    return hash.slice(1);
  }

  return null;
}

function getInitialScrolledState() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.scrollY > 10;
}

export function Header() {
  const [scrolled, setScrolled] = useState(getInitialScrolledState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(
    getInitialActiveSection,
  );
  const [logoFrameIndex, setLogoFrameIndex] = useState<number | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);
  const logoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Пока здесь есть target, viewport движется к секции через anchor navigation.
   * В этот момент обычный scrollspy не должен перехватывать active state.
   *
   * Lock снимается только когда пользователь сам начинает управлять scroll.
   */
  const navigationTargetRef = useRef<string | null>(
    getInitialNavigationTarget(),
  );

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = NAVIGATION_ITEMS.map((item) =>
      document.getElementById(item.href.slice(1)),
    ).filter((section): section is HTMLElement => section !== null);

    const calculateActiveSection = (): string | null => {
      if (sections.length === 0) {
        return null;
      }

      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 0;

      /**
       * Секция становится активной, когда подходит практически
       * вплотную к sticky header.
       *
       * После этого она остаётся активной и во whitespace между
       * секциями, пока следующая секция не пересечёт эту линию.
       */
      const activationLine = headerBottom + 24;

      let nextActiveSection: string | null = null;

      for (const section of sections) {
        const { top } = section.getBoundingClientRect();

        if (top <= activationLine) {
          nextActiveSection = `#${section.id}`;
          continue;
        }

        break;
      }

      /**
       * Последняя секция часто физически не может дойти до activationLine
       * из-за конца документа, поэтому в самом низу явно активируем Contacts.
       */
      const documentHeight = document.documentElement.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      const isAtBottom = viewportBottom >= documentHeight - 4;

      if (isAtBottom) {
        return NAVIGATION_ITEMS.at(-1)?.href ?? nextActiveSection;
      }

      return nextActiveSection;
    };

    const updateActiveSection = () => {
      /**
       * ВАЖНО:
       * RAF завершился независимо от того, будет дальше early return или нет.
       *
       * Если оставить reset внизу функции, programmatic navigation
       * способна навсегда заблокировать scheduler.
       */
      rafIdRef.current = null;

      if (navigationTargetRef.current !== null) {
        return;
      }

      const nextActiveSection = calculateActiveSection();

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
    };

    const scheduleActiveSectionUpdate = () => {
      if (rafIdRef.current !== null) {
        return;
      }

      rafIdRef.current = requestAnimationFrame(updateActiveSection);
    };

    const handleScroll = () => {
      setScrolled((current) => {
        const next = window.scrollY > 10;

        return current === next ? current : next;
      });

      if (navigationTargetRef.current === null) {
        scheduleActiveSectionUpdate();
      }
    };

    /**
     * Programmatic smooth-scroll и обычный scroll генерируют одинаковые
     * scroll events, поэтому по scroll событию невозможно понять,
     * кто сейчас управляет viewport.
     *
     * Вместо этого lock снимается по реальному пользовательскому intent.
     */
    const releaseNavigationLock = () => {
      if (navigationTargetRef.current === null) {
        return;
      }

      navigationTargetRef.current = null;

      /**
       * Сбрасываем возможный старый RAF.
       * Следующее настоящее scroll событие запустит свежий расчёт.
       */
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) {
        releaseNavigationLock();
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash;

      if (isNavigationHash(hash)) {
        navigationTargetRef.current = hash.slice(1);
        setActiveSection(hash);
        return;
      }

      if (hash === "#hero") {
        navigationTargetRef.current = "hero";
        setActiveSection(null);
        return;
      }

      navigationTargetRef.current = null;
      setActiveSection(null);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("wheel", releaseNavigationLock, {
      passive: true,
    });

    window.addEventListener("touchstart", releaseNavigationLock, {
      passive: true,
    });

    /**
     * Нужен в том числе для ручного перетаскивания scrollbar.
     *
     * При клике по navigation link pointerdown сработает раньше click:
     * старый lock снимется, а handleNavClick затем установит новый target.
     */
    window.addEventListener("pointerdown", releaseNavigationLock, {
      passive: true,
    });

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);

    /**
     * Первый расчёт после того, как DOM уже существует.
     * Это асинхронный RAF, поэтому здесь нет синхронного setState в effect.
     *
     * При initial hash updateActiveSection просто увидит navigation lock
     * и не перетрёт корректный initial active state.
     */
    rafIdRef.current = requestAnimationFrame(updateActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", releaseNavigationLock);
      window.removeEventListener("touchstart", releaseNavigationLock);
      window.removeEventListener("pointerdown", releaseNavigationLock);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (logoTimerRef.current !== null) {
        clearInterval(logoTimerRef.current);
      }
    };
  }, []);

  const playLogoReaction = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (logoTimerRef.current !== null) {
        clearInterval(logoTimerRef.current);
        logoTimerRef.current = null;
      }

      setLogoFrameIndex(null);
      return;
    }

    if (logoTimerRef.current !== null) {
      clearInterval(logoTimerRef.current);
    }

    let nextFrameIndex = 1;
    setLogoFrameIndex(nextFrameIndex);

    logoTimerRef.current = setInterval(() => {
      nextFrameIndex += 1;

      if (nextFrameIndex >= LOGO_FRAMES.length) {
        if (logoTimerRef.current !== null) {
          clearInterval(logoTimerRef.current);
          logoTimerRef.current = null;
        }

        setLogoFrameIndex(null);
        return;
      }

      setLogoFrameIndex(nextFrameIndex);
    }, 160);
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    navigationTargetRef.current = href.slice(1);
    setActiveSection(href);
  };

  const handleLogoClick = () => {
    setMenuOpen(false);

    /**
     * Hero тоже считаем programmatic navigation,
     * чтобы во время движения наверх пункты меню не мигали один за другим.
     */
    navigationTargetRef.current = "hero";
    setActiveSection(null);
  };

  const restingLogo = LOGO_FACES[activeSection ?? "#about"] ?? LOGO_FRAMES[0];
  const displayedLogo =
    logoFrameIndex === null ? restingLogo : LOGO_FRAMES[logoFrameIndex];

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <a
        href="#hero"
        className={styles.logo}
        aria-label="На главную"
        onClick={handleLogoClick}
        onMouseEnter={playLogoReaction}
        onFocus={playLogoReaction}
      >
        {displayedLogo}
      </a>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span className={styles.menuIcon} aria-hidden="true" />
      </button>

      <nav
        aria-label="Основная навигация"
        className={`${styles.navigation} ${
          menuOpen ? styles.navigationOpen : ""
        }`}
      >
        <ul className={styles.navigationList}>
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <li key={item.href} className={styles.navigationItem}>
                <a
                  href={item.href}
                  className={`${styles.navigationLink} ${
                    isActive ? styles.active : ""
                  }`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.content}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
