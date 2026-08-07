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
  const navigationTargetRef = useRef<string | null>(null);

  useEffect(() => {
    // Handle scroll for header styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Clear navigation target if we've scrolled past it
      if (navigationTargetRef.current) {
        const targetId = navigationTargetRef.current;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportPosition = rect.top + rect.height / 2;
          const readingLinePosition = viewportHeight * 0.325;

          // If we've scrolled past the reading line position, clear the target
          if (
            Math.abs(viewportPosition - readingLinePosition) <
            rect.height / 2
          ) {
            navigationTargetRef.current = null;
          }
        }
      }
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

          // Find the section that is currently visible at the 30-35% viewport position
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              // Skip hero section as it should not be active
              if (id !== "hero") {
                // Check if this section is at the 30-35% viewport position
                const rect = entry.boundingClientRect;
                const viewportHeight = window.innerHeight;
                const viewportPosition = rect.top + rect.height / 2; // Center of element
                const readingLinePosition = viewportHeight * 0.325; // 32.5% (average of 30-35%)

                // If element center is around the reading line position, this is our active section
                if (
                  Math.abs(viewportPosition - readingLinePosition) <
                  rect.height / 2
                ) {
                  currentSection = `#${id}`;
                  break;
                }
              }
            }
          }

          // If no section is visible at reading line, find the first intersecting one
          if (!currentSection) {
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
          }

          // If we have a navigation target, respect it during programmatic scroll
          if (navigationTargetRef.current && !currentSection) {
            // Only set the target section if it's not already set
            const targetId = navigationTargetRef.current;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const rect = targetElement.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              const viewportPosition = rect.top + rect.height / 2;
              const readingLinePosition = viewportHeight * 0.325;

              if (
                Math.abs(viewportPosition - readingLinePosition) <
                rect.height / 2
              ) {
                currentSection = `#${targetId}`;
              }
            }
          }

          // If we have a navigation target and it matches the current section, respect it
          if (
            navigationTargetRef.current &&
            navigationTargetRef.current === currentSection.slice(1)
          ) {
            // Keep the target as active during programmatic scroll
            setActiveSection(currentSection);
            return;
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
        // Only update active section from hash if not during programmatic navigation
        if (!navigationTargetRef.current) {
          setActiveSection(hash);
        }
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
