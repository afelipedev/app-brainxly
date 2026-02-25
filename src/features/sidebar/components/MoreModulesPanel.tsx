import { MORE_MODULE_ITEMS } from "@/features/sidebar/data/sidebar.data";
import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function MoreModulesPanel() {
  const { isMorePanelOpen, closeMorePanel, activeModule, setActiveModule } = useSidebar();

  if (!isMorePanelOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={closeMorePanel}>
      <div className="absolute inset-0 bg-black/30" />
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-sm border-l border-sidebar-border bg-sidebar p-4 shadow-xl",
          "sm:max-w-md"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Mais Modulos</h3>
          <button type="button" onClick={closeMorePanel} className="rounded-md p-1.5 hover:bg-sidebar-accent">
            <X className="size-4" />
          </button>
        </div>

        <ul className="space-y-2">
          {MORE_MODULE_ITEMS.map((moduleItem) => {
            const Icon = moduleItem.icon;
            const isActive = activeModule === moduleItem.id;

            return (
              <li key={moduleItem.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModule(moduleItem.id);
                    closeMorePanel();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{moduleItem.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
