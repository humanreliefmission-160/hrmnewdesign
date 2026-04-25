"use client";

import YellowCTA from "@/app/(website)/components/YellowCTA";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple font-body px-4">
      <div className="bg-brand-white w-full max-w-md p-10 md:p-14 shadow-card">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-brand-white flex items-center justify-center border border-purple-faint">
            <div className="relative w-16 h-16">
              <Image
                src="/logo-main.svg"
                alt="Human Relief Mission Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
          </div>
        </div>
        <h1 className="text-center text-lg font-normal text-brand-black mb-8">Login to your Database account</h1>

        <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center">

          <label
            htmlFor="email"
            className="block w-full text-left text-xs font-medium text-brand-black mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@email.com"
            className="w-full px-4 py-2.5 border border-purple text-brand-black bg-transparent focus:outline-none focus:ring-1 focus:ring-purple"
            required autoComplete="email"
          />

          <label
            htmlFor="password"
            className="block w-full text-left text-xs font-medium text-brand-black mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            className="w-full px-4 py-2.5 border border-purple text-brand-black bg-transparent focus:outline-none focus:ring-1 focus:ring-purple tracking-widest placeholder:tracking-widest"
            required
          />


          <YellowCTA
            text="Login"
            href="/database"
          />
        </form>

        <div className="mt-4 text-center">
          <Link
            href="#"
            className="text-[10px] font-semibold text-purple-dark hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
