import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import carSuv from "@/assets/car-suv.png";
import carSedan from "@/assets/car-sedan.png";
import carElectric from "@/assets/car-electric.png";
import carCoupe from "@/assets/car-coupe.png";
import carTruck from "@/assets/car-truck.png";
import heroCar from "@/assets/hero-car.png";

interface Car {
  id: number;
  model: string;
  brand: string;
  year: number;
  price: string;
  color: string;
  country: string;
  image: string;
}

const cars: Car[] = [
  { 
    id: 1, 
    model: "Tiggo 7 Pro Max", 
    brand: "Chery", 
    year: 2025, 
    price: 'contact us', 
    color: "White", 
    country: "China", 
    image: carSuv 
  },
  { 
    id: 2, 
    model: "Coolray", 
    brand: "Geely", 
    year: 2025, 
    price: 'contact us', 
    color: "Black", 
    country: "China", 
    image: carSuv 
  },
  { 
    id: 3, 
    model: "Song Plus", 
    brand: "BYD", 
    year: 2025, 
    price: 'contact us', 
    color: "Grey", 
    country: "China", 
    image: carElectric 
  },
  { 
    id: 4, 
    model: "X70 Plus", 
    brand: "Jetour", 
    year: 2025, 
    price: 'contact us', 
    color: "White", 
    country: "China", 
    image: carSuv 
  },
  { 
    id: 5, 
    model: "CS55 Plus", 
    brand: "Changan", 
    year: 2025, 
    price: 'contact us', 
    color: "Blue", 
    country: "China", 
    image: carSuv 
  },
  { 
    id: 6, 
    model: "MG ZS", 
    brand: "MG", 
    year: 2025, 
    price: 'contact us', 
    color: "Red", 
    country: "China", 
    image: carSuv 
  },
  { 
    id: 7, 
    model: "Golf 8 GTD", 
    brand: "Volkswagen", 
    year: 2024, 
    price: 'contact us', 
    color: "Grey", 
    country: "Germany", 
    image: carSedan 
  },
  { 
    id: 8, 
    model: "T-Roc", 
    brand: "Volkswagen", 
    year: 2025, 
    price: 'contact us', 
    color: "Black", 
    country: "Germany", 
    image: carSuv 
  },
];

const countries = ["All", "China", "Korea", "Europe", "UAE"];
const priceRanges = ["All", "Under $50K", "$50K–$80K", "Over $80K"];

const InventorySection = () => {
  const [country, setCountry] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      if (country !== "All" && car.country !== country) return false;
      if (priceRange === "Under $50K" && car.price >= "50000") return false;
      if (priceRange === "$50K–$80K" && (car.price < "50000" || car.price > "80000")) return false;
      if (priceRange === "Over $80K" && car.price <= "80000") return false;
      if (search && !`${car.model} ${car.brand}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [country, priceRange, search]);

  return (
    <section id="inventory" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3">سياراتنا</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            استكشف <span className="text-gradient-gold">المركبات المميزة</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by model or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary border border-border rounded-sm pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-sm transition-all font-medium ${
                  country === c
                    ? "bg-gradient-gold text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="bg-secondary border border-border rounded-sm px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {priceRanges.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((car) => (
            <div
              key={car.id}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-gold transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm">
                  {car.country}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{car.brand}</p>
                <h3 className="font-display text-lg font-semibold mt-1">{car.model}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{car.year}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>{car.color}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-gradient-gold font-display text-xl font-bold">
                    ${car.price.toLocaleString()}
                  </p>
                  <a
                    href="#contact"
                    className="text-xs uppercase tracking-wider text-primary hover:underline font-medium"
                  >
                    تواصل معنا →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">لا توجد مركبات تطابق البحث الخاص بك.</p>
        )}
      </div>
    </section>
  );
};

export default InventorySection;
