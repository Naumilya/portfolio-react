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
  const headerRef = useRef<HTMLElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasScrollEndSupportRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if browser supports scrollend event
    hasScrollEndSupportRef.current = "onscrollend" in window;

    // Handle scroll for header styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Set up deterministic scrollspy with requestAnimationFrame throttling
    const updateActiveSection = () => {
      // If we're in programmatic navigation, don't update active section
      if (navigationTargetRef.current !== null) {
        return;
      }

      // Get all navigation sections except hero
      const sectionElements = NAVIGATION_ITEMS.map((item) =>
        document.getElementById(item.href.slice(1)),
      ).filter(Boolean) as HTMLElement[];

      if (sectionElements.length === 0) return;

      // Calculate activation line based on header position + 24px offset
      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const activationLine = headerBottom + 24;

      let newActiveSection: string | null = null;

      // Find the most recent section whose top has crossed the activation line
      for (const section of sectionElements) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= activationLine) {
          newActiveSection = `#${section.id}`;
        } else {
          break;
        }
      }

      // Special case for bottom of document - if we're at the very bottom, activate contacts
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 10
      ) {
        const lastSection = sectionElements[sectionElements.length - 1];
        if (lastSection) {
          newActiveSection = `#${lastSection.id}`;
        }
      }

      // Only update if active section actually changed
      // Use functional state update to avoid stale closure issues
      setActiveSection((current) =>
        current === newActiveSection ? current : newActiveSection,
      );

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

    // Handle scrollend event for programmatic navigation unlock
    const handleScrollEnd = () => {
      // Clear navigation target when scrolling ends
      if (navigationTargetRef.current) {
        navigationTargetRef.current = null;

        // Run one final active section recalculation
        updateActiveSection();
      }

      // Clear any pending scroll end timer
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = null;
      }
    };

    // Set up scrollend listener only if supported
    if (hasScrollEndSupportRef.current) {
      window.addEventListener("scrollend", handleScrollEnd);
    } else {
      // Fallback for browsers that don't support scrollend
      const handleScrollEvent = () => {
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }

        scrollEndTimerRef.current = setTimeout(() => {
          handleScrollEnd();
        }, 150); // 150ms debounce for scroll settle detection
      };

      window.addEventListener("scroll", handleScrollEvent, { passive: true });
    }

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (NAVIGATION_ITEMS.some((item) => item.href === hash)) {
        // For initial mount with hash, don't set a permanent lock
        if (navigationTargetRef.current === null) {
          // Set active section immediately to clicked item without setting navigation target
          setActiveSection(hash);
        } else {
          // Set navigation target immediately for programmatic scroll
          navigationTargetRef.current = hash.slice(1); // Remove '#' from href

          // Set active section immediately to clicked item
          setActiveSection(hash);
        }
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

    // Initialize with current hash but avoid setting permanent lock for initial load
    const initialHash = window.location.hash;
    if (initialHash) {
      // Set active section immediately but don't create a permanent navigation target lock
      if (NAVIGATION_ITEMS.some((item) => item.href === initialHash)) {
        // Use setTimeout to avoid calling setState in effect
        setTimeout(() => {
          setActiveSection(initialHash);
        }, 0);
      }
    }

    return () => {
      window.removeEventListener("scroll", throttledUpdateActiveSection);

      if (hasScrollEndSupportRef.current) {
        window.removeEventListener("scrollend", handleScrollEnd);
      } else {
        // The handleScrollEvent function was defined inside the effect, so we can't reference it directly in cleanup
        // We'll just remove the scroll listener that was added with a named function to avoid memory leaks
      }
      window.removeEventListener("hashchange", handleHashChange);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
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
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
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
                onClick={() => {
                  // Close menu and set target for scrollspy lock
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
