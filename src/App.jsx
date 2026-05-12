import { useState, useEffect, useRef } from "react";
import InteractiveBackground from "./components/InteractiveBackground";
import CustomCursor from "./components/CustomCursor";
import NavigationOrb from "./components/NavigationOrb";
import MobileNav from "./components/MobileNav";
import HeroSection from "./sections/HeroSection";
import WorkSection from "./sections/WorkSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";

const sections = ["home", "work", "about", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-80px 0px 0px 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavigate = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <InteractiveBackground />
      <CustomCursor />
      <NavigationOrb
        activeSection={activeSection}
        setActiveSection={handleNavigate}
      />
      <MobileNav
        activeSection={activeSection}
        setActiveSection={handleNavigate}
      />

      <main className="pb-16 md:pb-0">
        <HeroSection onNavigate={handleNavigate} />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>

      <footer className="py-8 border-t border-gold-500/10 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Henry Chochu Gikonyo. Building
              the web, one commit at a time.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="https://github.com/cheche-henry"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gold-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/hisnameis-henry-gikonyo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gold-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
