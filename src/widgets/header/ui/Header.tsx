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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Handle scroll for header styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Set up intersection observer for active section detection
    const setupIntersectionObserver = () => {
      if (typeof window === "undefined") return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          let currentSection = "";

          // Find the section that is currently visible
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              // Skip hero section as it should not be active
              if (id !== "hero") {
                currentSection = `#${id}`;
                break;
              }
            }
          }

          // If no section is visible, set to empty string (no active section)
          setActiveSection(currentSection);
        },
        {
          root: null,
          rootMargin: "0% 0% -50% 0%", // Trigger when section is 50% visible
          threshold: 0.5,
        },
      );

      // Observe all navigation sections (but not hero)
      NAVIGATION_ITEMS.forEach((item) => {
        const section = document.getElementById(item.href.slice(1));
        if (section) {
          observer.observe(section);
        }
      });

      observerRef.current = observer;
    };

    setupIntersectionObserver();

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (NAVIGATION_ITEMS.some((item) => item.href === hash)) {
        setActiveSection(hash);
      } else {
        // If hash doesn't match any section, set to empty
        setActiveSection("");
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Initialize with current hash
    handleHashChange();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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

  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    // Scroll to the section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#hero" className={styles.logo} aria-label="На главную">
        {"(˶˃ ᵕ ˂˶)"}
      </a>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(nav.href);
                }}
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
