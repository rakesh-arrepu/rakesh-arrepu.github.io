import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import ProjectsEnhanced from "@/components/ProjectsEnhanced";
import CertificationsEnhanced from "@/components/CertificationsEnhanced";
import ContactEnhanced from "@/components/ContactEnhanced";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-separator" />
      <About />
      <div className="section-separator" />
      <Skills />
      <div className="section-separator" />
      <Experience />
      <div className="section-separator" />
      <ProjectsEnhanced />
      <div className="section-separator" />
      <CertificationsEnhanced />
      <div className="section-separator" />
      <ContactEnhanced />
    </>
  );
}
