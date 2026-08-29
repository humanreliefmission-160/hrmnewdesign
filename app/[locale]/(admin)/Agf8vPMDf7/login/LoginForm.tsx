"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import YellowCTA from "@/app/[locale]/(website)/components/YellowCTA";
import { loginAction } from "../auth-actions";

export default function LoginForm({ locale }: { locale: string }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAction(email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push(`/${locale}/Agf8vPMDf7/donations`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple px-4 py-8">
      <div className="w-full max-w-105">
        {/* Card */}
        <div className="bg-brand-white rounded-sm shadow-xl px-8 py-10 flex flex-col items-center">

          {/* Logo */}
          <div className="mb-8 flex items-center justify-center p-5 w-27.5 h-27.5 rounded-full bg-white border border-gray-200 shadow-sm overflow-hidden">
            <Image
              src="/hrm-admin-donations-logo.svg"
              alt="Human Relief Mission"
              width={85}
              height={85}
              priority
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="login-email" className="font-body text-sm font-semibold text-brand-black">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                required
                className="font-body w-full px-4 py-2.5 rounded border-2 border-purple bg-white text-brand-black placeholder:text-brand-black/35 focus:outline-none focus:border-purple text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="login-password" className="font-body text-sm font-semibold text-brand-black">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="font-body w-full px-4 py-2.5 rounded border-2 border-purple bg-white text-brand-black placeholder:text-brand-black/35 focus:outline-none focus:border-purple text-sm"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-[#B60000] text-sm text-center -mt-1 font-medium">
                {error}
              </p>
            )}

            {/* Submit — YellowCTA renders a <button> which submits the form */}
            <div className="mt-1">
              <YellowCTA
                text={loading ? "Logging in…" : "Login"}
                className="w-full justify-center"
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
