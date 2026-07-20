"use client";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Projects from "@/app/components/sections/Projects";
import Skills from "@/app/components/sections/Skills";
import Experience from "@/app/components/sections/Experience";
import Contact from "@/app/components/sections/Contact";
import Footer from "@/app/components/sections/Footer";
import Navbar from "./components/sections/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}