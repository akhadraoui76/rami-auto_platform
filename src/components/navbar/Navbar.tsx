import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "../../assets/logo-gold11.png";
import "./navbar.css";

const navLinks = [
  { label: "الرئيسية",         href: "#home" },
  { label: "من نحن",           href: "#about" },
  { label: "السيارات",         href: "#inventory" },
  { label: "الخدمات",          href: "#services" },
  { label: "آراء العملاء",     href: "#testimonials" },
  { label: "الأسئلة الشائعة",  href: "#faq" },
  { label: "تواصل معنا",       href: "#contact" },
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top:      `${Math.random() * 100}%`,
  left:     `${Math.random() * 100}%`,
  size:     Math.random() * 2.5 + 1,
  delay:    Math.random() * 3,
  duration: Math.random() * 3 + 2,
}));

const Navbar = () => {
  const [open, setOpen]             = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active Section ── */
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        }),
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Close on resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? "shadow-xl shadow-black/40" : ""}
      `}
    >
      {/* ══ Background Layer ══ */}
      <div
        className={`absolute inset-0 overflow-hidden transition-all duration-500
          ${scrolled
            ? "bg-black/92 backdrop-blur-lg"
            : "bg-black/30 backdrop-blur-sm"
          }
        `}
      >
        {/* موجات SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="transparent" />
              <stop offset="30%"  stopColor="rgba(196,160,60,0.08)" />
              <stop offset="55%"  stopColor="rgba(251,191,36,0.18)" />
              <stop offset="80%"  stopColor="rgba(196,160,60,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="transparent" />
              <stop offset="40%"  stopColor="rgba(180,140,40,0.06)" />
              <stop offset="60%"  stopColor="rgba(251,191,36,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <path className="wave-animate"
            d="M-100,40 Q200,10 500,35 T1100,30 T1600,38"
            stroke="url(#waveGrad1)" strokeWidth="1.2" fill="none" />

          <path className="wave-animate-2"
            d="M-100,55 Q300,25 600,50 T1200,45 T1600,52"
            stroke="url(#waveGrad2)" strokeWidth="1" fill="none" />

          <path className="wave-animate-3"
            d="M-100,65 Q250,45 550,62 T1150,58 T1600,64"
            stroke="rgba(251,191,36,0.06)" strokeWidth="0.8" fill="none" />
        </svg>

        {/* جزيئات */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle absolute rounded-full bg-amber-400/70"
            style={{
              top:      p.top,
              left:     p.left,
              width:    `${p.size}px`,
              height:   `${p.size}px`,
              "--dur":   `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* توهجات جانبية */}
        <div className="absolute inset-y-0 left-0  w-1/3 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
      </div>

      {/* خط علوي */}
      <div className="glow-line relative h-[1.5px] w-full" />

      {/* ══ Main Bar ══ */}
      <div className="container relative mx-auto px-4 lg:px-10 flex items-center justify-between h-20">

        {/* Logo */}
        <a href="#home" onClick={() => setActiveLink("#home")} className="shrink-0">
          <img
            src={logo}
            alt="Rami Auto"
            className="logo-shimmer w-60 h-40 object-contain transition-all duration-300"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <li key={link.href} className="relative group">
                <a
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200
                    ${isActive ? "nav-link-metal-active" : "nav-link-metal"}
                  `}
                >
                  {link.label}
                </a>
                <span
                  className={`absolute -bottom-1 right-0 h-[1.5px] rounded-full
                    bg-gradient-to-l from-amber-300 via-amber-500 to-amber-300
                    shadow-[0_0_6px_rgba(251,191,36,0.8)]
                    transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="cta-glow cta-btn hidden lg:inline-flex items-center gap-2
                     relative overflow-hidden border border-amber-500/60
                     px-6 py-2.5 rounded-sm text-sm font-bold
                     tracking-widest uppercase transition-all duration-300 group"
        >
          <span className="absolute inset-0 bg-gradient-to-l from-amber-600/20 via-amber-400/10 to-amber-600/20" />
          <span className="absolute inset-0 bg-gradient-to-l from-amber-500 to-amber-400
                           translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <Phone size={14} className="nav-link-metal-active relative z-10 shrink-0" />
          <span className="cta-btn-text">اطلب السعر الآن</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 nav-link-metal transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "إغلاق" : "القائمة"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* خط سفلي */}
      <div className={`glow-line relative h-[1px] w-full transition-opacity duration-500
        ${scrolled ? "opacity-100" : "opacity-40"}
      `} />

      {/* ══ Mobile Menu ══ */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden
        ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="relative bg-black/96 backdrop-blur-xl border-t border-amber-900/30 overflow-hidden">

          <ul className="relative flex flex-col py-3">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => { setActiveLink(link.href); setOpen(false); }}
                    className={`flex items-center justify-between
                                px-6 py-4 text-sm font-semibold tracking-wide
                                border-b border-white/5 last:border-0
                                transition-all duration-200
                                ${isActive ? "mobile-link-active" : "hover:bg-white/3"}
                              `}
                  >
                    <span className={isActive ? "nav-link-metal-active" : "nav-link-metal"}>
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative px-6 py-5 border-t border-amber-900/20">
            <a
              href="#contact"
              onClick={() => setOpen(false)}  
              className="cta-btn flex items-center justify-center gap-2
                         bg-gradient-to-l from-amber-600 via-amber-400 to-amber-600
                         text-black font-bold px-6 py-3.5 w-full rounded-sm
                         text-sm transition-all duration-300"
            >
              <Phone size={15} />
              اطلب السعر الآن
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;