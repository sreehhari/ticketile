"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const res = await signIn("credentials", {
      redirect: false, // prevent NextAuth from handling redirects automatically
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok) {
      // Only push to /account if sign-in was successful
      router.push("/account");
    } else {
      console.error("Login failed", res?.error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    name="email"
                    placeholder="example@gmail.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    placeholder="*******"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <CardFooter className="flex justify-end">
                <Button type="submit">SignIn</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
