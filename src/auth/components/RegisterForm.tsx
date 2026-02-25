import { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import { cn } from "@/lib/utils";
import { useAuthContext } from "../context/AuthContext";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setApiError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password);
    setIsLoading(false);
    if (error) {
      setApiError(error);
      return;
    }
    setSuccessMessage("Cadastro realizado! Verifique seu email para confirmar a conta (se configurado).");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <AuthHeader />

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="register-email"
              className="font-semibold text-sm text-[#323A46] leading-[1.5]"
            >
              Email
            </label>
            <input
              id="register-email"
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

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="register-password"
              className="font-semibold text-sm text-[#323A46] leading-[1.5]"
            >
              Senha
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="••••••••"
              className={cn(
                "w-full max-w-[420px] px-4 py-3 rounded-[6.36px]",
                "bg-[#FAFAFC] border border-[#CBD1D8]",
                "text-sm font-medium text-[#101828] placeholder:text-[#CBD1D8]",
                "focus:outline-none focus:ring-2 focus:ring-[#3568FF]/20 focus:border-[#3568FF]",
                "transition-colors"
              )}
              required
              minLength={6}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="register-confirm-password"
              className="font-semibold text-sm text-[#323A46] leading-[1.5]"
            >
              Confirmar senha
            </label>
            <input
              id="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="••••••••"
              className={cn(
                "w-full max-w-[420px] px-4 py-3 rounded-[6.36px]",
                "bg-[#FAFAFC] border",
                "text-sm font-medium text-[#101828] placeholder:text-[#CBD1D8]",
                passwordError
                  ? "border-[#F04438] focus:ring-[#F04438]/20 focus:border-[#F04438]"
                  : "border-[#CBD1D8] focus:ring-[#3568FF]/20 focus:border-[#3568FF]",
                "focus:outline-none focus:ring-2",
                "transition-colors"
              )}
              required
              minLength={6}
            />
            {passwordError && (
              <p className="text-sm text-[#F04438]">{passwordError}</p>
            )}
            {apiError && (
              <p className="text-sm text-[#F04438]">{apiError}</p>
            )}
            {successMessage && (
              <p className="text-sm text-[#12B76A]">{successMessage}</p>
            )}
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
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p className="text-sm font-medium text-[#7E8B9E]">
            Já tem conta?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#3568FF] hover:underline focus:outline-none focus:underline"
            >
              Faça login aqui!
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}
