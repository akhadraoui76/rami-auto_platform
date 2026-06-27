import { Ship, FileCheck, ShieldCheck, Truck } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "الشحن الدولي",
    desc: "خدمة شحن السيارات من الصين إلى الجزائر مع متابعة مراحل النقل وتأمين كامل للسيارة حتى وصولها.",
  },
  {
    icon: FileCheck,
    title: "إجراءات الاستيراد والجمارك",
    desc: "نتكفل بجميع الإجراءات الإدارية، الوثائق، والتراخيص اللازمة لضمان عملية استيراد سهلة وسريعة.",
  },
  {
    icon: ShieldCheck,
    title: "ضمان وحماية السيارة",
    desc: "نوفر حلول حماية وتأمين للسيارة أثناء النقل لضمان وصولها بأفضل حالة ممكنة.",
  },
  {
    icon: Truck,
    title: "التوصيل داخل الجزائر",
    desc: "خدمة توصيل السيارة إلى مكانك داخل الجزائر مع الحرص على سلامتها وجودة التسليم.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3">خدماتنا</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            حلول استيراد متكاملة <span className="text-gradient-gold"> من الصين إلى الجزائر</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-card border border-border rounded-lg p-8 hover:shadow-gold transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
