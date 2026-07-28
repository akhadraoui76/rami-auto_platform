import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "من أي دول تستوردون السيارات؟",
    a: "نختص في استيراد السيارات من الصين، مع توفير حلول متكاملة للشحن والإجراءات اللازمة حتى وصول السيارة إلى الجزائر.",
  },
  {
    q: "كم تستغرق عملية استيراد السيارة؟",
    a: "تختلف المدة حسب نوع السيارة ومصدرها وإجراءات الشحن والجمارك، ونحرص على متابعة العميل وإبقائه على اطلاع في كل مرحلة.",
  },
  {
    q: "هل تتكفلون بجميع إجراءات الجمارك والوثائق؟",
    a: "نعم، نتكفل بجميع الإجراءات الإدارية والوثائق اللازمة لضمان عملية استيراد سهلة ومنظمة.",
  },
  {
    q: "هل السيارة مؤمنة أثناء الشحن؟",
    a: "نعم، نوفر حلول تأمين لحماية السيارة أثناء عملية النقل حتى وصولها بأمان.",
  },
  {
    q: "هل يمكن طلب سيارة غير موجودة في القائمة؟",
    a: "بالتأكيد، نوفر خدمة البحث عن السيارات حسب طلب العميل ونساعدك في إيجاد الموديل المناسب.",
  },
  {
    q: "ما هي طرق الدفع المتوفرة؟",
    a: "نوفر طرق دفع مناسبة وآمنة حسب طبيعة الطلب وإجراءات الاستيراد المتفق عليها.",
  },
];

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  return (
    <section
      id="faq"
      dir="rtl"
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* ── زخرفة خلفية ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -top-32 right-1/4 w-72 h-72 rounded-full
                        bg-primary/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-3xl relative">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-l from-primary/50 to-transparent" />
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
              الأسئلة الشائعة
            </p>
            <span className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            كل ما تحتاج <span className="text-gradient-gold">معرفته</span>
          </h2>

          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            إجابات على أكثر الأسئلة شيوعًا حول خدمات استيراد السيارات لدينا
          </p>
        </div>

        {/* ── Accordion ── */}
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="space-y-3"
        >
          {faqs.map((faq, i) => {
            const value = `item-${i}`;
            const isOpen = openItem === value;

            return (
              <AccordionItem
                key={i}
                value={value}
                className={`bg-card border rounded-lg px-6 transition-all duration-300
                  ${isOpen
                    ? "border-primary/40 shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                    : "border-border hover:border-border/80"
                  }
                `}
              >
                <AccordionTrigger
                  className="text-right font-semibold text-sm
                             hover:no-underline hover:text-primary
                             py-5 gap-4 [&>svg]:shrink-0"
                >
                  <span className="flex items-center gap-3 flex-1">
                    {/* رقم السؤال */}
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center
                                  justify-center text-[11px] font-bold
                                  transition-colors duration-300
                                  ${isOpen
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-primary/10 text-primary"
                                  }
                                `}
                    >
                      {i + 1}
                    </span>
                    <span className="text-foreground">{faq.q}</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pr-9">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 flex flex-col items-center gap-4
                        text-center border-t border-border/60 pt-10">
          <div className="w-12 h-12 rounded-full bg-primary/10
                          flex items-center justify-center">
            <MessageCircleQuestion className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm mb-1">
              لم تجد إجابة لسؤالك؟
            </p>
            <p className="text-muted-foreground text-xs">
              فريقنا جاهز للإجابة على جميع استفساراتك
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-2
                       bg-gradient-gold text-primary-foreground
                       px-6 py-2.5 rounded-sm text-sm font-semibold
                       uppercase tracking-wider
                       hover:opacity-90 transition-opacity"
          >
            تواصل معنا
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;