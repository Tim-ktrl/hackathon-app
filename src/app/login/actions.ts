"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";
export type AuthState = { error: string };
export async function login(_previous: AuthState, form: FormData): Promise<AuthState> {
  if (!supabaseConfig()) return { error: "Connect your Supabase project to enable sign in." };
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  if (!email || !password) return { error: "Enter your email and password." };
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "Unable to sign in. Check your email and password, and confirm your email if needed." };
  } catch { return { error: "Unable to reach the sign-in service. Please try again." }; }
  redirect("/account");
}
export async function logout(): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Unable to sign out. Please try again.");
  redirect("/login");
}
