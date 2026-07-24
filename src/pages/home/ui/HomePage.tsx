import { AboutSection } from "@/widgets/about";
import { ContactsSection } from "@/widgets/contacts";
import { ExperienceSection } from "@/widgets/experience";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero";
import { ProjectsSection } from "@/widgets/projects";
import { SetupSection } from "@/widgets/setup";

export function HomePage() {
  return (
    <>
      <Header />

      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SetupSection />
        <ContactsSection />
      </main>

      <Footer />
    </>
  );
}
