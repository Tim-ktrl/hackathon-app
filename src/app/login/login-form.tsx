"use client";
import { useActionState, useState } from "react";
import { login } from "./actions";
export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(login, { error: "" });
  const [show, setShow] = useState(false);
  const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
  return <form action={action} className="mt-9 space-y-5">
    <div><label htmlFor="email" className="text-sm font-semibold">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} className={inputClass} /></div>
    <div><label htmlFor="password" className="text-sm font-semibold">Password</label><div className="relative"><input id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required className={inputClass + " pr-20"} /><button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} className="absolute right-4 top-6 text-xs font-semibold text-slate-500 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-violet-500">{show ? "Hide" : "Show"}</button></div></div>
    {state.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
    {!configured && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">Sign in will be available once this app is connected to Supabase.</p>}
    <button disabled={pending || !configured} className="w-full rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 disabled:opacity-50">{pending ? "Signing in…" : "Sign in →"}</button>
  </form>;
}
