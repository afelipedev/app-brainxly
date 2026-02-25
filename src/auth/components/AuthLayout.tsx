import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Conteúdo à esquerda */}
      <div className="relative z-10 flex flex-col px-[72px] pt-[46px] pb-12 max-w-[520px] text-left">
        {children}
      </div>

      {/* Imagem de fundo à direita com gradiente */}
      <div
        className="absolute inset-y-0 right-0 left-[calc(50%+38px)]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-white" aria-hidden />
        <img
          src="/auth-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />
        {/* Blend horizontal (Figma): faixa 240px, 2 camadas */}        
        <div
          className="absolute left-0 top-0 h-full w-[240px] bg-gradient-to-l from-[rgba(255,255,255,0)] to-white pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute left-0 top-0 h-full w-[240px] bg-gradient-to-l from-[rgba(255,255,255,0)] to-white pointer-events-none"
          aria-hidden
        />
      </div>
    </div>
  );
}
