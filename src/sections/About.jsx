import { motion } from "framer-motion";
import p from "../assets/p.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Layered neon background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2]/20 via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>
      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Avatar / Card */}
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1CD8D2]/20 to-[#302b63]/20 border border-[#1CD8D2]/25 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            {/* Image is now perfectly styled to fit the container */}
            <img
              src={p}
              alt="Dilkash Alam"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Name + Role + Bio + CTAs */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Dilkash Alam
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack MERN Developer | Fresher
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
            I'm a passionate Full Stack MERN Developer with expertise in building modern, scalable, and responsive web applications. I specialize in React.js, Node.js, Express.js, MongoDB, JavaScript, and Tailwind CSS. As a fresher, I enjoy solving real-world problems through clean code, optimized performance, and user-friendly interfaces.
            </p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Status", value: "Fresher" },
                { label: "Specialization", value: "MERN Stack" },
                { label: "Projects", value: "6+" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
                aria-label="View my projects"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition"
                aria-label="Get in touch"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        {/* Body copy */}
        <div className="grid md:grid-cols-1">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              About Me
            </h3>

            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              Hello! I'm Dilkash Alam, a passionate Full Stack MERN Developer
              from India. I enjoy building modern web applications using
              React.js, Node.js, Express.js, MongoDB, JavaScript, and Tailwind
              CSS. I have completed Full Stack Development training and
              continuously improve my skills by developing real-world projects.
              My focus is on writing clean, maintainable code while creating
              responsive and user-friendly applications.
            </p>

            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              I am currently looking for my first opportunity as a Full Stack
              MERN Developer. As a fresher, I am eager to contribute to
              real-world projects, learn from experienced developers, and
              continuously improve my technical skills.
            </p>
            {/* Education & Technologies */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-bold text-white mb-5">
                Education & Technologies
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "🎓 Full Stack Development",
                  "MERN Stack",
                  "HTML5",
                  "CSS3",
                  "JavaScript",
                  "React.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Git",
                  "GitHub",
                  "Tailwind CSS",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-center text-white hover:bg-cyan-500/20 transition-all duration-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>{" "}
      {/* Content container */}
    </section>
  );
}
