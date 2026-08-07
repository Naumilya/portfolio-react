import { Canvas } from "@react-three/fiber";

import { siteConfig } from "@/shared/config/site";
import { DuckModel } from "@/shared/ui/DuckModel";

import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <p className={`${styles.intro} hero-animate`}>
          <span className={styles.prompt}>$</span> whoami
        </p>

        <hgroup className={styles.hgroup}>
          <h1 className="hero-animate hero-animate-delay-1">
            Привет, я Илья —{" "}
            <span className={styles.highlight}>Frontend-разработчик.</span>
          </h1>
          <h2 className="hero-animate hero-animate-delay-2">
            {siteConfig.tagline}
          </h2>

          <p className="hero-animate hero-animate-delay-3">
            {siteConfig.description}
          </p>
        </hgroup>

        <nav className={`${styles.actions} hero-animate hero-animate-delay-4`}>
          <a href="#projects" className={styles.primaryBtn}>
            Смотреть работы
          </a>
          <a href="#contacts" className={styles.secondaryBtn}>
            Связаться
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tertiaryLink}
          >
            GitHub →
          </a>
        </nav>
      </div>

      <div
        className={`${styles.canvasWrapper} hero-animate hero-animate-delay-3`}
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-3, 2, -2]} intensity={0.6} />

          <DuckModel position={[0, 0, 0]} scale={1.6} />
        </Canvas>
      </div>
    </section>
  );
}
