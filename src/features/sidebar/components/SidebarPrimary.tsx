import { BrainxlyLogo } from "@/auth/components/BrainxlyLogo";
import {
  MORE_MODULE_ITEMS,
  PRIMARY_BOTTOM_ITEMS,
  PRIMARY_CONTROL_ITEMS,
  PRIMARY_TOP_ITEMS,
  THEME_ICONS,
} from "@/features/sidebar/data/sidebar.data";
import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import { cn } from "@/lib/utils";

interface SidebarPrimaryProps {
  onLogout: () => Promise<void> | void;
  className?: string;
}

export function SidebarPrimary({ onLogout, className }: SidebarPrimaryProps) {
  const { activeModule, setActiveModule, darkMode, toggleDarkMode, openMorePanel } = useSidebar();
  const ThemeIcon = darkMode ? THEME_ICONS.dark : THEME_ICONS.light;
  const isMoreActive = MORE_MODULE_ITEMS.some((module) => module.id === activeModule);

  return (
    <aside className={cn("flex h-full w-20 shrink-0 flex-col border-r border-sidebar-border bg-sidebar", className)}>
      <div className="flex flex-1 flex-col items-center gap-2 py-3">
        <div className="mb-2">
          <BrainxlyLogo />
        </div>

        {PRIMARY_TOP_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <div key={item.id} className="flex w-full flex-col items-center gap-1">
              <button
                type="button"
                title={item.label}
                onClick={() => setActiveModule(item.id)}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg transition-colors",
                  isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
                )}
              >
                <Icon className="size-4" />
              </button>
              <span className="w-full truncate px-1 text-center text-[10px] leading-none text-muted-foreground">
                {item.label}
              </span>
            </div>
          );
        })}

        <div className="mt-1 flex w-full flex-col items-center gap-1">
          <button
            type="button"
            title="Mais"
            onClick={openMorePanel}
            className={cn(
              "flex size-9 items-center justify-center rounded-lg transition-colors",
              isMoreActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
            )}
          >
            <PRIMARY_CONTROL_ITEMS.more.icon className="size-4" />
          </button>
          <span className="w-full truncate px-1 text-center text-[10px] leading-none text-muted-foreground">
            {PRIMARY_CONTROL_ITEMS.more.label}
          </span>
        </div>

        <div className="my-1 h-px w-8 bg-sidebar-border" />

        <div className="mt-auto flex flex-col items-center gap-2">
          {PRIMARY_BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <div key={item.id} className="flex w-full flex-col items-center gap-1">
                <button
                  type="button"
                  title={item.label}
                  onClick={() => setActiveModule(item.id)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg transition-colors",
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="size-4" />
                </button>
                <span className="w-full truncate px-1 text-center text-[10px] leading-none text-muted-foreground">
                  {item.label}
                </span>
              </div>
            );
          })}

          <div className="flex w-full flex-col items-center gap-1">
            <button
              type="button"
              title="Alternar tema"
              onClick={toggleDarkMode}
              className="flex size-9 items-center justify-center rounded-lg hover:bg-sidebar-accent"
            >
              <ThemeIcon className="size-4" />
            </button>
            <span className="w-full truncate px-1 text-center text-[10px] leading-none text-muted-foreground">Tema</span>
          </div>

          <div className="flex w-full flex-col items-center gap-1">
            <button
              type="button"
              title="Logout"
              onClick={() => void onLogout()}
              className="flex size-9 items-center justify-center rounded-lg text-destructive hover:bg-sidebar-accent"
            >
              <PRIMARY_CONTROL_ITEMS.logout.icon className="size-4" />
            </button>
            <span className="w-full truncate px-1 pb-1 text-center text-[10px] leading-none text-muted-foreground">
              {PRIMARY_CONTROL_ITEMS.logout.label}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
