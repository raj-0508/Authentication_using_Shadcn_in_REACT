import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/context/user";

export default function Dashboard() {
  const { current: user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome, {user.name || "friend"}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">You’re now logged in.</p>
        </CardContent>
      </Card>
    </div>
  );
}
