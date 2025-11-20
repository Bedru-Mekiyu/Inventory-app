// lib/auth.ts (or wherever you keep it)
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";   // ← correct import!

export async function getCurrentUser() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/sign-in");   // this now works inside utility functions too
  }

  return user;
}