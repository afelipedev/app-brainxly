import {
  ESPACOS_CRIAR_ITEMS,
  TREE_NODE_ICON,
  WORKSPACE_ACTION_ICONS,
} from "@/features/sidebar/data/sidebar.data";
import { IconPicker } from "@/features/sidebar/components/IconPicker";
import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import type { SidebarTreeNode } from "@/features/sidebar/types/sidebar.types";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  ChevronsDown,
  ChevronDown,
  ChevronsLeftRight,
  Ellipsis,
  FileText,
  Folder,
  Gauge,
  ListTodo,
  Plus,
  Search,
} from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { useRef, useState } from "react";

export function EspacosSecondaryContent() {
  const {
    activeWorkspace,
    workspaceOptions,
    workspaceTree,
    expandedNodeIds,
    toggleNode,
    setSecondaryOpen,
    expandAllNodes,
    collapseAllNodes,
    addSpace,
  } = useSidebar();

  const [isPlusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [createSpaceForm, setCreateSpaceForm] = useState({
    name: "",
    description: "",
    iconId: "briefcase",
  });
  const [expandCollapseLabel, setExpandCollapseLabel] = useState<"expandir" | "fechar">("expandir");
  const plusDropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const activeWorkspaceLabel =
    workspaceOptions.find((w) => w.id === activeWorkspace)?.label ?? "Workspace";
  const activeWorkspaceNode = workspaceTree.find((w) => w.id === activeWorkspace);
  const spacesTree = activeWorkspaceNode?.children ?? [];

  function handleCriarItem(id: string) {
    setPlusDropdownOpen(false);
    if (id === "espaco") {
      setIsCreateSpaceModalOpen(true);
    }
    // Tarefa, Lista, Documento: placeholder para Fase 2
  }

  function handleOptionsItem(id: string) {
    if (id === "criar-espaco") {
      setOptionsOpen(false);
      setIsCreateSpaceModalOpen(true);
    } else if (id === "gerenciar-espaco") {
      setOptionsOpen(false);
      // placeholder para Fase 2
    } else if (id === "expandir-fechar") {
      if (expandCollapseLabel === "expandir") {
        expandAllNodes();
        setExpandCollapseLabel("fechar");
      } else {
        collapseAllNodes();
        setExpandCollapseLabel("expandir");
      }
      setOptionsOpen(false);
    }
  }

  function handleCreateSpaceSubmit() {
    if (!createSpaceForm.name.trim()) return;
    addSpace({
      name: createSpaceForm.name.trim(),
      description: createSpaceForm.description.trim() || undefined,
      iconId: createSpaceForm.iconId,
    });
    setIsCreateSpaceModalOpen(false);
    setCreateSpaceForm({ name: "", description: "", iconId: "briefcase" });
  }

  function filterTree(nodes: SidebarTreeNode[], query: string): SidebarTreeNode[] {
    if (!query.trim()) return nodes;
    const q = query.toLowerCase();
    const result: SidebarTreeNode[] = [];
    for (const node of nodes) {
      const matches = node.label.toLowerCase().includes(q);
      const filteredChildren = node.children
        ? filterTree(node.children, query)
        : undefined;
      if (matches || (filteredChildren && filteredChildren.length > 0)) {
        result.push({ ...node, children: filteredChildren });
      }
    }
    return result;
  }

  const filteredSpaces = filterTree(spacesTree, searchQuery);

  function renderTree(nodes: SidebarTreeNode[], depth = 0) {
    function avatarColorClass(label: string) {
      const palette = [
        "bg-emerald-500 text-white",
        "bg-blue-500 text-white",
        "bg-violet-500 text-white",
        "bg-rose-500 text-white",
        "bg-amber-500 text-white",
      ];
      const index = label.length % palette.length;
      return palette[index];
    }

    function nodeLeadingIcon(node: SidebarTreeNode) {
      const isNewSpaceAction =
        node.type === "space" && node.label.trim().startsWith("Novo Espaco");
      if (isNewSpaceAction) {
        return <Plus className="size-3.5 shrink-0 text-muted-foreground" />;
      }

      if (node.type === "space" && node.iconId) {
        return (
          <span
            className={cn(
              "inline-flex size-5 shrink-0 items-center justify-center rounded",
              avatarColorClass(node.label)
            )}
          >
            <DynamicIcon
              name={node.iconId as IconName}
              className="size-3 text-white"
            />
          </span>
        );
      }

      switch (node.type) {
        case "space":
          return (
            <span
              className={cn(
                "inline-flex size-5 shrink-0 items-center justify-center rounded text-[11px] font-semibold",
                avatarColorClass(node.label)
              )}
            >
              {node.label.charAt(0).toUpperCase()}
            </span>
          );
        case "project":
          return (
            <BriefcaseBusiness className="size-3.5 shrink-0 text-muted-foreground" />
          );
        case "folder":
          return <Folder className="size-3.5 shrink-0 text-muted-foreground" />;
        case "list":
          return <ListTodo className="size-3.5 shrink-0 text-muted-foreground" />;
        case "sprint":
          return <Gauge className="size-3.5 shrink-0 text-muted-foreground" />;
        case "doc":
          return <FileText className="size-3.5 shrink-0 text-muted-foreground" />;
        default:
          return (
            <TREE_NODE_ICON className="size-3 shrink-0 text-muted-foreground" />
          );
      }
    }

    function nodeHoverChevron(hasChildren: boolean) {
      if (!hasChildren)
        return (
          <ChevronsDown className="size-3.5 shrink-0 text-muted-foreground" />
        );
      return (
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
      );
    }

    return (
      <ul
        className={cn(
          "space-y-1",
          depth > 0 ? "ml-3 mt-1 border-l border-sidebar-border/80 pl-2" : ""
        )}
      >
        {nodes.map((node) => {
          const hasChildren = Boolean(node.children?.length);
          const isExpanded = expandedNodeIds.has(node.id);
          const isNewSpaceAction =
            node.type === "space" &&
            node.label.trim().startsWith("Novo Espaco");
          const showWorkspaceActions =
            !hasChildren &&
            ["project", "folder", "list", "sprint"].includes(node.type);

          return (
            <li key={node.id}>
              <div className="group flex items-center justify-between gap-2 rounded-md px-1 py-1 hover:bg-sidebar-accent/60">
                <button
                  type="button"
                  onClick={() => {
                    if (hasChildren) toggleNode(node.id);
                  }}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1 text-left text-sm"
                >
                  {isNewSpaceAction ? (
                    <span className="inline-flex size-5 shrink-0 items-center justify-center">
                      {nodeLeadingIcon(node)}
                    </span>
                  ) : (
                    <span className="group/icon relative inline-flex size-5 shrink-0 items-center justify-center">
                      <span className="transition-opacity group-hover/icon:opacity-0">
                        {nodeLeadingIcon(node)}
                      </span>
                      <span className="absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity group-hover/icon:opacity-100">
                        {nodeHoverChevron(hasChildren)}
                      </span>
                    </span>
                  )}
                  <span className="truncate">{node.label}</span>
                </button>

                {showWorkspaceActions ? (
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      title="Acoes"
                      className="rounded-md p-1 hover:bg-sidebar-accent"
                    >
                      <WORKSPACE_ACTION_ICONS.options className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Adicionar"
                      className="rounded-md p-1 hover:bg-sidebar-accent"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                ) : null}
              </div>

              {hasChildren && isExpanded
                ? renderTree(node.children ?? [], depth + 1)
                : null}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      {/* Header: Título + ícones em hover + dropdown + */}
      <div className="relative border-b border-sidebar-border p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">Espacos</h2>

            <div className="group/header flex items-center gap-0.5">
              {/* Ícones visíveis em hover */}
              <div className="flex items-center opacity-0 transition-opacity group-hover/header:opacity-100">
                <button
                  type="button"
                  title="Recolher sidebar secundaria"
                  onClick={() => setSecondaryOpen(false)}
                  className="rounded-md p-1.5 hover:bg-sidebar-accent"
                >
                  <ChevronsLeftRight className="size-4" />
                </button>
                <button
                  type="button"
                  title="Pesquisar"
                  onClick={() => setIsSearchVisible((v) => !v)}
                  className="rounded-md p-1.5 hover:bg-sidebar-accent"
                >
                  <Search className="size-4" />
                </button>
                <button
                  type="button"
                  title="Opcoes"
                  onClick={() => {
                    setOptionsOpen((v) => !v);
                    setPlusDropdownOpen(false);
                  }}
                  className="rounded-md p-1.5 hover:bg-sidebar-accent"
                >
                  <Ellipsis className="size-4" />
                </button>
              </div>

              {/* Dropdown + */}
              <button
                type="button"
                title="Criar"
                onClick={() => {
                  setPlusDropdownOpen((v) => !v);
                  setOptionsOpen(false);
                }}
                className="flex items-center gap-0.5 rounded-md p-1.5 hover:bg-sidebar-accent"
              >
                <Plus className="size-4" />
                <ChevronDown className="size-3" />
              </button>
            </div>
          </div>

          {isSearchVisible ? (
            <input
              type="search"
              placeholder="Pesquisar itens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
              autoFocus
            />
          ) : null}
        </div>

        {/* Dropdown Criar (+): Popover */}
        {isPlusDropdownOpen ? (
          <>
            <div
              className="fixed inset-0 z-10"
              aria-hidden
              onClick={() => setPlusDropdownOpen(false)}
            />
            <div
              ref={plusDropdownRef}
              className="absolute right-4 top-full z-20 mt-1 min-w-44 rounded-md border border-sidebar-border bg-popover p-1 shadow-lg"
            >
              <div className="border-b border-sidebar-border px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                Criar
              </div>
              {ESPACOS_CRIAR_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCriarItem(item.id)}
                  className="flex w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {/* Dropdown Opções (reticências): Popover */}
        {isOptionsOpen ? (
          <>
            <div
              className="fixed inset-0 z-10"
              aria-hidden
              onClick={() => setOptionsOpen(false)}
            />
            <div
              ref={optionsRef}
              className="absolute right-4 top-full z-20 mt-1 min-w-52 rounded-md border border-sidebar-border bg-popover p-1 shadow-lg"
            >
              <button
                type="button"
                onClick={() => handleOptionsItem("criar-espaco")}
                className="flex w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
              >
                Criar espaco
              </button>
              <button
                type="button"
                onClick={() => handleOptionsItem("gerenciar-espaco")}
                className="flex w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
              >
                Gerenciar espaco
              </button>
              <button
                type="button"
                onClick={() => handleOptionsItem("expandir-fechar")}
                className="flex w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
              >
                {expandCollapseLabel === "expandir"
                  ? "Expandir todos os itens"
                  : "Fechar todos os itens"}
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-3">
        <div className="space-y-4">
        {/* Todas as Tarefas */}
        <div className="space-y-1">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
          >
            <TREE_NODE_ICON className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">
              Todas as tarefas - {activeWorkspaceLabel}
            </span>
          </button>
        </div>

        <div className="h-px bg-sidebar-border" />

        {/* Espaços ativos e árvore */}
        <div className="space-y-2">
          {filteredSpaces.length === 0 ? (
            <p className="rounded-md bg-muted/40 px-2 py-2 text-xs text-muted-foreground">
              Nenhum espaco encontrado.
            </p>
          ) : (
            renderTree(filteredSpaces)
          )}
        </div>
        </div>
      </div>

      {/* Modal Criar novo espaço */}
      {isCreateSpaceModalOpen ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-4"
          onClick={() => setIsCreateSpaceModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-sidebar-border bg-popover p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="mb-4 text-base font-semibold">Criar novo espaco</h4>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="space-name"
                  className="mb-1 block text-sm font-medium text-muted-foreground"
                >
                  Nome do Espaco
                </label>
                <input
                  id="space-name"
                  type="text"
                  value={createSpaceForm.name}
                  onChange={(e) =>
                    setCreateSpaceForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Ex: Desenvolvimento"
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="space-description"
                  className="mb-1 block text-sm font-medium text-muted-foreground"
                >
                  Descricao
                </label>
                <input
                  id="space-description"
                  type="text"
                  value={createSpaceForm.description}
                  onChange={(e) =>
                    setCreateSpaceForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descricao opcional"
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Icone
                </label>
                <IconPicker
                  value={createSpaceForm.iconId}
                  onChange={(iconId) =>
                    setCreateSpaceForm((prev) => ({ ...prev, iconId }))
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateSpaceModalOpen(false)}
                className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-sidebar-accent"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateSpaceSubmit}
                disabled={!createSpaceForm.name.trim()}
                className="rounded-md bg-sidebar-primary px-3 py-1.5 text-sm text-sidebar-primary-foreground disabled:opacity-50"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

