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
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navigationTargetRef = useRef<string | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Handle scroll for header styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Set up deterministic scrollspy with requestAnimationFrame throttling
    const updateActiveSection = () => {
      // Get all navigation sections except hero
      const sectionElements = NAVIGATION_ITEMS.map((item) =>
        document.getElementById(item.href.slice(1)),
      ).filter(Boolean) as HTMLElement[];

      if (sectionElements.length === 0) return;

      // Calculate reading line (32% of viewport height)
      const readingLine = window.innerHeight * 0.32;

      let newActiveSection: string | null = null;
      let targetReached = false;

      // Check if we're in the hero section or above the first navigation section
      const firstSection = sectionElements[0];
      if (window.scrollY === 0 || window.scrollY < firstSection.offsetTop) {
        newActiveSection = null;
      } else {
        // Find which section is currently active based on reading line
        for (let i = 0; i < sectionElements.length; i++) {
          const section = sectionElements[i];
          const rect = section.getBoundingClientRect();

          // Check if the current section's top is above the reading line
          // and bottom is below the reading line
          if (rect.top <= readingLine && rect.bottom > readingLine) {
            newActiveSection = `#${section.id}`;
            break;
          }

          // Special handling for contacts at the bottom of document
          if (
            i === sectionElements.length - 1 &&
            window.scrollY + window.innerHeight >=
              document.body.scrollHeight - 10
          ) {
            // Check if we're near the bottom and should activate contacts
            const rect = section.getBoundingClientRect();
            if (rect.top <= readingLine && rect.bottom > readingLine) {
              newActiveSection = `#${section.id}`;
            } else if (
              window.scrollY + window.innerHeight >=
              document.body.scrollHeight - 100
            ) {
              // If we're at the very bottom, activate contacts even if not perfectly positioned
              newActiveSection = `#${section.id}`;
            }
          }
        }

        // If we have a navigation target and it's still valid, check if we've reached it
        if (navigationTargetRef.current) {
          const targetId = navigationTargetRef.current;
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const rect = targetElement.getBoundingClientRect();

            // Check if the target section has reached the reading line with tolerance
            if (Math.abs(rect.top - readingLine) < 16) {
              // ±16px tolerance
              newActiveSection = `#${targetId}`;
              targetReached = true;
            }
          }
        }
      }

      // Only update if active section actually changed
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }

      // Clear navigationTargetRef when target is reached
      if (navigationTargetRef.current && targetReached) {
        navigationTargetRef.current = null;
      }

      rafIdRef.current = null;
    };

    // Throttle updates using requestAnimationFrame
    const throttledUpdateActiveSection = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateActiveSection);
      }
    };

    // Set up scroll listener
    window.addEventListener("scroll", throttledUpdateActiveSection, {
      passive: true,
    });

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (NAVIGATION_ITEMS.some((item) => item.href === hash)) {
        // Set navigation target immediately for programmatic scroll
        navigationTargetRef.current = hash.slice(1); // Remove '#' from href

        // Set active section immediately to clicked item
        setActiveSection(hash);

        // Clear the target after a delay if no scroll happens
        setTimeout(() => {
          if (navigationTargetRef.current === hash.slice(1)) {
            navigationTargetRef.current = null;
          }
        }, 500);
      } else {
        // If hash doesn't match any section, set to empty
        setActiveSection(null);

        // Clear navigation target when hash is empty
        if (hash === "") {
          navigationTargetRef.current = null;
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Initialize with current hash
    handleHashChange();

    return () => {
      window.removeEventListener("scroll", throttledUpdateActiveSection);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("hashchange", handleHashChange);
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

    // Set navigation target immediately for programmatic scroll
    const targetId = href.slice(1); // Remove '#' from href
    navigationTargetRef.current = targetId;

    // Set active section immediately to clicked item
    setActiveSection(href);

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
