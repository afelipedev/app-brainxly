import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { MoreModulesPanel } from "./MoreModulesPanel";
import { SidebarPrimary } from "./SidebarPrimary";
import { SidebarSecondary } from "./SidebarSecondary";

interface SidebarLayoutProps {
  onLogout: () => Promise<void> | void;
  children: React.ReactNode;
}

export function SidebarLayout({ onLogout, children }: SidebarLayoutProps) {
  const { isSecondaryOpen } = useSidebar();
  const [isPrimaryDrawerOpen, setPrimaryDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isSecondaryOpen) {
      setPrimaryDrawerOpen(true);
    }
  }, [isSecondaryOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <div className="hidden h-screen shrink-0 md:flex">
        <SidebarPrimary onLogout={onLogout} />
        <SidebarSecondary />
      </div>

      <div className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setPrimaryDrawerOpen(true)}
            className="rounded-md border border-border p-2 hover:bg-muted"
          >
            <Menu className="size-4" />
          </button>
          <span className="text-sm font-semibold">Brainxly</span>
          <span className="w-8" />
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>

      {isPrimaryDrawerOpen ? (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setPrimaryDrawerOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute left-0 top-0 h-full" onClick={(event) => event.stopPropagation()}>
            <SidebarPrimary onLogout={onLogout} className="h-full" />
          </div>
        </div>
      ) : null}

      {isSecondaryOpen ? (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute left-0 top-0 h-full max-w-[90vw]" onClick={(event) => event.stopPropagation()}>
            <SidebarSecondary />
          </div>
        </div>
      ) : null}

      <MoreModulesPanel />
    </div>
  );
}
