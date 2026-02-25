import { BrainxlyLogo } from "./BrainxlyLogo";
import { cn } from "@/lib/utils";

interface AuthHeaderProps {
  className?: string;
}

export function AuthHeader({ className }: AuthHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 leading-[1.5]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <BrainxlyLogo size={48} />
        <h1 className="font-bold text-[48px] text-[#101828] tracking-tight">
          Brainxly
        </h1>
      </div>
      <p className="font-medium text-base text-[#7E8B9E] tracking-[0.16px]">
        Seu segundo cérebro em modelo de escritório inteligente
      </p>
    </div>
  );
}
