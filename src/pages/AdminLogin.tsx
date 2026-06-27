
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
      return;
    }

    navigate("/admin");
  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle>
            Admin Login
          </CardTitle>
        </CardHeader>


        <CardContent>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />


            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />


            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}


            <Button className="w-full">
              Login
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
};

export default AdminLogin;