import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "محمد بن يوسف",
    location: "الجزائر العاصمة",
    text: "خدمة ممتازة من بداية الطلب إلى استلام السيارة. ساعدني فريقكم في جميع إجراءات الاستيراد والجمارك بكل احترافية.",
    rating: 5,
  },
  {
    name: "عبد القادر بوشامة",
    location: "وهران",
    text: "تجربة رائعة في استيراد سيارتي من الصين. الفريق كان متابعًا لكل التفاصيل ووصلت السيارة في أفضل حالة.",
    rating: 5,
  },
  {
    name: "سفيان قادري",
    location: "سطيف",
    text: "تعامل احترافي وسرعة في الإنجاز. تم توضيح كل مراحل الشحن والإجراءات حتى استلام السيارة.",
    rating: 5,
  },
  {
    name: "ياسين بن علي",
    location: "قسنطينة",
    text: "خدمة موثوقة وفريق متعاون جدًا. ساعدوني في اختيار السيارة المناسبة وإتمام عملية الاستيراد بسهولة.",
    rating: 5,
  },
];

/* ── Avatar Colors ── */
const avatarColors = [
  "from-slate-600 to-slate-700",
  "from-zinc-600  to-zinc-700",
  "from-stone-600 to-stone-700",
  "from-neutral-600 to-neutral-700",
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      dir="rtl"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* ── زخرفة خلفية ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full
                        bg-primary/4 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full
                        bg-primary/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-l from-primary/50 to-transparent" />
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
              آراء العملاء
            </p>
            <span className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ماذا يقول{" "}
            <span className="text-gradient-gold">عملاؤنا عنا</span>
          </h2>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">5.0</span>
            <span className="text-muted-foreground text-sm">
              — بناءً على آراء عملائنا
            </span>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className="group relative bg-card border border-border rounded-lg p-6
                         hover:border-border/80
                         hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                         hover:-translate-y-1.5
                         transition-all duration-300
                         overflow-hidden flex flex-col"
            >
              {/* خط علوي عند hover */}
              <div
                className="absolute top-0 right-0 left-0 h-[2px] rounded-t-lg
                           bg-gradient-to-l from-primary/40 via-primary/80 to-primary/40
                           scale-x-0 group-hover:scale-x-100
                           transition-transform duration-300 origin-right"
              />

              {/* Quote Icon */}
              <div className="flex items-start justify-between mb-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote decorative */}
                <Quote
                  className="w-6 h-6 text-foreground/8 rotate-180 shrink-0"
                />
              </div>

              {/* Text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="h-px w-full bg-border/60 mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[index]}
                               flex items-center justify-center
                               text-white font-bold text-sm shrink-0
                               ring-2 ring-border`}
                >
                  {t.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs truncate">
                    {t.location}
                  </p>
                </div>

                {/* Verified */}
                <span className="mr-auto text-[10px] text-primary/70
                                 border border-primary/20 bg-primary/5
                                 px-2 py-0.5 rounded-full shrink-0 font-medium">
                  ✓ موثق
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Trust Bar ── */}
        <div className="mt-14 flex flex-col sm:flex-row items-center
                        justify-center gap-6 sm:gap-12
                        py-6 border-y border-border/50">
          {[
            { value: "+500",  label: "عميل راضٍ" },
            { value: "100%",  label: "نسبة الرضا" },
            { value: "+16",   label: "سنة خبرة" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-gradient-gold">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;