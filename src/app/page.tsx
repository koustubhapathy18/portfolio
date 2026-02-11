import { Hero } from "@/components/features/hero";
import { About } from "@/components/features/about";
import { Skills } from "@/components/features/skills";
import { Experience } from "@/components/features/experience";
import { Projects } from "@/components/features/projects";
import { Education } from "@/components/features/education";
import { Contact } from "@/components/features/contact";
import { SpaceAudio } from "@/components/audio/SpaceAudio";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SpaceAudio />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
