import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, ArrowUp } from "lucide-react";

const footerLinks = {
  الشركة: [
    { label: "من نحن",     href: "#about" },
    { label: "خدماتنا",    href: "#services" },
    { label: "آراء العملاء", href: "#testimonials" },
    { label: "اتصل بنا",   href: "#contact" },
  ],
  الخدمات: [
    { label: "استيراد السيارات",   href: "#services" },
    { label: "الشحن الدولي",        href: "#services" },
    { label: "التخليص الجمركي",     href: "#services" },
    { label: "فحص السيارات",        href: "#services" },
  ],
  الدعم: [
    { label: "الأسئلة الشائعة",  href: "#faq" },
    { label: "اتصل بنا",         href: "#contact" },
    { label: "سياسة الخصوصية",   href: "#" },
    { label: "الشروط والأحكام",  href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter,   label: "X",         href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer dir="rtl" className="relative border-t border-border bg-card overflow-hidden">

      {/* ── زخرفة خلفية ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px
                        bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full
                        bg-primary/4 blur-3xl" />
      </div>

      {/* ── زر العودة للأعلى ── */}
      <button
        onClick={scrollToTop}
        aria-label="العودة للأعلى"
        className="absolute  left-1/2 -translate-x-1/2 z-10
                   w-10 h-10 rounded-full bg-gradient-gold
                   flex items-center justify-center
                   shadow-lg shadow-primary/20
                   hover:shadow-primary/40 hover:-translate-y-0.5
                   transition-all duration-300"
      >
        <ArrowUp className="w-4 h-4 text-primary-foreground" />
      </button>

      {/* ══ Main Content ══ */}
      <div className="container mx-auto px-4 lg:px-8 py-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Brand (يأخذ عمودين) ── */}
          <div className="lg:col-span-2">
            <a href="#home" className="font-display text-2xl font-bold tracking-wider">
              <span className="text-gradient-gold">RAMI</span>
              <span className="text-foreground">AUTO</span>
            </a>

            <p className="text-muted-foreground text-sm mt-4 leading-relaxed max-w-xs">
              استيراد سيارات مميزة من الصين إلى الجزائر. شريكك الموثوق في
              كل مراحل شراء وشحن وتسليم سيارتك.
            </p>

            {/* ── Contact Mini Info ── */}
            <div className="space-y-2.5 mt-5">
              <a href="tel:+213770755111"
                 className="flex items-center gap-2.5 text-muted-foreground
                            hover:text-primary transition-colors text-sm group">
                <Phone className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary" />
                +213 770 755 111
              </a>
              <a href="mailto:info@ramiauto.com"
                 className="flex items-center gap-2.5 text-muted-foreground
                            hover:text-primary transition-colors text-sm group">
                <Mail className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary" />
                info@ramiauto.com
              </a>
              <span className="flex items-center gap-2.5 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5 text-primary/70" />
                باتنة، الجزائر
              </span>
            </div>

            {/* ── Social ── */}
            <div className="flex gap-2.5 mt-6">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-secondary
                             flex items-center justify-center
                             text-muted-foreground
                             hover:bg-primary hover:text-primary-foreground
                             hover:-translate-y-0.5
                             transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Links Columns ── */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-5 text-foreground relative inline-block">
                {title}
                <span className="absolute -bottom-2 right-0 w-8 h-[2px]
                                 bg-gradient-to-l from-primary to-transparent" />
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground text-sm
                                 hover:text-primary hover:pr-1
                                 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Bottom Bar ══ */}
      <div className="border-t border-border/60 py-6 relative">
        <div className="container mx-auto px-4 lg:px-8
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            © {currentYear} RAMI AUTO. جميع الحقوق محفوظة.
          </p>
          <p className="text-muted-foreground text-xs">
            اختيار دقيق وخدمة احترافية في كل خطوة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;