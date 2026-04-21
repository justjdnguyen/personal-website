"use client";
import { AiFillLinkedin, AiFillGithub, AiOutlineDownload } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FaJava, FaPython, FaJs, FaHtml5, FaCss3Alt, FaPhp,
  FaReact, FaNodeJs, FaDocker, FaGitAlt, FaAws, FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus, SiCsharp, SiPostgresql, SiMysql, SiFlask,
  SiExpress, SiBootstrap, SiTailwindcss, SiTerraform,
  SiFirebase, SiVercel, SiNextdotjs,
  SiKubernetes, SiFastapi,
} from "react-icons/si";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Magnetic button helper
───────────────────────────────────────────── */
function Magnetic({ children, className = "", strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Reveal on scroll
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Navbar
───────────────────────────────────────────── */
function Navbar({ activeSection, isMenuOpen, setIsMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about",      label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills",     label: "Skills" },
    { id: "contact",    label: "Contact" },
    { id: "photos",     label: "Photos", href: "/photos" },
  ];

  const scrollTo = (id, href) => {
    if (href) { window.location.href = href; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-stone-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex-shrink-0">
          <svg width="36" height="36" viewBox="0 0 534 534" fill="none">
            <path d="M184.976 212.481C184.576 362.881 185.243 351.681 174.709 373.548C166.443 390.614 154.043 401.681 136.176 407.814C128.709 410.348 124.709 410.881 110.043 410.881C94.5759 410.881 91.3759 410.348 80.8426 407.014C66.9759 402.481 52.0426 393.014 44.3092 384.081L39.1092 377.948L27.6426 390.348C21.2426 397.148 16.0426 403.148 16.0426 403.681C16.0426 405.814 29.1092 418.748 36.7092 424.348C59.5092 440.614 85.6426 447.014 119.376 444.614C170.309 441.014 203.376 413.548 217.243 363.548L220.709 350.881L221.109 214.481L221.509 78.2142H203.509H185.509L184.976 212.481Z" fill="#0D0D0D"/>
            <path d="M232.043 83.1475C233.776 85.9475 240.576 98.0809 247.376 110.214C254.043 122.348 261.243 135.148 263.376 138.881C266.576 144.748 286.976 176.214 324.709 233.814C346.843 267.681 361.643 290.214 376.709 313.548C385.376 326.748 396.176 343.281 400.709 350.214C405.376 357.148 419.376 378.748 432.043 398.214C444.576 417.681 456.309 435.548 457.776 437.814L460.709 442.214H477.776C487.109 442.214 494.709 441.814 494.709 441.281C494.709 440.881 487.109 427.548 477.909 411.681C463.109 386.348 448.576 363.148 411.643 306.214C392.576 276.881 381.776 260.081 366.576 236.481C358.176 223.548 348.709 208.614 345.376 203.548C331.109 181.548 285.109 110.214 275.376 94.8809L264.709 78.3475L246.976 78.2142H229.109L232.043 83.1475Z" fill="#a3a3a3"/>
            <path d="M461.376 221.014C461.376 356.881 461.509 363.948 463.776 367.281C465.109 369.281 472.709 382.214 480.709 396.214C488.576 410.081 495.643 422.081 496.309 422.748C496.843 423.548 497.376 346.214 497.376 251.148V78.2142H479.376H461.376V221.014Z" fill="#0D0D0D"/>
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id, item.href)}
              className={`nav-link text-sm tracking-wide font-[var(--font-outfit)] transition-colors pb-0.5 ${
                activeSection === item.id ? "active text-[#0D0D0D]" : "text-stone-400 hover:text-[#0D0D0D]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-px bg-[#0D0D0D] transition-all duration-500 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-px bg-[#0D0D0D] transition-all duration-500 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px bg-[#0D0D0D] transition-all duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id, item.href)}
                  className="text-left text-sm tracking-wide text-stone-600 hover:text-[#0D0D0D] transition-colors font-[var(--font-outfit)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -120]);

  const words = ["Cloud Platform Engineer", "Full Stack Developer", "AWS Architect", "Automation Builder"];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = words[wordIdx];
    let timeout;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIdx]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white pt-16">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(#0D0D0D 1px, transparent 1px), linear-gradient(90deg, #0D0D0D 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating ink blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-stone-100 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-stone-50 blur-2xl opacity-80 pointer-events-none" />

      <motion.div style={{ y }} className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-stone-400 text-sm tracking-[0.2em] uppercase mb-6 font-[var(--font-outfit)]"
            >
              Houston, TX
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-cormorant)] font-light text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-[#0D0D0D] mb-6"
            >
              Jimmy<br />
              <span className="font-semibold italic">Nguyen</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-8 mb-8"
            >
              <span className="font-[var(--font-outfit)] text-lg text-stone-500">
                {displayed}
                <span className="cursor-blink text-stone-300 ml-0.5">|</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <Magnetic strength={0.25}>
                <motion.a
                  href="https://www.linkedin.com/in/jimmypdnguyen/"
                  target="_blank"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0D0D0D] text-white rounded-full text-sm font-[var(--font-outfit)] hover:bg-stone-800 transition-colors"
                >
                  <AiFillLinkedin className="text-base" /> LinkedIn
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <motion.a
                  href="https://github.com/justjdnguyen"
                  target="_blank"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-[#0D0D0D] rounded-full text-sm font-[var(--font-outfit)] hover:border-stone-400 transition-colors"
                >
                  <AiFillGithub className="text-base" /> GitHub
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <motion.a
                  href="/Jimmy_Nguyen_Resume.pdf"
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-[#0D0D0D] rounded-full text-sm font-[var(--font-outfit)] hover:border-stone-400 transition-colors"
                >
                  <AiOutlineDownload className="text-base" /> Résumé
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-stone-200" />
              <div className="absolute -inset-8 rounded-full border border-stone-100" />
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-1 ring-stone-200">
                <Image
                  src="/profile.jpg"
                  alt="Jimmy Nguyen"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Marquee ticker
───────────────────────────────────────────── */
function SkillTicker() {
  const items = [
    "Python", "AWS", "Terraform", "React", "Docker", "Node.js",
    "Kubernetes", "Next.js", "FastAPI", "CloudFormation", "CI/CD", "Flask",
    "PostgreSQL", "ECS", "EKS", "Bedrock", "IAM", "TypeScript",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-stone-100 py-4 bg-stone-50/50">
      <div className="flex gap-10 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs tracking-[0.22em] uppercase text-stone-400 font-[var(--font-outfit)] flex-shrink-0"
          >
            {item}
            <span className="ml-10 text-stone-200">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   About
───────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
          <Reveal>
            <p className="text-xs tracking-[0.22em] uppercase text-stone-400 font-[var(--font-outfit)] mb-4">About</p>
            <h2 className="font-[var(--font-cormorant)] text-[clamp(2.5rem,6vw,3.5rem)] font-light leading-tight text-[#0D0D0D]">
              Hey<br />there
              <span className="font-semibold italic">.</span>
            </h2>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <p className="font-[var(--font-outfit)] text-lg leading-relaxed text-stone-600">
                I'm a <span className="text-[#0D0D0D] font-medium">Cloud Platform Engineer</span> at Tokio Marine HCC in Houston, TX.
                I hold a B.Sc. in Computer Science from The University of Texas at Dallas and have been writing
                code since a sophomore class in 2017.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-[var(--font-outfit)] text-lg leading-relaxed text-stone-600">
                I build cloud infrastructure, multi-agent automation pipelines, and the occasional full-stack web app.
                My work spans AWS, Terraform, Python, and everything in between — with a focus on making systems
                cheaper, faster, and safer.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="pt-4 border-t border-stone-100">
                <p className="font-[var(--font-outfit)] text-stone-500 mb-4">
                  Outside of work: snowboarding and film photography.
                </p>
                <motion.a
                  href="/photos"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm text-[#0D0D0D] font-[var(--font-outfit)] border-b border-[#0D0D0D] pb-0.5"
                >
                  View photos
                  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Experience
───────────────────────────────────────────── */
function ExperienceSection() {
  const experiences = [
    {
      title: "Cloud Platform Engineer",
      sub: "Associate Cloud Platform Engineer (Jan 2025 – Mar 2026)",
      company: "Tokio Marine HCC",
      period: "Jan 2025 – Present",
      location: "Houston, TX",
      bullets: [
        "Developed a multi-agent automation pipeline to detect, classify, remediate, and audit cloud security misconfigurations with CI/CD-driven deployments and automated audit artifact generation.",
        "Migrated containerized workloads from Amazon EKS to ECS with Fargate — 88% lower monthly costs, 100% reduction in cluster management effort, saving 160+ engineering hours per quarter.",
        "Designed event-driven backend automation for CloudTrail object-level logging across 700+ S3 buckets containing PII/PHI, reducing Wiz findings 80% and cutting audit logging costs ~92% ($180K → $15K/year).",
        "Analyzed 10,000+ IAM roles; drove deletion of 30% obsolete roles from production to reduce attack surface.",
        "Built and scaled AutoTag — an automated metadata-enrichment service applying ownership tags to newly created resources across the organization.",
      ],
      tags: ["Python", "AWS", "Terraform", "ECS", "EKS", "IAM", "CloudTrail"],
    },
    {
      title: "Security Analyst I",
      company: "Tokio Marine HCC",
      period: "Mar 2024 – Dec 2024",
      location: "Houston, TX",
      bullets: [
        "Built automation scripts to collect and transform security telemetry from third-party systems into normalized outputs for reporting and remediation workflows.",
        "Implemented recurring jobs with validation and error handling to support continuous posture monitoring.",
      ],
      tags: ["Python", "SIEM", "Security Automation", "Incident Response"],
    },
    {
      title: "Software Engineer Intern",
      company: "Tokio Marine HCC",
      period: "Jun 2023 – Aug 2023",
      location: "Houston, TX",
      bullets: [
        "Implemented RESTful API endpoints with request/response contracts, validation, and error handling.",
        "Extracted functionality from a legacy monolith into service-oriented components for incremental migration.",
        "Worked within an API-first architecture using backend proxy patterns to route and secure service calls.",
      ],
      tags: ["C#", "React", "Node.js", "SQL Server"],
    },
  ];

  return (
    <section id="experience" className="py-28 bg-stone-50/60">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-16">
          <p className="text-xs tracking-[0.22em] uppercase text-stone-400 font-[var(--font-outfit)] mb-4">Experience</p>
          <h2 className="font-[var(--font-cormorant)] text-[clamp(2.5rem,6vw,3.5rem)] font-light text-[#0D0D0D]">
            Work<br /><span className="font-semibold italic">History</span>
          </h2>
        </Reveal>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <Reveal key={exp.title + exp.period} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="group border-t border-stone-200 py-10 first:border-t-0 last:border-b last:border-stone-200"
              >
                <div className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-12">
                  {/* Left meta — hidden on mobile, shown on md+ */}
                  <div className="hidden md:block">
                    <p className="font-[var(--font-outfit)] text-xs text-stone-400 mb-1 tracking-wide">{exp.period}</p>
                    <p className="font-[var(--font-outfit)] text-xs text-stone-400">{exp.location}</p>
                  </div>

                  {/* Right content */}
                  <div>
                    <h3 className="font-[var(--font-cormorant)] text-2xl font-semibold text-[#0D0D0D] mb-0.5">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-1">
                      <p className="font-[var(--font-outfit)] text-sm text-stone-500">{exp.company}</p>
                      {/* Period + location shown inline on mobile */}
                      <p className="md:hidden font-[var(--font-outfit)] text-xs text-stone-400">{exp.period} · {exp.location}</p>
                    </div>
                    {exp.sub && (
                      <p className="font-[var(--font-outfit)] text-xs text-stone-400 mb-4 italic">{exp.sub}</p>
                    )}
                    <ul className="space-y-2 mb-5 mt-3">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2.5 text-stone-600 font-[var(--font-outfit)] text-sm leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-300 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 text-xs font-[var(--font-outfit)] border border-stone-200 rounded-full text-stone-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal delay={0.1} className="pt-10 border-t border-stone-200">
          <div className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-12">
            <div className="hidden md:block">
              <p className="font-[var(--font-outfit)] text-xs text-stone-400 mb-1 tracking-wide">Aug 2020 – May 2024</p>
              <p className="font-[var(--font-outfit)] text-xs text-stone-400">Richardson, TX</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-[var(--font-outfit)] mb-2">Education</p>
              <h3 className="font-[var(--font-cormorant)] text-2xl font-semibold text-[#0D0D0D]">The University of Texas at Dallas</h3>
              <p className="font-[var(--font-outfit)] text-sm text-stone-500 mt-1">B.Sc. in Computer Science</p>
              <p className="md:hidden font-[var(--font-outfit)] text-xs text-stone-400 mt-1">Aug 2020 – May 2024 · Richardson, TX</p>
            </div>
          </div>
        </Reveal>

        {/* Project */}
        <Reveal delay={0.1} className="mt-10 pt-10 border-t border-stone-200">
          <div className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-12">
            <div className="hidden md:block">
              <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-[var(--font-outfit)]">Projects</p>
            </div>
            <div>
              <p className="md:hidden text-xs tracking-[0.18em] uppercase text-stone-400 font-[var(--font-outfit)] mb-2">Projects</p>
              <h3 className="font-[var(--font-cormorant)] text-2xl font-semibold text-[#0D0D0D] mb-0.5">Q Chat</h3>
              <p className="font-[var(--font-outfit)] text-xs text-stone-400 italic mb-3">Node.js, Express, WebSockets, React, AWS</p>
              <ul className="space-y-2 mb-4">
                {[
                  "Built a multi-user chat interface for Amazon Q CLI by wrapping CLI execution behind a Node.js/Express service and streaming responses to React over WebSockets.",
                  "Implemented per-user session isolation and lifecycle management (1-hour idle timeout + auto-cleanup).",
                  "Designed auth/session handling with AWS SSO (IAM Identity Center), including token-expiration monitoring and proactive re-auth flows.",
                ].map((b, i) => (
                  <li key={i} className="flex gap-2.5 text-stone-600 font-[var(--font-outfit)] text-sm leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-300 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Skills
───────────────────────────────────────────── */
function SkillsSection() {
  const groups = [
    {
      label: "Languages",
      skills: [
        { name: "Python",     icon: <FaPython />,     color: "#3776AB" },
        { name: "Java",       icon: <FaJava />,       color: "#007396" },
        { name: "C/C++",      icon: <SiCplusplus />,  color: "#00599C" },
        { name: "JavaScript", icon: <FaJs />,         color: "#F7DF1E" },
        { name: "HTML/CSS",   icon: <FaHtml5 />,      color: "#E34F26" },
        { name: "SQL",        icon: <FaDatabase />,   color: "#336791" },
      ],
    },
    {
      label: "Frameworks",
      skills: [
        { name: "React",     icon: <FaReact />,        color: "#61DAFB" },
        { name: "Next.js",   icon: <SiNextdotjs />,    color: "#000" },
        { name: "Node.js",   icon: <FaNodeJs />,       color: "#339933" },
        { name: "Flask",     icon: <SiFlask />,        color: "#000" },
        { name: "FastAPI",   icon: <SiFastapi />,      color: "#009688" },
        { name: "Tailwind",  icon: <SiTailwindcss />,  color: "#38B2AC" },
      ],
    },
    {
      label: "Cloud & Infra",
      skills: [
        { name: "AWS",         icon: <FaAws />,           color: "#FF9900" },
        { name: "Terraform",   icon: <SiTerraform />,     color: "#7B42BC" },
        { name: "Docker",      icon: <FaDocker />,        color: "#2496ED" },
        { name: "Kubernetes",  icon: <SiKubernetes />,    color: "#326CE5" },
      ],
    },
    {
      label: "Tools",
      skills: [
        { name: "Git",      icon: <FaGitAlt />,    color: "#F05032" },
        { name: "Firebase", icon: <SiFirebase />,  color: "#FFCA28" },
        { name: "Vercel",   icon: <SiVercel />,    color: "#000" },
        { name: "Express",  icon: <SiExpress />,   color: "#000" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
        { name: "MySQL",    icon: <SiMysql />,     color: "#4479A1" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-16">
          <p className="text-xs tracking-[0.22em] uppercase text-stone-400 font-[var(--font-outfit)] mb-4">Skills</p>
          <h2 className="font-[var(--font-cormorant)] text-[clamp(2.5rem,6vw,3.5rem)] font-light text-[#0D0D0D]">
            Technical<br /><span className="font-semibold italic">Toolkit</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.07}>
              <h3 className="font-[var(--font-outfit)] text-xs tracking-[0.18em] uppercase text-stone-400 mb-5">
                {group.label}
              </h3>
              <div className="space-y-2">
                {group.skills.map((s, si) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.07 + si * 0.04, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <span
                      className="text-lg transition-[filter] duration-500 grayscale group-hover:grayscale-0"
                      style={{ color: s.color }}
                    >
                      {s.icon}
                    </span>
                    <span className="font-[var(--font-outfit)] text-sm text-stone-600 group-hover:text-[#0D0D0D] transition-colors">
                      {s.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Contact
───────────────────────────────────────────── */
function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-[#0D0D0D] overflow-hidden relative">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.22em] uppercase text-stone-500 font-[var(--font-outfit)] mb-6">Contact</p>
          <h2 className="font-[var(--font-cormorant)] font-light text-[clamp(3rem,7vw,5rem)] text-white leading-tight mb-8">
            Let's build something<br />
            <span className="font-semibold italic">together.</span>
          </h2>
          <p className="font-[var(--font-outfit)] text-stone-400 text-lg mb-12 max-w-xl mx-auto">
            Open to interesting problems in cloud infrastructure, automation, and full-stack development.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Magnetic strength={0.15} className="inline-block">
            <motion.a
              href="mailto:jimmynguyen2468@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-6 py-4 bg-white text-[#0D0D0D] rounded-full font-[var(--font-outfit)] text-sm tracking-wide hover:bg-stone-100 transition-colors break-all text-center"
            >
              jimmynguyen2468@gmail.com
              <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex justify-center gap-6">
          <motion.a
            href="https://github.com/justjdnguyen"
            target="_blank"
            whileHover={{ y: -2 }}
            className="text-stone-500 hover:text-white transition-colors font-[var(--font-outfit)] text-sm"
          >
            GitHub
          </motion.a>
          <span className="text-stone-700">·</span>
          <motion.a
            href="https://www.linkedin.com/in/jimmypdnguyen/"
            target="_blank"
            whileHover={{ y: -2 }}
            className="text-stone-500 hover:text-white transition-colors font-[var(--font-outfit)] text-sm"
          >
            LinkedIn
          </motion.a>
          <span className="text-stone-700">·</span>
          <motion.a
            href="/Jimmy_Nguyen_Resume.pdf"
            download
            whileHover={{ y: -2 }}
            className="text-stone-500 hover:text-white transition-colors font-[var(--font-outfit)] text-sm"
          >
            Résumé
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-stone-800 py-6">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <p className="font-[var(--font-outfit)] text-xs text-stone-600">
          © {new Date().getFullYear()} Jimmy Nguyen
        </p>
        <p className="font-[var(--font-outfit)] text-xs text-stone-700 italic font-[var(--font-cormorant)]">
          Houston, TX
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Root
───────────────────────────────────────────── */
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "experience", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white">
      <Navbar
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <HeroSection />
      <SkillTicker />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <Analytics />
    </main>
  );
}
