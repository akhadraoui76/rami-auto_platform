import { useState, useMemo, useEffect } from "react";
import { Search, Calendar, Palette, MapPin, Car, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/* ══════════════════════════════════════
   Types
══════════════════════════════════════ */
interface Car {
  id: number;
  model: string;
  brand: string;
  year: number;
  price: number;
  color: string;
  country: string;
  image: string;
}

/* ══════════════════════════════════════
   Constants
══════════════════════════════════════ */
const countries = [
  { value: "All",    label: "All" },
  { value: "China",  label: "China" },
  { value: "Korea",  label: "Korea" },
  { value: "Europe", label: "Europe" },
  { value: "UAE",    label: "UAE" },
];

const priceRanges = [
  { value: "All",       label: "All Prices" },
  { value: "Under 50K", label: "Under 50K" },
  { value: "50K–80K",   label: "50K – 80K" },
  { value: "Over 80K",  label: "Over 80K" },
];

/* ══════════════════════════════════════
   Skeleton Card
══════════════════════════════════════ */
const SkeletonCard = () => (
  <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-muted" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-muted rounded w-1/3" />
      <div className="h-5 bg-muted rounded w-2/3" />
      <div className="h-3 bg-muted rounded w-1/2" />
      <div className="flex justify-between pt-4 border-t border-border">
        <div className="h-6 bg-muted rounded w-24" />
        <div className="h-4 bg-muted rounded w-16" />
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════
   Car Card
══════════════════════════════════════ */
const CarCard = ({ car }: { car: Car }) => (
  <div className="group bg-card border border-border rounded-lg overflow-hidden
                  hover:border-border/80
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                  transition-all duration-300 hover:-translate-y-1">

    {/* Image */}
    <div className="relative overflow-hidden h-48">
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-full object-cover
                   group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t
                      from-black/50 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Country Badge */}
      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm
                       text-white/90 text-[10px] uppercase tracking-wider
                       font-medium px-2.5 py-1 rounded-sm">
        {car.country}
      </span>

      {/* Year Badge */}
      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm
                       text-white/80 text-[10px] font-medium
                       px-2.5 py-1 rounded-sm">
        {car.year}
      </span>
    </div>

    {/* Info */}
    <div className="p-5">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
        {car.brand}
      </p>
      <h3 className="font-display text-lg font-semibold mt-1 text-foreground">
        {car.model}
      </h3>

      {/* Details */}
      <div className="flex items-center gap-4 mt-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {car.year}
        </span>
        <span className="flex items-center gap-1">
          <Palette className="w-3 h-3" />
          {car.color}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {car.country}
        </span>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
        {/* السعر بـ DZD */}
        <div className="flex items-baseline gap-1.5">
          <p className="text-gradient-gold font-display text-xl font-bold">
            {Number(car.price).toLocaleString()}
          </p>
          <span className="text-xs text-muted-foreground font-medium">DZD</span>
        </div>

        <a
          href="#contact"
          className="text-xs uppercase tracking-wider font-semibold
                     text-foreground/70 hover:text-foreground
                     border border-border hover:border-foreground/40
                     px-3 py-1.5 rounded-sm
                     transition-all duration-200"
        >
          تواصل معنا
        </a>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════
   Main Section
══════════════════════════════════════ */
const InventorySection = () => {
  const [cars, setCars]             = useState<Car[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [country, setCountry]       = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [search, setSearch]         = useState("");

  /* ── Fetch ── */
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from("cars").select("*");
      if (error) {
        setError("حدث خطأ أثناء تحميل السيارات. حاول مجدداً.");
        console.error(error);
      } else {
        setCars(data ?? []);
      }
      setLoading(false);
    };
    fetchCars();
  }, []);

  /* ── Filter ── */
  const filtered = useMemo(() => {
    return cars.filter((car) => {
      const price = Number(car.price);
      if (country !== "All" && car.country !== country) return false;
      if (priceRange === "Under 50K" && price >= 50000) return false;
      if (priceRange === "50K–80K" && (price < 50000 || price > 80000)) return false;
      if (priceRange === "Over 80K" && price <= 80000) return false;
      if (search &&
        !`${car.model} ${car.brand}`.toLowerCase()
          .includes(search.toLowerCase())) return false;
      return true;
    });
  }, [cars, country, priceRange, search]);

  return (
    <section id="inventory" dir="rtl" className="py-24 bg-background relative overflow-hidden">

      {/* ── زخرفة خلفية خفيفة ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-l from-primary/50 to-transparent" />
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
              سياراتنا
            </p>
            <span className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            استكشف{" "}
            <span className="text-gradient-gold">المركبات المميزة</span>
          </h2>
          {!loading && (
            <p className="text-muted-foreground text-sm mt-3">
              {filtered.length} سيارة متاحة
            </p>
          )}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 items-center justify-center">

          {/* Search — بالإنجليزية */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2
                               w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by model or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary border border-border rounded-sm
                         pl-10 pr-4 py-2.5 text-sm text-foreground
                         placeholder:text-muted-foreground
                         focus:outline-none focus:ring-1 focus:ring-primary/40
                         focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Country Filters */}
          <div className="flex gap-2 flex-wrap justify-center">
            {countries.map((c) => (
              <button
                key={c.value}
                onClick={() => setCountry(c.value)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider
                            rounded-sm transition-all duration-200 border
                            ${country === c.value
                              ? "bg-foreground text-background border-foreground"
                              : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                            }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="bg-secondary border border-border rounded-sm
                       px-4 py-2.5 text-sm text-foreground
                       focus:outline-none focus:ring-1 focus:ring-primary/40
                       focus:border-primary/40 transition-colors cursor-pointer"
          >
            {priceRanges.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* ── Error State ── */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs border border-border text-muted-foreground
                         px-4 py-2 rounded-sm hover:text-foreground
                         hover:border-foreground/40 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* ── Loading Skeletons ── */}
        {loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Cars Grid ── */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full bg-muted
                            flex items-center justify-center">
              <Car className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground/80 text-base font-medium">
              لا توجد سيارات تطابق بحثك
            </p>
            <p className="text-muted-foreground text-sm">
              جرّب تغيير الفلاتر أو البحث بكلمة أخرى
            </p>
            <button
              onClick={() => {
                setCountry("All");
                setPriceRange("All");
                setSearch("");
              }}
              className="text-xs border border-border text-muted-foreground
                         px-5 py-2 rounded-sm hover:text-foreground
                         hover:border-foreground/40 transition-colors mt-2"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default InventorySection;