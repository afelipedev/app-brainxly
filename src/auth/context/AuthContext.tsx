import { createContext, useContext, type ReactNode } from "react";
import type { UseAuthReturn } from "../hooks/useAuth";

const AuthContext = createContext<UseAuthReturn | null>(null);

export function AuthProvider({
  value,
  children,
}: {
  value: UseAuthReturn;
  children: ReactNode;
}) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): UseAuthReturn {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
