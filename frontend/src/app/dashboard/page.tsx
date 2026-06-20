"use client"
import FriendsSection from "@/features/friends/FriendsSection";
import GoodDeedsSection from "@/features/good-deeds/GoodDeedsSection";
import { getMe } from "@/shared/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe();
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
        <h1 className="text-4xl font-semibold text-slate-950">Your Good Deeds</h1>
      </div>

      <GoodDeedsSection />

      <FriendsSection />
    </main>
  );
}
