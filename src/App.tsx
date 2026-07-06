import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { Terminal, Heart } from "lucide-react";

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Content Blocks */}
      <main className="flex-grow bg-[#0a0a0a]">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* 3. Footer Segment */}
      <footer className="bg-[#0a0a0a] border-t border-zinc-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-800/50 pb-8">
            
            {/* Left side brand */}
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-cyan-500" />
              <span className="font-display font-medium tracking-tight text-white">YAZNA SAI YARRADODDI<span className="text-cyan-500 italic">.</span></span>
              <span className="text-zinc-800 font-mono text-sm">//</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">SOFTWARE ENGINEER PORTFOLIO</span>
            </div>

            {/* Middle quick navigation */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-cyan-500 transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("projects");
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                }}
                className="hover:text-cyan-500 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("skills");
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                }}
                className="hover:text-cyan-500 transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                }}
                className="hover:text-cyan-500 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Copyright and legal notes */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">
            <p>
              &copy; {currentYear} Designed &amp; Developed by Yazna Sai Yarradoddi.
            </p>
            <p className="flex items-center gap-1">
              Shri Vishnu Engineering College For Women, Bhimavaram // TypeScript &amp; React
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
