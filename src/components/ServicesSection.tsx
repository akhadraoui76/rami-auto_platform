import { Ship, FileCheck, ShieldCheck, Truck } from "lucide-react";

const services = [
  {
    icon: Ship,
    step: "01",
    title: "الشحن الدولي",
    desc: "خدمة شحن السيارات من الصين إلى الجزائر مع متابعة مراحل النقل وتأمين كامل للسيارة حتى وصولها.",
    highlight: "تأمين شامل أثناء النقل",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "إجراءات الاستيراد والجمارك",
    desc: "نتكفل بجميع الإجراءات الإدارية، الوثائق، والتراخيص اللازمة لضمان عملية استيراد سهلة وسريعة.",
    highlight: "إجراءات سريعة وموثوقة",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "ضمان وحماية السيارة",
    desc: "نوفر حلول حماية وتأمين للسيارة أثناء النقل لضمان وصولها بأفضل حالة ممكنة.",
    highlight: "ضمان على جميع المراحل",
  },
  {
    icon: Truck,
    step: "04",
    title: "التوصيل داخل الجزائر",
    desc: "خدمة توصيل السيارة إلى مكانك داخل الجزائر مع الحرص على سلامتها وجودة التسليم.",
    highlight: "توصيل لجميع الولايات",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      dir="rtl"
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* ── زخرفة خلفية ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        {/* دوائر ضبابية */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full
                        bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full
                        bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-l from-primary/50 to-transparent" />
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
              خدماتنا
            </p>
            <span className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            حلول استيراد متكاملة{" "}
            <span className="text-gradient-gold">من الصين إلى الجزائر</span>
          </h2>

          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            نقدم خدمة شاملة من لحظة اختيار سيارتك في الصين حتى تسليمها
            أمام بابك في الجزائر
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, index) => (
            <div
              key={s.title}
              className="group relative bg-card border border-border rounded-lg p-7
                         hover:border-border/80
                         hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                         hover:-translate-y-1.5
                         transition-all duration-300
                         overflow-hidden"
            >
              {/* رقم Step خلفي زخرفي */}
              <span
                className="absolute -top-4 -left-2 font-display text-8xl font-bold
                           text-foreground/[0.04] select-none pointer-events-none
                           transition-all duration-300 group-hover:text-foreground/[0.06]"
              >
                {s.step}
              </span>

              {/* خط علوي يظهر عند hover */}
              <div
                className="absolute top-0 right-0 left-0 h-[2px] rounded-t-lg
                           bg-gradient-to-l from-primary/60 via-primary to-primary/60
                           scale-x-0 group-hover:scale-x-100
                           transition-transform duration-300 origin-right"
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg bg-primary/8 border border-primary/15
                           flex items-center justify-center mb-5
                           group-hover:bg-primary/15 group-hover:border-primary/30
                           transition-all duration-300"
              >
                <s.icon className="w-5 h-5 text-primary" />
              </div>

              {/* Step Number */}
              <span className="text-[10px] text-muted-foreground/60
                               uppercase tracking-widest font-medium mb-2 block">
                {s.step}
              </span>

              {/* Title */}
              <h3 className="font-display text-base font-semibold mb-3 text-foreground
                             group-hover:text-foreground transition-colors">
                {s.title}
              </h3>

              {/* Desc */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {s.desc}
              </p>

              {/* Highlight Badge */}
              <div className="flex items-center gap-2 pt-4 border-t border-border/60">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-[11px] text-primary/80 font-medium">
                  {s.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-14">
          <p className="text-muted-foreground text-sm mb-5">
            هل تريد معرفة المزيد عن خدماتنا؟
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2
                       border border-primary/40 text-primary
                       px-7 py-3 rounded-sm text-sm font-semibold
                       uppercase tracking-wider
                       hover:bg-primary/10 hover:border-primary/60
                       transition-all duration-300"
          >
            تواصل معنا
          </a>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;