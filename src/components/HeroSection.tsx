import heroRami from "@/assets/hero-rami.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" dir="rtl">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroRami}
          alt="hero car with gold accents"
          className="w-full h-full object-cover object-center md:object-left sm:object-left "
          loading="eager"
        />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <p className="text-muted font-body text-xl uppercase tracking-[0.3em] mb-4 animate-fade-in">
            rami auto - شركة إستيراد وتصدير السيارات
          </p>
          <h1 className="font-display text-secondary text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            انطلق نحو التميز <br /> 
            <span className="text-gradient-gold">من الصين مباشرة إلى الجزائر</span>
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-lg mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            نختصر لك المسافات لنأتي بأحدث وأقوى السيارات من الصين مباشرة إلى الجزائر، بمواصفات استثنائية تلبي تطلعاتك.
          </p>
          <div className="flex flex-col sm:flex-row-reverse justify-end gap-4 animate-fade-in" style={{ animationDelay: "0.45s" }}>
            <a
              href="#contact"
              className="bg-gradient-gold text-primary-foreground px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity text-center"
            >
              أطلب السعر الان 
            </a>
            <a
              href="#inventory"
              className="border border-primary/40 text-primary-foreground px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-primary/10 transition-colors text-center"
            >
              تصفح السيارات 
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-12 mt-10 mb-10 pt-4 border-t border-border/50 max-w-2xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { value: "15K+", label: "سيارات تم تسليمها" },
              { value: "4", label: "اسواق عالمية نغطيها" },
              { value: "16+", label: "سنوات خبرة" },
              
             
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
