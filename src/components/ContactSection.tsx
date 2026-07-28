import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    /* محاكاة إرسال */
    await new Promise((r) => setTimeout(r, 1200));

    toast({
      title: "✅ تم إرسال رسالتك",
      description: "سوف يتم التواصل معك في أقرب وقت ممكن.",
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    setLoading(false);
  };

  /* ── Input className مشترك ── */
  const inputCls = `w-full bg-secondary border border-border rounded-sm
                    px-4 py-3 text-sm text-foreground
                    placeholder:text-muted-foreground
                    focus:outline-none focus:ring-1 focus:ring-primary/50
                    focus:border-primary/50 transition-colors`;

  return (
    <section
      id="contact"
      dir="rtl"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* ── زخرفة خلفية ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full
                        bg-primary/4 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full
                        bg-primary/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-l from-primary/50 to-transparent" />
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
              تواصل معنا
            </p>
            <span className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            نحن هنا{" "}
            <span className="text-gradient-gold">لمساعدتك</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            تواصل معنا لأي استفسار حول استيراد سيارتك وسنرد عليك في أقرب وقت
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ══ Form ══ */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">
              أرسل لنا رسالة
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground font-medium">
                    الإسم الكامل <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground font-medium">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">
                  رقم الهاتف <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="05XXXXXXXX"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">
                  رسالتك <span className="text-red-400">*</span>
                </label>
                <textarea
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-gold text-primary-foreground
                           px-8 py-3.5 rounded-sm text-sm font-semibold
                           uppercase tracking-wider
                           hover:opacity-90 disabled:opacity-60
                           transition-all duration-300
                           flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    إرسال الرسالة
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ══ Info + Map ══ */}
          <div className="space-y-6">

            {/* Contact Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-5">
              <h3 className="font-display text-base font-semibold text-foreground">
                معلومات التواصل
              </h3>

              {[
                {
                  icon: Phone,
                  label: "رقم الهاتف",
                  value: "+213 770 755 111",
                  href: "tel:+213770755111",
                },
                {
                  icon: Mail,
                  label: "البريد الإلكتروني",
                  value: "info@ramiauto.com",
                  href: "mailto:info@ramiauto.com",
                },
                {
                  icon: MapPin,
                  label: "الموقع",
                  value: "باتنة، الجزائر",
                  href: "#",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-primary/8 border border-primary/15
                               flex items-center justify-center shrink-0
                               group-hover:bg-primary/15 group-hover:border-primary/30
                               transition-all duration-300"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground/60 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground/80
                                  group-hover:text-foreground transition-colors font-medium">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Divider */}
              <div className="h-px bg-border/60" />

              {/* WhatsApp */}
              <a
                href="https://wa.me/213770755111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full
                           bg-[#25D366]/10 border border-[#25D366]/30
                           text-[#25D366] hover:bg-[#25D366]/20
                           px-5 py-3 rounded-sm text-sm font-semibold
                           transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
               WhatsApp
              </a>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-border h-64">
              <iframe
                title="Rami Auto Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.8142567432255!2d6.1493975!3d35.533587499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f413000d34acd5%3A0x56b3fd3015f694e9!2sRami%20Auto!5e0!3m2!1sfr!2sae!4v1782526835946!5m2!1sfr!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;