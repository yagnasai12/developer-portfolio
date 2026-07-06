import React, { useState } from "react";
import { Mail, MapPin, Linkedin, Send, MessageSquare, CheckCircle2, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API form submission latency
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      
      // Auto-dismiss success alert
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-zinc-800/50">
      {/* Background neon accent */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-white">
            Get In Touch
          </h2>
          <p className="text-zinc-400 font-sans font-light mt-4 leading-relaxed text-base sm:text-lg">
            Have a project opportunity, a software engineering opening, or just want to chat tech? Shoot me a message directly, and I will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121212] border border-zinc-800/80 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/2 rounded-full blur-[80px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 duration-500" />
              
              <h3 className="font-display font-medium text-lg text-white mb-6 relative z-10">
                Contact Information
              </h3>
              
              <div className="space-y-6 relative z-10">
                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-950 border border-zinc-800/50 text-cyan-500 rounded-2xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email Me</p>
                    <a href="mailto:yagnasai1212@gmail.com" className="text-sm font-sans font-medium text-zinc-200 hover:text-cyan-500 transition-colors mt-1 block">
                      yagnasai1212@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-950 border border-zinc-800/50 text-cyan-500 rounded-2xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Base Location</p>
                    <p className="text-sm font-sans font-medium text-zinc-200 mt-1">
                      Shri Vishnu Engineering College For Women, Bhimavaram
                    </p>
                  </div>
                </div>

                {/* LinkedIn Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-950 border border-zinc-800/50 text-cyan-500 rounded-2xl">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">LinkedIn Network</p>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm font-sans font-medium text-zinc-200 hover:text-cyan-500 transition-colors mt-1 block">
                      linkedin.com/in/yagnasai
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Box */}
            <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-3.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Currently open to software engineer internships, co-op programs, or full-time junior engineer roles starting immediately or for Summer semesters.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121212] border border-zinc-800/80 relative">
              
              {/* Form success feedback banner */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-400 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <div>
                    <h5 className="font-sans font-bold text-sm">Message Sent Successfully!</h5>
                    <p className="text-xs text-emerald-400/80 mt-0.5">
                      Thank you for reaching out. I've logged your request and will reach out to you via your email soon!
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/40 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Subject Message
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Internship / Professional Project Inquiry"
                    className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/40 transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Detailed Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team timeline, or just say hi..."
                    className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/40 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-zinc-100 hover:bg-cyan-500 hover:text-black text-black font-sans font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-900 disabled:text-zinc-600"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Routing Transmission...
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
