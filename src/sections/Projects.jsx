import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

// Importing project images (desktop & mobile versions)
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

const MH3 = motion.h3;

// 🔹 Custom Hook: Detects if screen size matches "mobile"
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    
    mql.addEventListener?.("change", handler) || mql.addListener(handler);
    setIsMobile(mql.matches);
    
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();

  // 🔹 List of project objects
  const projects = React.useMemo(
    () => [
      {
        title: "nk studio",
        link: "https://www.nk.studio/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Gamily",
        link: "https://gamilyapp.com/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile],
  );

  const sceneRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // FIXED 2: thresholds array wrapped in useMemo to prevent scroll re-subscription loops
  const thresholds = React.useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    [projects.length]
  );
  
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky container keeps content fixed while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Section Title */}
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
          My Work
        </h2>

        {/* Main Project Display Area */}
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
          
          {/* FIXED 1: Single global AnimatePresence wrapper for clean exit animations */}
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            <div className="relative w-[85%] max-w-1200px h-full">
              <AnimatePresence mode="wait">
                <MH3
                  key={activeProject.title}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`absolute font-extrabold tracking-tight text-white/95 text-[clamp(2.2rem,6vw,5rem)] italic ${
                    isMobile 
                      ? "top-[12%] left-0 right-0 text-center" 
                      : "top-[14%] left-0 lg:left-[-2%] text-left"
                  }`}
                  style={{ textShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
                >
                  {activeProject.title}
                </MH3>
              </AnimatePresence>
            </div>
          </div>

          {/* Project Images Mapping */}
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20 scale-100" : "opacity-0 z-0 scale-95 pointer-events-none"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              {/* Project Image Wrapper */}
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                } h-[58vh] sm:h-[64vh]`}
                style={{ zIndex: 10 }}
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                  }}
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View Project Button */}
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"} z-40`}>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all shadow-lg"
            aria-label={`View ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}