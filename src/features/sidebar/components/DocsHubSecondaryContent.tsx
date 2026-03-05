import {
  DOCS_HUB_CRIAR_ITEMS,
  DOCS_HUB_FAVORITES_MOCK,
  DOCS_HUB_RECENT_PAGES_MOCK,
} from "@/features/sidebar/data/sidebar.data";
import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronsLeft,
  FileText,
  FolderOpen,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const MEUS_DOCUMENTOS_COUNT = 4;

export function DocsHubSecondaryContent() {
  const { setSecondaryOpen } = useSidebar();
  const [isPlusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState<string | null>("todos-documentos");
  const [favorites] = useState(() =>
    DOCS_HUB_FAVORITES_MOCK.map((d) => ({ id: d.id, label: d.label }))
  );
  const [recentPages] = useState(() =>
    DOCS_HUB_RECENT_PAGES_MOCK.map((d) => ({ id: d.id, label: d.label }))
  );

  function handleCriarDocumento() {
    setPlusDropdownOpen(false);
    // TODO: Integrar com fluxo de criação de documento na Fase 2
  }

  return (
    <>
      {/* Header: Título Docs Hub + collapse (hover) + dropdown + */}
      <div className="relative border-b border-sidebar-border p-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Docs Hub</h2>

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

            {/* Dropdown + */}
            <div className="relative">
              <button
                type="button"
                title="Criar documento"
                onClick={() => setPlusDropdownOpen((v) => !v)}
                className="flex items-center gap-0.5 rounded-md border border-sidebar-border p-1.5 hover:bg-sidebar-accent"
              >
                <Plus className="size-4" />
                <ChevronDown className="size-3" />
              </button>

              {isPlusDropdownOpen ? (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    aria-hidden
                    onClick={() => setPlusDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 min-w-52 rounded-lg border border-sidebar-border bg-popover p-1 shadow-lg">
                    {DOCS_HUB_CRIAR_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={handleCriarDocumento}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                      >
                        <item.icon className="size-4 shrink-0 text-muted-foreground" />
                        <span>{item.label}</span>
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
        {/* 4. Todos os documentos */}
        <button
          type="button"
          onClick={() => setActiveNavId("todos-documentos")}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
            activeNavId === "todos-documentos"
              ? "bg-sidebar-accent"
              : "hover:bg-sidebar-accent"
          )}
        >
          <FolderOpen className="size-4 shrink-0 text-muted-foreground" />
          <span>Todos os documentos</span>
        </button>

        {/* 5. Meus documentos (com badge contador) */}
        <button
          type="button"
          onClick={() => setActiveNavId("meus-documentos")}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm",
            activeNavId === "meus-documentos"
              ? "bg-sidebar-accent"
              : "hover:bg-sidebar-accent"
          )}
        >
          <span className="flex items-center gap-2">
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
              A
            </span>
            <span>Meus documentos</span>
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {MEUS_DOCUMENTOS_COUNT}
          </span>
        </button>

        {/* 6. Arquivado */}
        <button
          type="button"
          onClick={() => setActiveNavId("arquivado")}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
            activeNavId === "arquivado"
              ? "bg-sidebar-accent"
              : "hover:bg-sidebar-accent"
          )}
        >
          <Trash2 className="size-4 shrink-0 text-muted-foreground" />
          <span>Arquivado</span>
        </button>

        {/* 7. Divider */}
        <div className="my-2 h-px bg-sidebar-border" />

        {/* 8. Favoritos */}
        <div className="space-y-1">
          <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Favoritos
          </h3>
          {favorites.length === 0 ? (
            <p className="rounded-md bg-muted/40 px-2 py-2 text-xs text-muted-foreground">
              Documentos marcados como favoritos aparecerão aqui.
            </p>
          ) : (
            <ul className="space-y-0.5">
              {favorites.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                  >
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{doc.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 9. Páginas recentes */}
        <div className="space-y-1">
          <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Páginas recentes
          </h3>
          {recentPages.length === 0 ? (
            <p className="rounded-md bg-muted/40 px-2 py-2 text-xs text-muted-foreground">
              As últimas páginas criadas aparecerão aqui.
            </p>
          ) : (
            <ul className="space-y-0.5">
              {recentPages.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                  >
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{doc.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
