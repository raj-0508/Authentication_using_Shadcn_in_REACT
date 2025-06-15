import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../lib/context/user";

export function SignupCard() {
  const { register } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(email.trim(), password, name.trim(), mobile.trim(), age);
    } catch (err) {
      console.error(err);
      setError("Sign‑up failed. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto mt-24">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Fill in the details below to sign up for a new account
        </CardDescription>
        <CardAction>
          <Link
            to="/"
            className="text-sm text-primary underline hover:text-primary/80"
          >
            Login
          </Link>
        </CardAction>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="abc@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="1234567890"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full" disabled>
            Sign Up with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
