// Importing React for building UI components
import React from "react";
// Importing motion components and scroll hooks from Framer Motion for animations
import { motion, useScroll, useTransform } from "framer-motion";

// Array of educations objects containing job details
const educations = [
  {
    role: "10th Class Passout",
    company: "Bihar School Examination Board",
    duration: "2017",
    description:
      "I completed my Class 10 from the Bihar School Examination Board (BSEB) in 2017 with 56% marks. This provided a strong academic foundation and helped me develop discipline, responsibility, and a passion for continuous learning.",
  },

  {
    role: "12th Class Passout",
    company: "Bihar School Examination Board",
    duration: "2022 - 2024",
    description:
      "I completed my Class 12 from the Bihar School Examination Board (BSEB) in 2023 with 65% marks. This further strengthened my academic foundation and prepared me for higher education.",
  },
  {
    role: "Dice Accademy",
    company: "Dice Accademy",
    duration: "2024 - 2025",
    description:
      "Completed Full Stack Web Development from Dice Academy, Delhi, in 2025. Gained practical knowledge of HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, Git, and GitHub, with hands-on educations in building responsive web applications.",
  },
];

// Reusable component to render each educations item with animations
function EducationsItem({ exp, idx, start, end, scrollYProgress, layout }) {
  // Animates the size of the marker (dot) as user scrolls
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the marker
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the card
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  // Checks if card should be displayed above or below the timeline line
  const isAbove = idx % 2 === 0;
  // Animates vertical movement of cards for desktop layout
  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 30 : -30, 0],
  );
  // Animates horizontal movement of cards for mobile layout
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // Render for Desktop layout
  if (layout === "desktop") {
    return (
      <div
        className="relative flex-1 flex justify-center items-center min-w-0"
        key={`${exp.company}-${exp.role}-${idx}`}
      >
        {/* Marker dot on the timeline */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        {/* Small vertical line above or below the marker */}
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        {/* Educations card with role, company, duration, description */}
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  // Render for Mobile layout
  return (
    <div
      key={`${exp.company}-${exp.role}-m-${idx}`}
      className="relative flex items-start"
    >
      {/* Marker dot on mobile timeline */}
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      {/* Educations card (mobile version) */}
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

// Main Educations component
const Educations = () => {
  const sceneRef = React.useRef(null); // Ref for the scrolling section
  const [isMobile, setIsMobile] = React.useState(false); // State to track if device is mobile

  // Detect window size and set isMobile state
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic scene height based on device type and number of educations
  const SCENE_HEIGHT_VH = isMobile
    ? 100 * educations.length * 1.6
    : 100 * educations.length * 1.2;

  // Get scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Calculate thresholds for each educations card's animation start/end
  const numeducations = educations.length;
  const thresholds = React.useMemo(
    () =>
      Array.from({ length: numeducations }, (_, i) => (i + 1) / numeducations),
    [numeducations],
  );

  // Animate timeline line width (desktop) and height (mobile)
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="educations" className="relative bg-black text-white">
      {/* Main container with dynamic height */}
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Section Title */}
          <div className="shrink-0 px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
              Education
            </h2>
          </div>
          {/* Timeline container */}
          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* Horizontal timeline line */}
              <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                  style={{ width: lineWidth }}
                />
              </div>
              {/* Educations items mapped for desktop */}
              <div className="relative flex justify-between mt-0">
                {educations.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <EducationsItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                  style={{ height: lineHeight }}
                />
              </div>
              {/* Educations items mapped for mobile */}
              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {educations.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <EducationsItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Educations; // Exporting Educations component
