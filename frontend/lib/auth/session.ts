"use client";
import { createContext, createElement, useContext, useState } from "react";
import type { ReactNode } from "react";

export type PreviewRole = "guest" | "owner" | "seeker" | "admin";
type SessionValue = { role: PreviewRole; setRole: (role: PreviewRole) => void; user: { name: string } | null };
const SessionContext = createContext<SessionValue | null>(null);

/** TODO(P05): replace development role preview with the authenticated session. */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<PreviewRole>("guest");
  const user = role === "guest" ? null : { name: role === "owner" ? "Rina Pemilik" : role === "seeker" ? "Dimas Pengrajin" : "Admin SisaHub" };
  return createElement(SessionContext.Provider, { value: { role, setRole, user } }, children);
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession harus digunakan di dalam SessionProvider.");
  return context;
}
