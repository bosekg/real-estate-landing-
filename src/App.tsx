/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import logo from "./logo.svg";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";

export default function App() {
  const [vslPlaying, setVslPlaying] = useState(false);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const vslRef = useRef<HTMLVideoElement>(null);
  const demoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.05 });

    // Premium entrance for header elements
    tl.fromTo(".hero-text", 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }
    );

    // Clean fade-in with subtle upward motion for video cards - NO horizontal shift
    tl.fromTo(".video-card-entry", 
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", stagger: 0.2 },
      "-=0.5"
    );

    // Premium entrance for buttons
    tl.fromTo(".play-button-load", 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        ease: "back.out(1.7)", 
        stagger: 0.2,
        clearProps: "all" // Allows Tailwind hover scales to work
      },
      "-=0.4"
    );

    tl.fromTo(".cta-button-load", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  }, []); // Remove scope for reliability during this fix

  const toggleVsl = () => {
    setVslPlaying(true);
  };

  const toggleDemo = () => {
    setDemoPlaying(true);
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] font-sans flex flex-col items-center px-6 pt-10 pb-10 md:pt-20 md:pb-20 relative overflow-hidden">
      <CustomCursor />
      <SmoothScroll />
      {/* Niche Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Modern Architecture Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-[0.07] mix-blend-screen"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90" />
        
        {/* Smooth Light Beams */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute -top-[10%] left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-[25deg] blur-[2px]" />
        <div className="absolute -top-[10%] right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -rotate-[15deg] blur-[3px]" />
      </div>

      {/* Background Depth Elements (legacy glows, updated for layers) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-white/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full -z-10 pointer-events-none opacity-20" />
      
      <div className="w-full max-w-[1000px] flex flex-col gap-8 md:gap-16 relative z-10">
        
        {/* HEADER: Centered Brand Group */}
        <header className="flex justify-center items-center py-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={logo} 
                alt="Agent Dial Logo" 
                className="w-10 h-10 object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Vertical Splitter */}
            <div className="w-[1px] h-6 bg-border"></div>

            {/* Brand Title */}
            <span className="text-[15px] font-medium uppercase tracking-[0.2em] bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              Agent Dial
            </span>
          </div>
        </header>

        {/* HEADER GROUP: Headline + Subheadline */}
        <section className="text-center">
          <h1 className="hero-text text-2xl md:text-[32px] font-extrabold tracking-tight mb-2 leading-[1.1] bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Every time your phone goes to voicemail, you're handing a commission to the agent down the street.
          </h1>
          
          <p className="hero-text text-base md:text-[18px] text-muted max-w-[600px] mx-auto leading-relaxed">
            The branded system that stops the bleed and answers every inquiry 24/7, without the overhead of a VA.
          </p>
        </section>

        {/* VIDEO SECTION: Grid layout on Tablet/Desktop */}
        <section className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-14 items-start">
          
          {/* VSL (Left Column) */}
          <div className="flex flex-col gap-6">
            <div className="video-card-entry relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <AnimatePresence mode="wait">
                {!vslPlaying ? (
                  <motion.div
                    key="poster"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20"
                    onClick={toggleVsl}
                  >
                    <img 
                      src="https://img.youtube.com/vi/uq6ecQ06kKQ/maxresdefault.jpg" 
                      className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                      alt="VSL Poster"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 z-10 bg-black/60 px-2.5 py-1 rounded-[6px] text-[11px] font-medium uppercase tracking-wider backdrop-blur-md border border-white/10 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent pointer-events-none">
                      Watch This First
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="play-button-load w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-500 ease-[0.23,1,0.32,1] transform-gpu will-change-transform origin-center group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50">
                        <div className="w-0 h-0 border-t-[9px] md:border-t-[11px] border-t-transparent border-b-[9px] md:border-b-[11px] border-b-transparent border-l-[16px] md:border-l-[20px] border-l-white ml-1.5 transition-transform duration-500 ease-[0.23,1,0.32,1] transform-gpu will-change-transform origin-center group-hover:scale-110"></div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="iframe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-10"
                  >
                    <iframe
                      src="https://www.youtube.com/embed/uq6ecQ06kKQ?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                      title="AgentDial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Mobile Separator Dash - ENLARGED SPACE ONLY FOR MOBILE */}
            <div className="md:hidden mt-12 w-full border-t border-dashed border-white/20" />
          </div>

          {/* PREVIEW + TRANSITION (Right Column) */}
          <div className="flex flex-col gap-6">
            <div 
              className="video-card-entry flex flex-col gap-3"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <AnimatePresence mode="wait">
                  {!demoPlaying ? (
                    <motion.div
                      key="poster"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-20"
                      onClick={toggleDemo}
                    >
                      <img 
                        src="https://img.youtube.com/vi/QLFqsOoxXL4/maxresdefault.jpg" 
                        className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                        alt="Demo Poster"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 z-10 bg-black/60 px-2.5 py-1 rounded-[6px] text-[11px] font-medium uppercase tracking-wider backdrop-blur-md border border-white/10 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent pointer-events-none">
                        In Action
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="play-button-load w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-500 ease-[0.23,1,0.32,1] transform-gpu will-change-transform origin-center group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50">
                          <div className="w-0 h-0 border-t-[7px] md:border-t-[9px] border-t-transparent border-b-[7px] md:border-b-[9px] border-b-transparent border-l-[13px] md:border-l-[16px] border-l-white ml-1 transition-transform duration-500 ease-[0.23,1,0.32,1] transform-gpu will-change-transform origin-center group-hover:scale-110"></div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="iframe"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-10"
                    >
                      <iframe
                        src="https://www.youtube.com/embed/QLFqsOoxXL4?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                        title="AgentDial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Transition Bar */}
              <div className="flex items-center gap-3 text-[13px] font-bold text-muted uppercase tracking-[0.1em] mt-1">
                <div className="flex-1 h-[1px] bg-border"></div>
                <span>Watch Demo</span>
                <div className="flex-1 h-[1px] bg-border"></div>
              </div>
              
              <p className="text-[12px] text-muted leading-relaxed text-center">
                See exactly how it handles a real buyer inquiry from a lead.
              </p>
            </div>
          </div>
        </section>

        {/* CTA CARD */}
        <section className="mt-12 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface/40 backdrop-blur-md border border-border rounded-[16px] p-8 md:p-10 text-center transition-all duration-700 ease-in-out has-[a:hover]:bg-white/95 has-[a:hover]:border-slate-200 group relative"
          >
            <div className="flex justify-center mb-8">
              <span className="font-sans text-[13px] md:text-sm font-medium uppercase tracking-[0.4em] bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent transition-all duration-700 ease-in-out group-has-[a:hover]:from-slate-900 group-has-[a:hover]:to-slate-900/40">
                Next Step?
              </span>
            </div>
            <p className="text-xl md:text-[20px] font-bold text-ink mb-2 transition-colors duration-700 ease-in-out group-has-[a:hover]:text-slate-900">
              Book a brief discovery call to see how this fits your business.
            </p>
            <p className="text-sm md:text-[14px] text-muted mb-6 transition-colors duration-700 ease-in-out group-has-[a:hover]:text-slate-600">
              We’ll look at your current lead intake process and show you exactly how to capture those missed commissions. This is not high-pressure sales call, just a conversation where we'll learn about your business and see if we're a good fit.
            </p>
            
            <a 
              href="https://calendly.com/agentdialai/30min" 
              className="cta-button-load inline-block bg-white text-[#0a0a0a] px-8 py-3 rounded-[8px] font-bold text-base transition-all duration-500 ease-in-out hover:bg-black hover:text-white hover:scale-105 active:scale-95 shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Discovery Call
            </a>

            <div className="mt-4">
               <p className="text-[11px] text-muted/60 transition-colors duration-700 ease-in-out group-has-[a:hover]:text-slate-400">
                Zero pressure. If it's not a fit, we part ways.
              </p>
            </div>
          </motion.div>
        </section>

        {/* FOOTER LABEL */}
        <footer className="w-full flex justify-center items-center pt-8 pb-10 md:py-8">
          <div className="flex flex-row items-center justify-center gap-2 md:gap-3 w-full max-w-[90vw] md:max-w-none px-4">
            {/* Logo Group */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-5 h-5 md:w-4 md:h-4 flex items-center justify-center opacity-40 -translate-y-[0.5px] md:-translate-y-[1px]">
                <img 
                  src={logo} 
                  alt="Agent Dial Logo" 
                  className="w-5 h-5 md:w-4 md:h-4 object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-[1px] h-3 bg-border/40"></div>
            </div>

            {/* Slogan */}
            <span className="text-[9px] md:text-[11px] font-medium uppercase tracking-[0.12em] md:tracking-[0.2em] bg-gradient-to-b from-muted to-muted/40 bg-clip-text text-transparent whitespace-nowrap">
              FOR AGENTS WHO ANSWER THEIR OWN PHONE
            </span>
          </div>
        </footer>

      </div>
    </main>
  );
}
