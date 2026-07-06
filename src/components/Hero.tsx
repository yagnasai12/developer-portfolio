import { ArrowRight, Code, Download, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-20 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Fine grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col items-start gap-6 max-w-4xl">
          
          {/* Welcome Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] uppercase font-bold tracking-widest"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
            </span>
            Available for hire &amp; co-op
          </motion.div>

          {/* Headline Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]"
          >
            Hi, I'm <span className="text-white">Yazna Sai Yarradoddi</span>,
            <br />
            <span className="text-zinc-500">Computer Science Student </span>
            <span className="text-zinc-500">&amp; </span>
            <span className="text-cyan-500">Software Engineer</span>
          </motion.h1>

          {/* Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-400 font-sans font-light leading-relaxed max-w-2xl mt-2"
          >
            I design and construct high-performance, responsive web systems, microservices, and interactive applications. Leveraging TypeScript, React, and server-side artificial intelligence interfaces to craft beautiful, production-ready user experiences.
          </motion.p>

          {/* Academic & Location Metadata Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 text-zinc-500 text-xs font-mono uppercase tracking-wider mt-1"
          >
            <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800/50 rounded-full px-4 py-2">
              <GraduationCap className="w-4 h-4 text-cyan-500" />
              <span>B.Tech, Computer Science and Engineering</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800/50 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <span>Shri Vishnu Engineering College For Women , Bhimavaram</span>
            </div>
          </motion.div>

          {/* Call-to-Action Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
              }}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-100 hover:bg-cyan-500 text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-black/20"
            >
              Explore Projects
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-zinc-850 hover:border-cyan-500 rounded-full bg-[#121212] hover:bg-[#181818] text-zinc-300 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest"
            >
              <Code className="w-3.5 h-3.5" />
              GitHub Profile
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/20 text-zinc-400 hover:text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
