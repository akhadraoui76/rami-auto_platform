import { Star } from "lucide-react";

const testimonials = [
  {
    name: "محمد بن يوسف",
    location: "الجزائر العاصمة، الجزائر",
    text: "خدمة ممتازة من بداية الطلب إلى استلام السيارة. ساعدني فريقكم في جميع إجراءات الاستيراد والجمارك بكل احترافية.",
    rating: 5,
  },
  {
    name: "عبد القادر بوشامة",
    location: "وهران، الجزائر",
    text: "تجربة رائعة في استيراد سيارتي من الصين. الفريق كان متابعًا لكل التفاصيل ووصلت السيارة في أفضل حالة.",
    rating: 5,
  },
  {
    name: "سفيان قادري",
    location: "سطيف، الجزائر",
    text: "تعامل احترافي وسرعة في الإنجاز. تم توضيح كل مراحل الشحن والإجراءات حتى استلام السيارة.",
    rating: 5,
  },
  {
    name: "ياسين بن علي",
    location: "قسنطينة، الجزائر",
    text: "خدمة موثوقة وفريق متعاون جدًا. ساعدوني في اختيار السيارة المناسبة وإتمام عملية الاستيراد بسهولة.",
    rating: 5,
  },
];
const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3">آراء العملاء</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
           ماذا يقول  <span className="text-gradient-gold">الزبائن عنا </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-gold transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
