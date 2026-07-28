import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import CarTable from "@/components/admin/CarTable";
import {
  LayoutDashboard,
  Car,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Loader2,
} from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [carsCount, setCarsCount] = useState<number | null>(null);

  /* ── حماية الصفحة ── */
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
        return;
      }
      setUserEmail(session.user.email ?? "");
      setCheckingAuth(false);
    };
    checkAuth();
  }, [navigate]);

  /* ── إحصائية عدد السيارات ── */
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("cars")
        .select("*", { count: "exact", head: true });
      setCarsCount(count ?? 0);
    };
    fetchCount();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  /* ── Loading أثناء التحقق من الجلسة ── */
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">جاري التحقق من الجلسة...</p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background flex">

      {/* ══════════════════════════════════════
          Sidebar
      ══════════════════════════════════════ */}
      <aside
        className={`fixed lg:sticky top-0 right-0 h-screen z-40
                    w-64 bg-card border-l border-border
                    flex flex-col transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                  `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <a href="/" className="font-display text-xl font-bold">
            <span className="text-gradient-gold">RAMI</span>
            <span className="text-foreground"> AUTO</span>
          </a>
          <p className="text-muted-foreground text-xs mt-1">لوحة التحكم</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          <a
            href="#dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-sm
                       bg-primary/10 text-primary text-sm font-medium"
          >
            <LayoutDashboard className="w-4 h-4" />
            لوحة التحكم
          </a>
          <a
            href="#cars"
            className="flex items-center gap-3 px-4 py-3 rounded-sm
                       text-muted-foreground hover:bg-secondary hover:text-foreground
                       text-sm font-medium transition-colors"
          >
            <Car className="w-4 h-4" />
            إدارة السيارات
          </a>
        </nav>

        {/* User Info + Logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-gold
                            flex items-center justify-center
                            text-primary-foreground font-bold text-sm shrink-0">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-foreground font-medium truncate">
                {userEmail}
              </p>
              <p className="text-[10px] text-muted-foreground">مسؤول</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-sm
                       text-red-400 hover:bg-red-500/10
                       text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* ── Overlay للموبايل ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* ══════════════════════════════════════
          Main Content
      ══════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm
                           border-b border-border px-6 py-4
                           flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                لوحة التحكم
              </h1>
              <p className="text-muted-foreground text-xs mt-0.5">
                إدارة سيارات المعرض
              </p>
            </div>
          </div>

          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </header>

        {/* ── Content ── */}
        <main className="flex-1 p-6 space-y-6">

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-5
                            flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary/10
                              flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {carsCount === null ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    carsCount
                  )}
                </p>
                <p className="text-muted-foreground text-xs">إجمالي السيارات</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-5
                            flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary/10
                              flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">نشط</p>
                <p className="text-muted-foreground text-xs">حالة الموقع</p>
              </div>
            </div>
          </div>

          {/* Cars Table Card */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                إدارة السيارات
              </h2>
            </div>
            <CarTable />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Admin;