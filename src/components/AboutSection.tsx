import { Shield, Award, Users, Globe, CheckCircle2 } from "lucide-react";
import carSedan from "@/assets/car-sedan.png";

const features = [
  {
    icon: Shield,
    title: "خبراء موثوقون",
    desc: "نتعامل مع شركاء موثوقين لضمان أفضل السيارات.",
  },
  {
    icon: Award,
    title: "جودة مضمونة",
    desc: "نحرص على اختيار سيارات بحالة وجودة عالية.",
  },
  {
    icon: Users,
    title: "فريق متخصص",
    desc: "فريق ذو خبرة لمرافقتك في جميع مراحل الاستيراد.",
  },
  {
    icon: Globe,
    title: "استيراد من الصين",
    desc: "حلول متكاملة من الشراء إلى التسليم في الجزائر.",
  },
];

const highlights = [
  "أكثر من 16 سنة من الخبرة في الاستيراد",
  "شراكات مباشرة مع كبرى الشركات الصينية",
  "خدمة ما بعد البيع ودعم متكامل",
];

const AboutSection = () => {
  return (
    <section
      id="about"
      dir="rtl"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* ── خلفية زخرفية ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px
                        bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px
                        bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full
                        bg-amber-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full
                        bg-amber-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* ── Section Label ── */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-gradient-to-l from-amber-500 to-transparent" />
          <p className="text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold">
            من نحن
          </p>
          <span className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mt-4">

          {/* ══ Image Side (يسار في RTL = يظهر ثانياً) ══ */}
          <div className="relative order-2 lg:order-1">

            {/* إطار ذهبي خلفي */}
            <div className="absolute -top-4 -right-4 w-full h-full
                            border border-amber-500/20 rounded-lg z-0" />

            {/* الصورة الرئيسية */}
            <div className="relative z-10 rounded-lg overflow-hidden
                            shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <img
                src={carSedan}
                alt="RAMI AUTO - استيراد السيارات من الصين"
                className="w-full h-[420px] object-cover transition-transform
                           duration-700 hover:scale-105"
                loading="lazy"
              />
              {/* Overlay خفيف */}
              <div className="absolute inset-0 bg-gradient-to-t
                              from-black/40 via-transparent to-transparent" />
            </div>

            {/* Badge تجربة */}
            <div className="absolute -bottom-5 -left-5 z-20
                            bg-background border border-amber-500/30
                            rounded-lg px-5 py-4 shadow-xl
                            shadow-black/20 hidden lg:block">
              <p className="font-display text-3xl font-bold text-amber-400 leading-none">
                +16
              </p>
              <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                سنة خبرة
              </p>
            </div>
          </div>

          {/* ══ Text Side ══ */}
          <div className="order-1 lg:order-2">

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight">
              خبرة وثقة في{" "}
              <span className="text-gradient-gold">
                استيراد السيارات
              </span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              RAMI AUTO شركة متخصصة في استيراد السيارات من الصين إلى الجزائر،
              نوفر لعملائنا سيارات مختارة بعناية مع خدمة احترافية تشمل جميع
              مراحل الاستيراد.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              نرافقك من اختيار السيارة والشحن إلى الإجراءات الجمركية والتسليم،
              لضمان تجربة استيراد سهلة وآمنة.
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group flex gap-3 p-4 rounded-lg border border-border/50
                             bg-muted/30 hover:bg-amber-500/5
                             hover:border-amber-500/30
                             transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-sm bg-amber-500/10
                                  flex items-center justify-center shrink-0
                                  group-hover:bg-amber-500/20
                                  transition-colors duration-300">
                    <f.icon className="w-4 h-4 text-amber-500" />
                  </div>
                  {/* Text */}
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5 text-foreground">
                      {f.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;