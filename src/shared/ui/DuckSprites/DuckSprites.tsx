import styles from "./DuckSprites.module.css";

interface DuckSprite {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

const SPRITES: DuckSprite[] = [
  { top: "15%", left: "5%", size: 48, delay: "0s", duration: "9s" },
  { top: "70%", left: "8%", size: 32, delay: "1.5s", duration: "7s" },
  { top: "30%", left: "90%", size: 40, delay: "0.8s", duration: "8s" },
  { top: "80%", left: "85%", size: 28, delay: "2s", duration: "10s" },
  { top: "50%", left: "50%", size: 20, delay: "3s", duration: "6s" },
];

export function DuckSprites() {
  return (
    <div className={styles.container} aria-hidden="true">
      {SPRITES.map((sprite, index) => (
        <span
          key={index}
          className={styles.sprite}
          style={{
            top: sprite.top,
            left: sprite.left,
            width: sprite.size,
            height: sprite.size,
            animationDelay: sprite.delay,
            animationDuration: sprite.duration,
          }}
        >
          🦆
        </span>
      ))}
    </div>
  );
}
