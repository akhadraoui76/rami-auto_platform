import heroRami from "@/assets/hero-rami-1.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      dir="rtl"
    >
      {/* ===== Background Image ===== */}
      <div className="absolute inset-0">
        <img
          src={heroRami}
          alt="Rami Auto - معرض السيارات"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* ===== Overlays ===== */}
      {/* تدرج من اليمين لتغطية منطقة النص */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/75 to-black/20" />
      {/* تدرج من الأسفل للإحصائيات */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30" />

      {/* ===== Content ===== */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-xl mr-0 ml-auto">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 
                       rounded-full px-4 py-2 mb-6 animate-fade-in"
          >
            <span className="w-2 h-2 rounded-full bg-lime-500/80 animate-pulse" />
            <p className="text-amber-400 font-body text-sm font-semibold tracking-wide">
              Rami Auto — شركة استيراد وتصدير السيارات
            </p>
          </div>

          {/* Main Title */}
          <h1
            className="font-display text-white text-4xl md:text-5xl lg:text-6xl 
                       font-bold leading-tight mb-6 animate-fade-in drop-shadow-xl"
          >
            انطلق نحو التميز
            <br />
            <span className="text-gradient-gold">
              من الصين مباشرة إلى الجزائر
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-white/85 text-base md:text-lg leading-relaxed 
                       max-w-lg mb-8 animate-fade-in drop-shadow-md"
            style={{ animationDelay: "0.2s" }}
          >
            نختصر لك المسافات لنأتي بأحدث وأقوى السيارات من الصين مباشرة إلى
            الجزائر، بمواصفات استثنائية تلبي تطلعاتك.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in"
            style={{ animationDelay: "0.35s" }}
          >
            {/* Primary */}
            <a
              href="#contact"
              className="bg-gradient-gold text-black px-6 py-4 rounded-md 
                         text-sm font-bold uppercase tracking-wider 
                         hover:opacity-90 hover:shadow-lg hover:shadow-amber-500/40 
                         transition-all duration-300 text-center"
            >
              اطلب السعر الآن
            </a>
            {/* Secondary */}
            <a
              href="#inventory"
              className="border-2 border-white/30 text-white px-6 py-4 rounded-md 
                         text-sm font-bold uppercase tracking-wider 
                         hover:bg-white/10 hover:border-white/60 
                         backdrop-blur-sm transition-all duration-300 text-center"
            >
              تصفح السيارات
            </a>
          </div>

          {/* ===== Stats ===== */}
          <div
            className="grid grid-cols-3 gap-6 px-8 border-t border-white/20 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { value: "15K+", label: "سيارة تم تسليمها" },
              { value: "4+", label: "أسواق عالمية" },
              { value: "16+", label: "سنوات خبرة" },
            ].map((stat) => (
              <div key={stat.label} className="text-right">
                {/* Value */}
                <p className="font-display text-3xl md:text-4xl font-bold text-gradient-gold leading-none">
                  {stat.value}
                </p>
                {/* Divider */}
                <span className="block w-8 h-0.5 bg-amber-400/50 mt-2 mb-2 mr-0" />
                {/* Label */}
                <p className="text-white/60 text-xs tracking-wide leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>


    </section>
  );
};

export default HeroSection;