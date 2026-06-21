"use client";

import { useState } from "react";
import { register } from "@/shared/api/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setToken } from "@/shared/store/authSlice";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await register(email, password, userName);

      if (data.access_token) {
        dispatch(setToken(data.access_token));
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <section className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Create account</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Register new user</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Create your account and start managing good deeds with your friends.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-sm font-medium text-slate-700">Username</label>
          <input
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

          <button
            className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </div>
      </section>
    </main>
  );
}