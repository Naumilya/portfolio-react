import { useEffect, useState } from "react";

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

export function Header() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === "undefined") return "";
    const hash = window.location.hash;
    return NAVIGATION_ITEMS.some((item) => item.href === hash) ? hash : "";
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.35;

      let current = "";

      for (const item of NAVIGATION_ITEMS) {
        const section = document.getElementById(item.href.slice(1));
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          current = item.href;
          break;
        }
      }

      if (!current) {
        const last = NAVIGATION_ITEMS[NAVIGATION_ITEMS.length - 1];
        const section = document.getElementById(last.href.slice(1));
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            current = last.href;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#hero" className={styles.logo} aria-label="На главную">
        {"(˶˃ ᵕ ˂˶)"}
      </a>

      <button
        type="button"
        className={styles.menuButton}
        aria-label="Открыть меню"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className={styles.menuIcon} aria-hidden="true" />
      </button>

      <nav
        aria-label="Основная навигация"
        className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
      >
        <ul className={styles.navigationList}>
          {NAVIGATION_ITEMS.map((nav) => (
            <li key={nav.href} className={styles.navigationItem}>
              <a
                href={nav.href}
                className={`${styles.navigationLink} ${
                  activeSection === nav.href ? styles.active : ""
                }`}
                aria-current={activeSection === nav.href ? "true" : undefined}
                onClick={handleNavClick}
              >
                {nav.content}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
