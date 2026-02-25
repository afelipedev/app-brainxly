import { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import { cn } from "@/lib/utils";
import { useAuthContext } from "../context/AuthContext";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const { error: err } = await signIn(email, password);
    setIsLoading(false);
    if (err) {
      setError(err);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <AuthHeader />

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="font-semibold text-sm text-[#323A46] leading-[1.5]"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={cn(
                "w-full max-w-[420px] px-4 py-3 rounded-[6.36px]",
                "bg-[#FAFAFC] border border-[#CBD1D8]",
                "text-sm font-medium text-[#101828] placeholder:text-[#CBD1D8]",
                "focus:outline-none focus:ring-2 focus:ring-[#3568FF]/20 focus:border-[#3568FF]",
                "transition-colors"
              )}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-[#F04438]">{error}</p>
          )}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="font-semibold text-sm text-[#323A46] leading-[1.5]"
            >
              Senha
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={cn(
                "w-full max-w-[420px] px-4 py-3 rounded-[6.36px]",
                "bg-[#FAFAFC] border border-[#CBD1D8]",
                "text-sm font-medium text-[#101828] placeholder:text-[#CBD1D8]",
                "focus:outline-none focus:ring-2 focus:ring-[#3568FF]/20 focus:border-[#3568FF]",
                "transition-colors"
              )}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-3.5 w-full max-w-[420px]">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 px-2 rounded-[6.36px]",
              "bg-[#3568FF] text-white font-semibold text-base tracking-[-0.16px]",
              "hover:bg-[#2d5ae6] active:bg-[#2549cc]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "transition-colors"
            )}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-sm font-medium text-[#7E8B9E]">
            Não tem conta?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#3568FF] hover:underline focus:outline-none focus:underline"
            >
              Cadastre-se aqui!
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}
