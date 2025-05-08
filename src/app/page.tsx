// src/app/page.tsx – Home page for Ailo Forge. This page is designed for investor appeal,
// with full-screen sections that animate in as the user scrolls.
"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "@/app/styles/HomePage.css";

// Sample animation variants for scroll-in effects
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// Typed motion components to ensure className and other HTML props are recognized
const MotionH1 = motion<HTMLHeadingElement>("h1");
const MotionH2 = motion<HTMLHeadingElement>("h2");
const MotionP = motion<HTMLParagraphElement>("p");
const MotionButton = motion<HTMLButtonElement>("button");

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="home-page container">
      {/* Full-screen hero section with animated text */}
      <section className="hero-section">
        <MotionH1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 1 }}
          className="hero-title"
        >
          Ailo Forge™
        </MotionH1>

        <MotionH2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-subtitle"
        >
          LLM Customization · AI Development · AI Deployment
        </MotionH2>

        <MotionP
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 1, delay: 0.6 }}
          className="hero-description"
        >
          Ailo Forge™ is an AI-driven platform that creates domain-specific large language models (LLMs)
          with minimal user input. By leveraging “AI logic”, we compose custom neural architectures tailored
          for industries like finance, biotech, manufacturing, and more.
        </MotionP>

        <MotionButton
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 1, delay: 0.9 }}
          className="mil-button hero-btn"
          onClick={() => router.push("/models")}
        >
          Select Model
        </MotionButton>
      </section>
    </div>
  );
}
