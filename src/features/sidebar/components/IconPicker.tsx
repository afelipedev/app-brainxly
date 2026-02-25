import { cn } from "@/lib/utils";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

/** Ícones curados para espaços - subset dos mais úteis, sem aliases duplicados */
const CURATED_ICON_NAMES = (iconNames as readonly string[]).filter((name) => {
  const skip =
    name.endsWith("-2") ||
    name.endsWith("-01") ||
    name.endsWith("-10") ||
    name.endsWith("-az") ||
    name.endsWith("-za") ||
    name === "alarm-check" ||
    name === "alarm-minus" ||
    name === "alarm-plus" ||
    name === "sort-asc" ||
    name === "sort-desc";
  return !skip;
}) as IconName[];

function iconNameToLabel(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface IconPickerProps {
  value?: string;
  onChange: (iconId: string) => void;
  triggerClassName?: string;
}

export function IconPicker({ value, onChange, triggerClassName }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    if (!search.trim()) return CURATED_ICON_NAMES;
    const q = search.toLowerCase();
    return CURATED_ICON_NAMES.filter((name) => {
      const label = iconNameToLabel(name);
      return name.toLowerCase().includes(q) || label.toLowerCase().includes(q);
    });
  }, [search]);

  function handleReset() {
    setSearch("");
    onChange("briefcase");
  }

  function handleSelect(iconId: string) {
    onChange(iconId);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-sidebar-accent",
          triggerClassName
        )}
      >
        {value ? (
          <DynamicIcon name={value as IconName} className="size-4 text-muted-foreground" />
        ) : null}
        <span className="text-muted-foreground">
          {value ? iconNameToLabel(value) : "Selecionar icone"}
        </span>
      </button>

      {isOpen ? (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute left-0 top-full z-50 mt-2 w-[320px] overflow-hidden rounded-lg border border-sidebar-border bg-popover shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Título + Reset */}
            <div className="flex items-center justify-between border-b border-sidebar-border px-3 py-2">
              <span className="text-sm font-semibold">Icone</span>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              >
                Reset
              </button>
            </div>

            {/* Search + Add */}
            <div className="flex items-center gap-2 border-b border-sidebar-border p-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={cn(
                    "w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                />
              </div>
              <button
                type="button"
                title="Adicionar"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Grid de ícones */}
            <div className="max-h-[280px] overflow-y-auto p-2">
              <div className="grid grid-cols-8 gap-1">
                {filteredIcons.map((name) => {
                  const isSelected = value === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      title={iconNameToLabel(name)}
                      onClick={() => handleSelect(name)}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-md transition-colors",
                        isSelected
                          ? "bg-sidebar-primary/20 text-sidebar-primary"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                      )}
                    >
                      <DynamicIcon name={name} className="size-4" />
                    </button>
                  );
                })}
              </div>
              {filteredIcons.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Nenhum icone encontrado.
                </p>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
