import { redirect } from "next/navigation";
import { supabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";
export const dynamic = "force-dynamic";
export default async function LoginPage() {
  const configured = !!supabaseConfig();
  if (configured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    if (data?.claims) redirect("/account");
  }
  return <main className="min-h-dvh p-5 sm:p-10 lg:p-14">
    <header className="mx-auto flex max-w-6xl items-center gap-3"><span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white">h.</span><span className="text-lg font-bold tracking-tight">Hackathon App</span></header>
    <div className="mx-auto grid min-h-[75vh] max-w-6xl items-center gap-12 py-12 lg:grid-cols-2 lg:gap-24">
      <section className="hidden lg:block"><span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-violet-700">A SMALL START. A BIG IDEA.</span><h1 className="mt-7 text-6xl font-semibold leading-[1.08] tracking-[-0.055em]">Your next idea<br />starts <span className="text-violet-600">here.</span></h1><p className="mt-6 max-w-sm text-lg leading-8 text-slate-500">A little curiosity. A fresh perspective.<br />Make something that matters.</p><div aria-hidden="true" className="relative mt-12 h-40 w-80"><div className="absolute left-4 top-2 h-28 w-28 rotate-[-12deg] rounded-3xl border border-violet-200 bg-violet-100" /><div className="absolute left-24 top-6 flex h-28 w-28 rotate-12 items-center justify-center rounded-3xl bg-violet-600 text-5xl text-white shadow-xl shadow-violet-200">✳</div><div className="absolute left-52 top-16 h-14 w-14 rounded-full bg-lime-300" /></div></section>
      <section className="w-full rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/30 sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Welcome back</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Let’s get you signed in.</h2><p className="mt-3 text-sm leading-6 text-slate-500">Enter your details to continue to Hackathon App.</p><LoginForm configured={configured} /><p className="mt-7 text-center text-xs text-slate-400">Your space to build something new.</p></section>
    </div><footer className="mx-auto max-w-6xl text-xs text-slate-400">Hackathon App · Made for what’s next.</footer>
  </main>;
}
