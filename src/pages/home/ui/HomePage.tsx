import { AboutSection } from "@/widgets/about";
import { ContactsSection } from "@/widgets/contacts";
import { DuckAssistant } from "@/widgets/duck-assistant";
import { ExperienceSection } from "@/widgets/experience";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero";
import { NowSection } from "@/widgets/now";
import { ProjectsSection } from "@/widgets/projects";
import { SetupSection } from "@/widgets/setup";
import { TelegramSection } from "@/widgets/telegram";
import { TrustSection } from "@/widgets/trust";

export function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="main-content">
        <HeroSection />
        <TrustSection />
        <NowSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <TelegramSection />
        <SetupSection />
        <ContactsSection />
      </main>

      <Footer />
      <DuckAssistant />
    </>
  );
}
