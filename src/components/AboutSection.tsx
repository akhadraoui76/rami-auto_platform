import { Shield, Award, Users, Globe } from "lucide-react";
import carSedan from "@/assets/car-sedan.png";

const features = [
  { icon: Shield, title: "خبراء موثوقون", desc: "نتعامل مع شركاء موثوقين لضمان أفضل السيارات." },
  { icon: Award, title: "جودة مضمونة", desc: "نحرص على اختيار سيارات بحالة وجودة عالية." },
  { icon: Users, title: "فريق متخصص", desc: "فريق ذو خبرة لمرافقتك في جميع مراحل الاستيراد." },
  { icon: Globe, title: "استيراد من الصين", desc: "حلول متكاملة من الشراء إلى التسليم في الجزائر." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-gold-lg">
              <img
                src={carSedan}
                alt="RAMI AUTO car import"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/30 rounded-lg hidden lg:block" />
          </div>

          {/* Text */}
          <div>
            <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3">
              من نحن
            </p>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              خبرة وثقة في <span className="text-gradient-gold">استيراد السيارات</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              RAMI AUTO شركة متخصصة في استيراد السيارات من الصين إلى الجزائر، نوفر لعملائنا سيارات مختارة بعناية مع خدمة احترافية تشمل جميع مراحل الاستيراد.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-10">
              نرافقك من اختيار السيارة والشحن إلى الإجراءات الجمركية والتسليم، لضمان تجربة استيراد سهلة وآمنة.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
                    <p className="text-muted-foreground text-xs">{f.desc}</p>
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
