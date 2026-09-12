import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";
import { logout } from "@/app/login/actions";
export const dynamic = "force-dynamic";
export default async function AccountPage() {
  if (!supabaseConfig()) redirect("/login");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) redirect("/login");
  return <main className="flex min-h-dvh items-center justify-center p-6"><section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/30"><p className="text-sm font-semibold text-violet-600">Hackathon App</p><h1 className="mt-4 text-3xl font-semibold">You’re signed in.</h1><p className="mt-4 break-all text-slate-500">{data.claims.email}</p><form action={logout}><button className="mt-8 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700">Sign out</button></form></section></main>;
}
