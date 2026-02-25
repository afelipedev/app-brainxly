import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/features/shared/lib/supabase";

export interface AuthError {
  message: string;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { data: null, error: { message: error.message } };
  return { data, error: null };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { data: null, error: { message: error.message } };
  return { data, error: null };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) return { error: { message: error.message } };
  return { error: null };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) return { session: null, error: { message: error.message } };
  return { session: data.session, error: null };
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return { user: null, error: { message: error.message } };
  return { user: data.user, error: null };
}

export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}
