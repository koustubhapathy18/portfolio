import { Hero } from "@/components/features/hero";
import { About } from "@/components/features/about";
import { Skills } from "@/components/features/skills";
import { Experience } from "@/components/features/experience";
import { Projects } from "@/components/features/projects";
import { Contact } from "@/components/features/contact";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
