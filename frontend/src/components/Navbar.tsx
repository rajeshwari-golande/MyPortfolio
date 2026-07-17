"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "education",
  "skills",
  "projects",
  "achievements",
  "contact",
];

function linkSectionId(href: string): string | null {
  if (href === "/blog") return "blog";
  if (href === "/resume") return "resume";
  if (href.startsWith("/#")) return href.slice(2);
  return null;
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/blog" || pathname.startsWith("/blog/")) {
      setActiveId("blog");
      return;
    }
    if (pathname === "/resume") {
      setActiveId("resume");
      return;
    }
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const linkClass = (href: string) => {
    const id = linkSectionId(href);
    const isActive = id !== null && activeId === id;
    return isActive
      ? "text-accent font-semibold bg-accent/10"
      : "text-muted hover:text-accent hover:bg-surface/50";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 pr-12 sm:pr-14">
        <a href="/#home" className="flex items-center gap-2 group shrink-0">
          <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-background font-bold text-sm">
            RG
          </span>
          <span className="font-semibold text-foreground group-hover:text-accent transition-colors hidden sm:block">
            Rajeshwari Golande
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0 mx-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-2 xl:px-2.5 py-2 text-sm whitespace-nowrap transition-colors rounded-md ${linkClass(link.href)}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-muted hover:text-accent shrink-0"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 border-b border-border overflow-hidden"
          >
            <ul className="section-container py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${linkClass(link.href)}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
