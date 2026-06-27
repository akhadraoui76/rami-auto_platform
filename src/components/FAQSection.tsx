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
  return (
    <section id="faq" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-14">
          
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            الاسئلة <span className="text-gradient-gold">الشائعة</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-gold transition-all"
            >
              <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline hover:text-primary py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
