import {
  IA_HUB_CRIAR_ITEMS,
  IA_HUB_NAV_ITEMS,
  IA_HUB_RECENT_CHATS,
} from "@/features/sidebar/data/sidebar.data";
import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronsLeft, MessageCircle, Pencil } from "lucide-react";
import { useRef, useState } from "react";

const PergunteIcon = IA_HUB_CRIAR_ITEMS[0].icon;
const SuperagenteIcon = IA_HUB_CRIAR_ITEMS[1].icon;

export function IaHubSecondaryContent() {
  const { setSecondaryOpen } = useSidebar();
  const [isEditDropdownOpen, setEditDropdownOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>("chat-1");
  const editDropdownRef = useRef<HTMLDivElement>(null);

  function handleCriarItem(id: string) {
    setEditDropdownOpen(false);
    if (id === "pergunte-ia") {
      // Placeholder: abrir fluxo "Pergunte à IA" - Fase 2
    } else if (id === "superagente") {
      // Placeholder: abrir fluxo "Novo Superagente" - Fase 2
    }
  }

  function handleNavItem(_id: string) {
    setEditDropdownOpen(false);
    // Placeholder: navegação - Fase 2
  }

  function handleChatSelect(id: string) {
    setActiveChatId(id);
    // Placeholder: carregar chat - Fase 2
  }

  return (
    <>
      {/* Header: Título IA Hub + collapse (hover) + dropdown Edit */}
      <div className="relative border-b border-sidebar-border p-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">IA Hub</h2>

          <div className="group/header flex items-center gap-0.5">
            {/* Botão colapsar - visível apenas em hover */}
            <div className="flex items-center opacity-0 transition-opacity group-hover/header:opacity-100">
              <button
                type="button"
                title="Colapsar sidebar secundária"
                onClick={() => setSecondaryOpen(false)}
                className="rounded-md p-1.5 hover:bg-sidebar-accent"
              >
                <ChevronsLeft className="size-4" />
              </button>
            </div>

            {/* Dropdown Edit */}
            <div className="relative" ref={editDropdownRef}>
              <button
                type="button"
                title="Criar e opções"
                onClick={() => setEditDropdownOpen((v) => !v)}
                className="flex items-center gap-0.5 rounded-md border border-sidebar-border bg-muted/50 px-2 py-1.5 hover:bg-sidebar-accent"
              >
                <Pencil className="size-3.5" />
                <ChevronDown className="size-3" />
              </button>

              {isEditDropdownOpen ? (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    aria-hidden
                    onClick={() => setEditDropdownOpen(false)}
                  />
                  <div
                    className="absolute right-0 top-full z-20 mt-1 min-w-52 rounded-lg border border-sidebar-border bg-popover p-1 shadow-lg"
                  >
                    {/* a. Label Criar + itens clicáveis */}
                    <div className="border-b border-sidebar-border px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Criar
                    </div>
                    {IA_HUB_CRIAR_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleCriarItem(item.id)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                      >
                        <item.icon
                          className={cn(
                            "size-4 shrink-0",
                            item.id === "pergunte-ia" ? "text-violet-500" : "text-rose-500"
                          )}
                        />
                        <span className="flex-1">{item.label}</span>
                        {"badge" in item && item.badge ? (
                          <span className="rounded bg-orange-500/90 px-1.5 py-0.5 text-[10px] font-medium text-white">
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    ))}

                    {/* c. Divider */}
                    <div className="my-1 h-px bg-sidebar-border" />

                    {/* d, e, f. Navegação */}
                    {IA_HUB_NAV_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavItem(item.id)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                      >
                        <item.icon className="size-4 shrink-0 text-muted-foreground" />
                        <span>{item.label}</span>
                      </button>
                    ))}

                    {/* g. Chats recentes */}
                    <div className="my-1 h-px bg-sidebar-border" />
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Chats recentes
                    </div>
                    {IA_HUB_RECENT_CHATS.map((chat) => (
                      <button
                        key={chat.id}
                        type="button"
                        onClick={() => {
                          handleChatSelect(chat.id);
                          setEditDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                      >
                        <MessageCircle className="size-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{chat.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal da sidebar */}
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {/* Ações rápidas: Pergunte à IA e Novo Superagente */}
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
        >
          <PergunteIcon className="size-4 shrink-0 text-violet-500" />
          <span>Pergunte à IA</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
        >
          <SuperagenteIcon className="size-4 shrink-0 text-rose-500" />
          <span>Novo Superagente</span>
        </button>

        <div className="h-px bg-sidebar-border" />

        {/* Navegação: Todos os Superagentes, Meus Superagentes, Registros */}
        {IA_HUB_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavItem(item.id)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
          >
            <item.icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}

        <div className="h-px bg-sidebar-border" />

        {/* Chats recentes */}
        <div className="space-y-1">
          <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Chats recentes
          </h3>
          <ul className="space-y-0.5">
            {IA_HUB_RECENT_CHATS.map((chat) => (
              <li key={chat.id}>
                <button
                  type="button"
                  onClick={() => handleChatSelect(chat.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                    activeChatId === chat.id
                      ? "bg-sidebar-accent"
                      : "hover:bg-sidebar-accent"
                  )}
                >
                  <MessageCircle className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{chat.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
