import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Car,
  DollarSign,
  Calendar,
  Palette,
  Globe,
  CheckCircle,
  Upload,
  X,
  Loader2,
  ImageIcon,
} from "lucide-react";

interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number; // تأكد من أنه number في الداتا بيس
  country: string;
  status: "متاح" | "محجوز" | "مباع";
  image: string;
  color: string;
}

interface CarFormProps {
  onSuccess: () => void;
  car?: Car | null;
}

const countriesList = [
  { value: "China", label: "الصين" },
  { value: "Korea", label: "كوريا" },
  { value: "Europe", label: "أوروبا" },
  { value: "UAE", label: "الإمارات" },
];

const statusList = [
  { value: "متاح", label: "متاح", color: "text-green-400" },
  { value: "محجوز", label: "محجوز", color: "text-amber-400" },
  { value: "مباع", label: "مباع", color: "text-red-400" },
];

const CarForm = ({ onSuccess, car }: CarFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    color: "",
    country: "China",
    status: "متاح" as Car["status"],
  });
  const [image, setImage] = useState<File | null>(null);

  // تعبئة النموذج عند التعديل
  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: String(car.year),
        price: String(car.price),
        color: car.color,
        country: car.country,
        status: car.status,
      });
      setPreviewUrl(car.image);
    }
  }, [car]);

  // تنظيف معاينة الصورة عند إلغاء تحميلها
  useEffect(() => {
    return () => {
      if (previewUrl && !car?.image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, car]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // مسح الخطأ عند الكتابة
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // التحقق من حجم الصورة (مثلاً أقل من 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
        }));
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) newErrors.brand = "الماركة مطلوبة";
    if (!formData.model.trim()) newErrors.model = "الموديل مطلوب";
    if (!formData.year.trim()) {
      newErrors.year = "السنة مطلوبة";
    } else if (
      !/^\d{4}$/.test(formData.year) ||
      Number(formData.year) < 2000 ||
      Number(formData.year) > new Date().getFullYear() + 1
    ) {
      newErrors.year = "سنة غير صالحة (2000-2026)";
    }

    if (!formData.price.trim()) {
      newErrors.price = "السعر مطلوب";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "سعر غير صالح";
    }

    if (!formData.color.trim()) newErrors.color = "اللون مطلوب";
    if (!image && !car?.image) newErrors.image = "صورة السيارة مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast({
        title: "⚠️ يرجى تصحيح الأخطاء",
        description: "تحقق من الحقول المطلوبة باللون الأحمر",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = car?.image || "";

      // رفع الصورة إن وجدت
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = `cars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("cars")
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("cars").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }

      // تحضير البيانات
      const carData = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: Number(formData.year),
        price: Number(formData.price),
        color: formData.color.trim(),
        country: formData.country,
        status: formData.status,
        image: imageUrl,
      };

      let error;

      if (car) {
        // تحديث
        const { error: updateError } = await supabase
          .from("cars")
          .update(carData)
          .eq("id", car.id);
        error = updateError;
        if (!error) {
          toast({
            title: "✅ تم التحديث بنجاح",
            description: `تم تحديث بيانات ${carData.model}`,
          });
        }
      } else {
        // إضافة جديدة
        const { error: insertError } = await supabase
          .from("cars")
          .insert([carData]);
        error = insertError;
        if (!error) {
          toast({
            title: "✅ تمت الإضافة بنجاح",
            description: `تمت إضافة ${carData.model} إلى المخزون`,
          });
        }
      }

      if (error) throw error;

      // إعادة تعيين النموذج
      if (!car) {
        setFormData({
          brand: "",
          model: "",
          year: "",
          price: "",
          color: "",
          country: "China",
          status: "متاح",
        });
        setImage(null);
        setPreviewUrl(null);
      }

      onSuccess();
    } catch (err: any) {
      console.error(err);
      toast({
        title: "❌ حدث خطأ",
        description: err.message || "لم نتمكن من حفظ البيانات. حاول مجدداً.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] overflow-y-auto pr-2"
      dir="rtl"
    >
      {/* العنوان */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
          <Car className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            {car ? "تعديل بيانات السيارة" : "إضافة سيارة جديدة"}
          </h2>
          <p className="text-muted-foreground text-xs">
            {car
              ? "قم بتحديث معلومات السيارة أدناه"
              : "أدخل تفاصيل السيارة الجديدة لإضافتها للمخزون"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* الماركة */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            الماركة <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Car className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="brand"
              placeholder="مثال: Toyota, Hyundai"
              value={formData.brand}
              onChange={handleChange}
              className={`w-full bg-secondary border rounded-sm pr-10 pl-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors ${
                errors.brand ? "border-red-500" : "border-border"
              }`}
            />
          </div>
          {errors.brand && (
            <p className="text-red-400 text-xs">{errors.brand}</p>
          )}
        </div>

        {/* الموديل */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            الموديل <span className="text-red-400">*</span>
          </label>
          <input
            name="model"
            placeholder="مثال: Camry, Sonata"
            value={formData.model}
            onChange={handleChange}
            className={`w-full bg-secondary border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors ${
              errors.model ? "border-red-500" : "border-border"
            }`}
          />
          {errors.model && (
            <p className="text-red-400 text-xs">{errors.model}</p>
          )}
        </div>

        {/* السنة */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            سنة الصنع <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="year"
              type="number"
              placeholder="2024"
              value={formData.year}
              onChange={handleChange}
              className={`w-full bg-secondary border rounded-sm pr-10 pl-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors ${
                errors.year ? "border-red-500" : "border-border"
              }`}
            />
          </div>
          {errors.year && <p className="text-red-400 text-xs">{errors.year}</p>}
        </div>

        {/* السعر */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            السعر (د.ج) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="price"
              type="number"
              placeholder="500000"
              value={formData.price}
              onChange={handleChange}
              className={`w-full bg-secondary border rounded-sm pr-10 pl-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors ${
                errors.price ? "border-red-500" : "border-border"
              }`}
            />
          </div>
          {errors.price && (
            <p className="text-red-400 text-xs">{errors.price}</p>
          )}
        </div>

        {/* اللون */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            اللون <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Palette className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="color"
              placeholder="مثال: أبيض، أسود، رمادي"
              value={formData.color}
              onChange={handleChange}
              className={`w-full bg-secondary border rounded-sm pr-10 pl-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors ${
                errors.color ? "border-red-500" : "border-border"
              }`}
            />
          </div>
          {errors.color && (
            <p className="text-red-400 text-xs">{errors.color}</p>
          )}
        </div>

        {/* البلد */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            بلد المنشأ <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-secondary border border-border rounded-sm pr-10 pl-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors appearance-none"
            >
              {countriesList.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* الحالة */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs text-muted-foreground font-medium">
            حالة السيارة
          </label>
          <div className="flex gap-3 flex-wrap">
            {statusList.map((s) => (
              <label
                key={s.value}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm border cursor-pointer transition-all ${
                  formData.status === s.value
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={s.value}
                  checked={formData.status === s.value}
                  onChange={handleChange}
                  className="hidden"
                />
                <CheckCircle
                  className={`w-4 h-4 ${formData.status === s.value ? "opacity-100" : "opacity-0"}`}
                />
                <span className={`text-sm font-medium ${s.color}`}>{s.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* الصورة */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            صورة السيارة{" "}
            {!car && <span className="text-red-400">*</span>}
          </label>

          <div className="flex gap-4 items-start">
            {/* معاينة الصورة */}
            <div
              className={`relative w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden shrink-0 ${
                errors.image ? "border-red-500 bg-red-500/5" : "border-border bg-secondary"
              }`}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreviewUrl(car?.image || null);
                      if (!car?.image) setPreviewUrl(null);
                    }}
                    className="absolute top-1 left-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="text-center p-2">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/50 mx-auto mb-1" />
                  <span className="text-[10px] text-muted-foreground">
                    لا توجد صورة
                  </span>
                </div>
              )}
            </div>

            {/* حقل الرفع */}
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border border-dashed border-border bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">اضغط للرفع</span> أو اسحب الصورة هنا
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">
                    PNG, JPG (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {errors.image && (
                <p className="text-red-400 text-xs mt-2">{errors.image}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
        <button
          type="button"
          onClick={onSuccess}
          className="px-6 py-2.5 rounded-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          disabled={isSubmitting}
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-gold text-primary-foreground px-8 py-2.5 rounded-sm text-sm font-semibold uppercase tracking-wider hover:opacity-90 disabled:opacity-60 transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : car ? (
            "حفظ التغييرات"
          ) : (
            "إضافة السيارة"
          )}
        </button>
      </div>
    </form>
  );
};

export default CarForm;