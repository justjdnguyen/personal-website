"use client";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineDownload,
  AiOutlineCode,
  AiOutlineBulb,
  AiOutlineRocket,
} from "react-icons/ai";
import { BsFillMoonStarsFill } from "react-icons/bs";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaJava,
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiCsharp,
  SiPostgresql,
  SiMysql,
  SiFlask,
  SiExpress,
  SiBootstrap,
  SiTailwindcss,
  SiFirebase,
  SiGooglecloud,
  SiVercel,
  SiXampp,
  SiNextdotjs,
  SiMicrosoftazure,
} from "react-icons/si";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";

// Footer Component
function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Jimmy Nguyen. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/justjdnguyen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <AiFillGithub className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/jimmypdnguyen/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <AiFillLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Navbar Component
function Navbar({
  darkMode,
  setDarkMode,
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  setActiveSection,
}) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="w-10 h-10 md:w-12 md:h-12"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 534 534"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm"
              >
                <path
                  id="j"
                  d="M184.976 212.481C184.576 362.881 185.243 351.681 174.709 373.548C166.443 390.614 154.043 401.681 136.176 407.814C128.709 410.348 124.709 410.881 110.043 410.881C94.5759 410.881 91.3759 410.348 80.8426 407.014C66.9759 402.481 52.0426 393.014 44.3092 384.081L39.1092 377.948L27.6426 390.348C21.2426 397.148 16.0426 403.148 16.0426 403.681C16.0426 405.814 29.1092 418.748 36.7092 424.348C59.5092 440.614 85.6426 447.014 119.376 444.614C170.309 441.014 203.376 413.548 217.243 363.548L220.709 350.881L221.109 214.481L221.509 78.2142H203.509H185.509L184.976 212.481Z"
                  className="text-blue-500 dark:text-blue-400"
                  fill="currentColor"
                />
                <path
                  id="diag"
                  d="M232.043 83.1475C233.776 85.9475 240.576 98.0809 247.376 110.214C254.043 122.348 261.243 135.148 263.376 138.881C266.576 144.748 286.976 176.214 324.709 233.814C346.843 267.681 361.643 290.214 376.709 313.548C385.376 326.748 396.176 343.281 400.709 350.214C405.376 357.148 419.376 378.748 432.043 398.214C444.576 417.681 456.309 435.548 457.776 437.814L460.709 442.214H477.776C487.109 442.214 494.709 441.814 494.709 441.281C494.709 440.881 487.109 427.548 477.909 411.681C463.109 386.348 448.576 363.148 411.643 306.214C392.576 276.881 381.776 260.081 366.576 236.481C358.176 223.548 348.709 208.614 345.376 203.548C331.109 181.548 285.109 110.214 275.376 94.8809L264.709 78.3475L246.976 78.2142H229.109L232.043 83.1475Z"
                  className="text-purple-500 dark:text-purple-400"
                  fill="currentColor"
                />
                <path
                  id="down"
                  d="M461.376 221.014C461.376 356.881 461.509 363.948 463.776 367.281C465.109 369.281 472.709 382.214 480.709 396.214C488.576 410.081 495.643 422.081 496.309 422.748C496.843 423.548 497.376 346.214 497.376 251.148V78.2142H479.376H461.376V221.014Z"
                  className="text-pink-500 dark:text-pink-400"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <BsFillMoonStarsFill className="text-lg" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <BsFillMoonStarsFill className="text-lg" />
            </button>
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-2xl"
            >
              <div className="py-2 px-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-right text-sm font-medium transition-colors whitespace-nowrap ${
                      activeSection === item.id
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// Profile Picture Component
function ProfilePicture() {
  return (
    <div className="relative w-48 h-48 md:w-80 md:h-80 mb-8 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 p-1">
        <Image
          src="/profile.jpg"
          alt="Jimmy Nguyen"
          width={320}
          height={320}
          className="rounded-full w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}

// Modern Hero Section
function HeroSection({ darkMode }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      id="home"
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20 dark:from-gray-200/20 dark:via-gray-400/20 dark:to-gray-600/20" />
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <ProfilePicture />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
            Jimmy Nguyen
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-gray-700 dark:text-gray-300">
            Software Engineer & Full Stack Developer
          </h2>
          <p className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building innovative solutions and solving complex problems with
            software that makes a difference.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-4 md:px-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/jimmypdnguyen/"
              target="_blank"
              className="w-48 md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow mx-auto md:mx-0"
            >
              <AiFillLinkedin className="text-xl" />
              LinkedIn
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/justjdnguyen"
              target="_blank"
              className="w-48 md:w-auto px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow mx-auto md:mx-0"
            >
              <AiFillGithub className="text-xl" />
              GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Jimmy_Nguyen_Resume.pdf"
              download
              className="w-48 md:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow mx-auto md:mx-0"
            >
              <AiOutlineDownload className="text-xl" />
              Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Modern Skills Section
function SkillsSection() {
  const skills = [
    {
      category: "Languages",
      items: [
        { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
        { name: "Java", icon: <FaJava className="text-[#007396]" /> },
        { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
        { name: "C#", icon: <SiCsharp className="text-[#239120]" /> },
        { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
        { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" /> },
        { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" /> },
        { name: "PHP", icon: <FaPhp className="text-[#777BB4]" /> },
        { name: "SQL Server", icon: <FaDatabase className="text-[#CC2927]" /> },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-[#336791]" />,
        },
        { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      ],
    },
    {
      category: "Frameworks",
      items: [
        { name: "React.js", icon: <FaReact className="text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-[#000]" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
        { name: "Flask", icon: <SiFlask className="text-[#000]" /> },
        { name: "Express", icon: <SiExpress className="text-[#000]" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
        {
          name: "Tailwind",
          icon: <SiTailwindcss className="text-[#38B2AC]" />,
        },
      ],
    },
    {
      category: "Developer Tools",
      items: [
        { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
        { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
        {
          name: "Google Cloud",
          icon: <SiGooglecloud className="text-[#4285F4]" />,
        },
        { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
        {
          name: "Azure",
          icon: <SiMicrosoftazure className="text-[#0078D4]" />,
        },
        { name: "Vercel", icon: <SiVercel className="text-[#000]" /> },
        { name: "XAMPP", icon: <SiXampp className="text-[#FB7A24]" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-gray-200 dark:to-gray-400">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Proficient in a wide range of technologies and tools for building
            modern web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {group.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Modern Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-gray-200 dark:to-gray-400">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
          <motion.a
            href="mailto:jimmynguyen2468@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Email me here!
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// About Me Section
function AboutMeSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-gray-200 dark:to-gray-400 leading-[1.3] pb-2">
            Hey there!
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg md:text-xl">
              My name is Jimmy Nguyen and I graduated from The University of
              Texas at Dallas with a Bachelors of Science in Computer Science. I
              am currently working at Tokio Marine HCC in a Rotational Program
              as a Cloud Engineer.
            </p>
            <p className="text-lg md:text-xl">
              I discovered coding back in 2017 in my sophomore coding class and
              instantly fell in love. I have tons of experience with full stack
              web apps and am always ready to launch into something new. Check
              out my LinkedIn if you want to connect!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Modern Experience Section
function ExperienceSection() {
  const experiences = [
    {
      title: "Cloud Engineer",
      company: "Tokio Marine HCC",
      period: "Jan 2025 - Present",
      description:
        "Working on cloud infrastructure and automation projects, focusing on AWS and Azure implementations.",
      technologies: [
        "Python",
        "AWS",
        "DevOps",
        "Infrastructure as Code",
        "Terraform",
      ],
      location: "Houston, TX",
    },
    {
      title: "SOC Analyst",
      company: "Tokio Marine HCC",
      period: "Mar 2024 - Jan 2025",
      description:
        "Monitored and analyzed security events, investigated incidents, and implemented security measures.",
      technologies: [
        "Python",
        "Security Monitoring",
        "Incident Response",
        "SIEM Tools",
        "Phishing Analysis",
      ],
      location: "Houston, TX",
    },
    {
      title: "Software Engineering Intern",
      company: "Tokio Marine HCC",
      period: "Jun 2023 - Aug 2023",
      description:
        "Developed and maintained internal web applications, collaborated with cross-functional teams.",
      technologies: ["C#", "React", "Node.js", "SQL Server"],
      location: "Houston, TX",
    },
    {
      title: "DevOps Lead (Capstone Project)",
      company: "Ellison Fluid Calipers",
      period: "Jan 2024 - May 2024",
      description:
        "Led the implementation of CI/CD pipelines and infrastructure automation for a large-scale application.",
      technologies: ["Docker", "Kubernetes", "Azure", "Terraform"],
      location: "UTD",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-gray-200 dark:to-gray-400">
            Work Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and roles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {experience.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {experience.company}
                  </p>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {experience.period}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {experience.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main App Component
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update dark mode class on document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main className="bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <HeroSection darkMode={darkMode} />
      <AboutMeSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <Analytics />
    </main>
  );
}

// Add these styles at the top of your file, after the imports
const styles = `
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(50px, 50px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-50px, 50px); }
}

@keyframes float-more-delayed {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(50px, -50px); }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 20s ease-in-out infinite;
}

.animate-float-more-delayed {
  animation: float-more-delayed 25s ease-in-out infinite;
}
`;

// Add this style tag to your document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
