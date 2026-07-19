// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

/**
 * Social media links configuration
 * - Each object represents a platform
 * - Replace `href` with your own profile links
 * - Add/remove items if you want more or fewer social platforms
 */
const socials = [
  {
    Icon: FaYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@dilkash_alam_coder",
  },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/@codebydilkash" },
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dilkash-alam-9a657940a/",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/dilkash_alam_coder/",
  },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/dilkashalam8101" },
];

/**
 * Framer Motion variants for hover/tap glow effects
 * - Initial: normal state
 * - Hover: scale up, lift slightly, and glow with neon shadows
 * - Tap: slightly shrink when clicked/tapped
 */
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black w-full">
      {/* --- Background neon gradient effects --- */}
      {/* Blue glow overlay (top-right side) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,204,0.35),transparent_70%)]" />
      {/* Green glow overlay (bottom-left side) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

      {/* --- Main Footer Content --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Start faded & lowered
        whileInView={{ opacity: 1, y: 0 }} // Animate when scrolled into view
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 sm:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-8"
      >
        {/* --- Personal Name / Branding --- */}
        <div className="w-full overflow-hidden flex justify-center">
          <h1
            className="font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0D58CC] via-cyan-300 to-emerald-400 select-none text-center"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)", // Safe responsive text container scaling
              lineHeight: 1.1,
              textShadow: "0 2px 15px rgba(0,0,0,0.5)",
            }}
          >
            Dilkash Alam
          </h1>
        </div>

        {/* --- Accent underline --- */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0D58CC] via-cyan-300 to-emerald-400" />

        {/* --- Social Media Links --- */}
        <div className="flex gap-6 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* --- Personal Quote / Tagline --- */}
        <p className="text-gray-400 italic max-w-xl text-sm sm:text-base px-4">
          “Success is when preparation meets opportunity.”
        </p>

        {/* --- Copyright / Trademark --- */}
        <p className="text-xs text-gray-500 tracking-wide">
          © {new Date().getFullYear()} Dilkash Alam. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
