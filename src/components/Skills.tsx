import React from "react";
import { BrainCircuit, Code2, Cpu, Database, Flame, GitBranch, Layers, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface SkillItem {
  name: string;
  level: number; // percentage (0-100)
  levelLabel: string;
}

interface SkillCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      description: "Foundational syntaxes and object-oriented paradigms that I write fluidly.",
      icon: <Code2 className="w-5 h-5 text-cyan-500" />,
      skills: [
        { name: "TypeScript", level: 92, levelLabel: "Advanced" },
        { name: "JavaScript", level: 95, levelLabel: "Expert" },
        { name: "Java", level: 85, levelLabel: "Proficient" },
        { name: "SQL", level: 88, levelLabel: "Proficient" },
        { name: "Python", level: 80, levelLabel: "Proficient" },
        { name: "HTML5/CSS3", level: 90, levelLabel: "Advanced" },
      ],
    },
    {
      title: "Developer Tools & Frameworks",
      description: "Libraries, toolchains, and engines that I use to compile and mount full-stack codebases.",
      icon: <Layers className="w-5 h-5 text-cyan-500" />,
      skills: [
        { name: "React", level: 94, levelLabel: "Advanced" },
        { name: "Vite", level: 90, levelLabel: "Advanced" },
        { name: "Node.js", level: 88, levelLabel: "Proficient" },
        { name: "Git & GitHub", level: 92, levelLabel: "Advanced" },
        { name: "Express.js", level: 86, levelLabel: "Proficient" },
        { name: "Tailwind CSS", level: 95, levelLabel: "Expert" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-zinc-800/50">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-2">
            <BrainCircuit className="w-4 h-4" />
            <span>EXPERT CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-white">
            Technical Proficiency &amp; Badges
          </h2>
          <p className="text-zinc-400 font-sans font-light mt-4 leading-relaxed text-base sm:text-lg">
            A comprehensive overview of my software engineering toolbelt, structured into concrete proficiency matrices and technology segments.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col hover:border-cyan-500/20 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle ambient light on hover */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/2 rounded-full blur-[80px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 duration-500" />
              
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-4 relative z-10">
                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/50">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-white">
                    {category.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-widest">
                    {category.skills.length} Technology Badges
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-450 font-sans font-light mb-8 leading-relaxed relative z-10">
                {category.description}
              </p>

              {/* Skills List with Visual Progress Bars */}
              <div className="space-y-6 mt-auto relative z-10">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-sans font-medium text-zinc-200">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold bg-cyan-500/5 border border-cyan-500/10 rounded px-2.5 py-0.5">
                        {skill.levelLabel}
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/40 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-cyan-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Certifications and Extras Showcase */}
        <div className="mt-16 bg-zinc-950 border border-zinc-800/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hidden sm:block">
              <ShieldCheck className="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <h4 className="font-display font-medium text-white text-base">
                Architecting Clean, Standardized Code
              </h4>
              <p className="text-zinc-400 text-sm font-sans font-light mt-1 max-w-xl">
                Always aiming for strict type compliance in TypeScript, test coverage, modular software architecture design, and optimized asset loading protocols.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto relative z-10">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              CI/CD Pipelines Active
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
