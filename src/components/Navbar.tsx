import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "من نحن", href: "#about" },
  { label: "السيارات", href: "#inventory" },
  { label: "الخدمات", href: "#services" },
  { label: "آراء العملاء", href: "#testimonials" },
  { label: "الاسئلة الشائعة", href: "#faq" },
  { label: "تواصل معنا ", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
         shadow-lg 
        ${scrolled ? "bg-white/10 backdrop-blur-md border-b border-white/20" : "bg-transparent backdrop-blur-md"} 
      `}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        <a href="#home" className="font-display text-2xl font-bold tracking-wider">
          <img src="src/assets/logo-cercle.png" alt="Rami Auto" className="h-14 w-auto" />
        </a>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-lg font-medium drop-shadow-sm text-black/70 hover:text-primary transition-colors duration-200 uppercase tracking-widest"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex bg-gradient-gold text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
         اطلب السعر الان 
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden  bg-primary/60 backdrop-blur-md animate-fade-in">
          <ul className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white hover:text-primary transition-colors uppercase tracking-widest"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="bg- text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold uppercase tracking-wider"
                onClick={() => setOpen(false)}
              >
                اطلب السعر الان
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
