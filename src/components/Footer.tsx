const footerLinks = {
  الشركة: ["من نحن", "قصتنا", "لماذا نحن", "اتصل بنا"],
  الخدمات: ["استيراد السيارات", "الشحن", "التخليص الجمركي", "فحص السيارات"],
  الدعم: ["الأسئلة الشائعة", "اتصل بنا", "سياسة الخصوصية", "الشروط والأحكام"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#home" className="font-display text-2xl font-bold tracking-wider">
              <span className="text-gradient-gold">RAMI</span>
              <span className="text-foreground">AUTO</span>
            </a>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              استيراد سيارات مميزة من الصين إلى الجزائر. شريكك الموثوق في كل مراحل شراء وشحن وتسليم سيارتك.            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {["Facebook", "Instagram", "X", "LinkedIn"].map((s) => (
                <a
                  key={s} 
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-bold"
                >
                  {s.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">© 2026 RAMI AUTO. All rights reserved.</p>
          <p className="text-muted-foreground text-xs">اختيار دقيق وخدمة احترافية في كل خطوة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
