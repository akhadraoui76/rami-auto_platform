import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, ShieldCheck, ArrowRight, Mail, Lock } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const validate = () => {
    if (!email.trim()) {
      setError("الرجاء إدخال البريد الإلكتروني");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("صيغة البريد الإلكتروني غير صحيحة");
      return false;
    }
    if (!password) {
      setError("الرجاء إدخال كلمة المرور");
      return false;
    }
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      } else {
        setError("حدث خطأ أثناء تسجيل الدخول. حاول مجدداً");
      }
      return;
    }

    navigate("/admin");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4"
    >
      {/* ── زخرفة خلفية ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px
                        bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ── رابط العودة للموقع ── */}
      <Link
        to="/"
        className="absolute top-6 right-6 flex items-center gap-2
                   text-muted-foreground hover:text-primary
                   text-sm transition-colors group"
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
        العودة للموقع
      </Link>

      {/* ══ Card ══ */}
      <div className="w-full max-w-md relative">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14
                          rounded-full bg-primary/10 border border-primary/20 mb-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold">
            <span className="text-gradient-gold">RAMI</span>
            <span className="text-foreground"> AUTO</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-1 tracking-wide">
            لوحة تحكم الإدارة
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-lg p-8
                        shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

          <h2 className="font-display text-lg font-semibold mb-1 text-foreground">
            تسجيل الدخول
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            أدخل بياناتك للوصول إلى لوحة التحكم
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="admin@ramiauto.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  autoComplete="email"
                  className="w-full bg-secondary border border-border rounded-sm
                             pr-10 pl-4 py-3 text-sm text-foreground
                             placeholder:text-muted-foreground
                             focus:outline-none focus:ring-1 focus:ring-primary/50
                             focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  autoComplete="current-password"
                  className="w-full bg-secondary border border-border rounded-sm
                             pr-10 pl-10 py-3 text-sm text-foreground
                             placeholder:text-muted-foreground
                             focus:outline-none focus:ring-1 focus:ring-primary/50
                             focus:border-primary/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2
                             text-muted-foreground hover:text-foreground
                             transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-border accent-primary cursor-pointer"
                />
                تذكرني
              </label>
              <a href="#" className="text-primary hover:underline">
                نسيت كلمة المرور؟
              </a>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-2.5">
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold text-primary-foreground
                         px-6 py-3.5 rounded-sm text-sm font-semibold
                         uppercase tracking-wider
                         hover:opacity-90 disabled:opacity-60
                         transition-all duration-300
                         flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-muted-foreground/60 text-xs mt-6">
          هذه الصفحة مخصصة للمسؤولين فقط. جميع محاولات الدخول مسجّلة.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;