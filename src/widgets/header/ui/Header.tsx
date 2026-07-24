import styles from "./Header.module.css";

interface NavigationItem {
  href: string;
  content: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: "#about",
    content: "Обо мне",
  },
  {
    href: "#experience",
    content: "Мой опыт",
  },
  {
    href: "#projects",
    content: "Проекты",
  },
  {
    href: "#setup",
    content: "Мой сетап",
  },
  {
    href: "#contacts",
    content: "Контакты",
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <a href="#hero" className={styles.logo}>
        (˶˃ ᵕ ˂˶)
      </a>
      <nav aria-label="Основная навигация" className={styles.navigation}>
        <ul className={styles.navigationList}>
          {NAVIGATION_ITEMS.map((nav) => (
            <li key={nav.href} className={styles.navigationItem}>
              <a href={nav.href} className={styles.navigationLink}>
                {nav.content}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
