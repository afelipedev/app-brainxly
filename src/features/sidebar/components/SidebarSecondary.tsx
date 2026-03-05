import {
  HOME_SECTION_LINKS,
  MY_TASKS_TREE,
  SECONDARY_PLUS_DROPDOWN_ITEMS,
  TREE_NODE_ICON,
  WORKSPACE_ACTION_ICONS,
} from "@/features/sidebar/data/sidebar.data";
import { DocsHubSecondaryContent } from "@/features/sidebar/components/DocsHubSecondaryContent";
import { EquipesSecondaryContent } from "@/features/sidebar/components/EquipesSecondaryContent";
import { EspacosSecondaryContent } from "@/features/sidebar/components/EspacosSecondaryContent";
import { IaHubSecondaryContent } from "@/features/sidebar/components/IaHubSecondaryContent";
import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import { SidebarModule, type SidebarTreeNode } from "@/features/sidebar/types/sidebar.types";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Bug,
  BriefcaseBusiness,
  Circle,
  ChevronsDown,
  ChevronDown,
  ChevronLeft,
  Filter,
  Folder,
  Gauge,
  Link2,
  ListTodo,
  Plus,
  Search,
  Settings,
  Star,
  Users2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function moduleTitle(module: SidebarModule): string {
  switch (module) {
    case SidebarModule.HOME:
      return "Home";
    case SidebarModule.ESPACOS:
      return "Espacos";
    case SidebarModule.IA_HUB:
      return "IA Hub";
    case SidebarModule.PLANEJADOR:
      return "Planejador";
    case SidebarModule.EQUIPES:
      return "Equipes";
    case SidebarModule.DOCS_HUB:
      return "Docs Hub";
    case SidebarModule.WHITEBOARD:
      return "Whiteboard";
    case SidebarModule.CONFIGURACOES:
      return "Configuracoes";
    case SidebarModule.CENTRAL_FINANCEIRA:
      return "Central Financeira";
    case SidebarModule.ESTUDOS:
      return "Estudos";
    case SidebarModule.METAS:
      return "Metas";
    case SidebarModule.HABITOS:
      return "Habitos";
    case SidebarModule.CONTRATOS:
      return "Contratos";
    case SidebarModule.CLIENTES:
      return "Clientes";
    case SidebarModule.USUARIOS:
      return "Usuarios";
    default:
      return "Modulo";
  }
}

type PlannerTaskStatus = "open" | "pending" | "accepted" | "in-progress" | "in-review" | "rejected" | "blocked" | "closed";
type PlannerTaskType = "epic" | "task" | "bug";
type PlannerStatusGroup = "nao-iniciado" | "ativo" | "fechado";
type PlannerMenuTab = "status" | "tipo";

interface PlannerTask {
  id: string;
  title: string;
  status: PlannerTaskStatus;
  type: PlannerTaskType;
  assignedToMe: boolean;
  dueAt: string;
}

interface PlannerPriority {
  id: string;
  title: string;
}

interface PlannerParticipant {
  id: string;
  name: string;
}

const PLANNER_PLUS_MENU_ITEMS = [
  { id: "label-criar", label: "Criar", type: "label" as const },
  { id: "evento", label: "Evento", type: "action" as const },
  { id: "tempo-foco", label: "Tempo de Foco", type: "action" as const },
  { id: "de-folga", label: "De Folga", type: "action" as const },
  { id: "divider", label: "", type: "divider" as const },
  { id: "tarefa", label: "Tarefa", type: "action" as const },
];

const PLANNER_STATUS_OPTIONS: {
  id: PlannerTaskStatus;
  label: string;
  group: PlannerStatusGroup;
  circleClass: string;
}[] = [
  { id: "open", label: "OPEN", group: "nao-iniciado", circleClass: "border border-muted-foreground/70 bg-transparent" },
  { id: "pending", label: "PENDING", group: "ativo", circleClass: "bg-yellow-500" },
  { id: "in-progress", label: "EM PROGRESSO", group: "ativo", circleClass: "bg-blue-500" },
  { id: "in-review", label: "IN REVIEW", group: "ativo", circleClass: "bg-orange-500" },
  { id: "accepted", label: "ACCEPTED", group: "ativo", circleClass: "bg-violet-500" },
  { id: "rejected", label: "REJECTED", group: "ativo", circleClass: "bg-amber-700" },
  { id: "blocked", label: "BLOCKED", group: "ativo", circleClass: "bg-red-500" },
  { id: "closed", label: "CLOSED", group: "fechado", circleClass: "bg-emerald-500" },
];

const PLANNER_TASK_TYPES: { id: PlannerTaskType; label: string; icon: typeof BadgeCheck }[] = [
  { id: "epic", label: "Epico", icon: BadgeCheck },
  { id: "task", label: "Tarefa (padrao)", icon: Circle },
  { id: "bug", label: "Bug", icon: Bug },
];

const PLANNER_CLIENTS: PlannerParticipant[] = [
  { id: "client-1", name: "Ana Silva" },
  { id: "client-2", name: "Bruno Costa" },
  { id: "client-3", name: "Carla Mendes" },
  { id: "client-4", name: "Diego Rocha" },
];

const PLANNER_INITIAL_TASKS: PlannerTask[] = [
  { id: "task-1", title: "Mapeamento Inicial", status: "open", type: "epic", assignedToMe: true, dueAt: "2026-02-27T10:00:00.000Z" },
  { id: "task-2", title: "Planejamento", status: "pending", type: "task", assignedToMe: true, dueAt: "2026-02-25T15:00:00.000Z" },
  { id: "task-3", title: "Validar Fluxo Comercial", status: "pending", type: "bug", assignedToMe: true, dueAt: "2026-02-24T18:00:00.000Z" },
  { id: "task-4", title: "Refinar proposta visual", status: "accepted", type: "task", assignedToMe: true, dueAt: "2026-02-25T21:00:00.000Z" },
];

const PLANNER_INITIAL_PRIORITIES: PlannerPriority[] = [{ id: "priority-1", title: "teste-prioridade-planner" }];
const PLANNER_REFERENCE_NOW = "2026-02-25T12:00:00.000Z";

function statusMeta(status: PlannerTaskStatus) {
  return PLANNER_STATUS_OPTIONS.find((option) => option.id === status) ?? PLANNER_STATUS_OPTIONS[0];
}

export function SidebarSecondary() {
  const {
    activeModule,
    isSecondaryOpen,
    setSecondaryOpen,
    workspaceOptions,
    activeWorkspace,
    setActiveWorkspace,
    notificationsCount,
    favoritesList,
    workspaceTree,
    expandedNodeIds,
    toggleNode,
  } = useSidebar();
  const [isPlusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const [contextModal, setContextModal] = useState<string | null>(null);
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>(PLANNER_INITIAL_TASKS);
  const [plannerPriorities, setPlannerPriorities] = useState<PlannerPriority[]>(PLANNER_INITIAL_PRIORITIES);
  const [draggedPriorityId, setDraggedPriorityId] = useState<string | null>(null);
  const [priorityName, setPriorityName] = useState("");
  const [participantQuery, setParticipantQuery] = useState("");
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<string[]>([]);
  const [pendingSearch, setPendingSearch] = useState("");
  const [taskMenuTab, setTaskMenuTab] = useState<PlannerMenuTab>("status");
  const [typeSearch, setTypeSearch] = useState("");
  const [activeTaskMenuId, setActiveTaskMenuId] = useState<string | null>(null);
  const [currentTimestamp, setCurrentTimestamp] = useState(() => Date.parse(PLANNER_REFERENCE_NOW));

  useEffect(() => {
    setCurrentTimestamp(Date.now());
    const intervalId = window.setInterval(() => setCurrentTimestamp(Date.now()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (!isSecondaryOpen) return null;

  function openContextModal(itemLabel: string) {
    setPlusDropdownOpen(false);
    setContextModal(itemLabel);
  }

  function addPriority() {
    const formattedName = priorityName.trim();
    if (!formattedName) return;
    setPlannerPriorities((current) => [...current, { id: `priority-${Date.now()}`, title: formattedName }]);
    setPriorityName("");
  }

  function onDropPriority(targetId: string) {
    if (!draggedPriorityId || draggedPriorityId === targetId) return;
    setPlannerPriorities((current) => {
      const next = [...current];
      const draggedIndex = next.findIndex((item) => item.id === draggedPriorityId);
      const targetIndex = next.findIndex((item) => item.id === targetId);
      if (draggedIndex < 0 || targetIndex < 0) return current;
      const [draggedItem] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, draggedItem);
      return next;
    });
    setDraggedPriorityId(null);
  }

  function updateTask(taskId: string, changes: Partial<PlannerTask>) {
    setPlannerTasks((current) => current.map((task) => (task.id === taskId ? { ...task, ...changes } : task)));
  }

  function participantsCounterLabel(totalParticipants: number) {
    return `${totalParticipants} ${totalParticipants === 1 ? "Participante" : "Participantes"}`;
  }

  function participantById(participantId: string) {
    return PLANNER_CLIENTS.find((participant) => participant.id === participantId);
  }

  function avatarColorClass(label: string) {
    const palette = ["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500"];
    return palette[label.length % palette.length];
  }

  function isToday(date: Date) {
    const today = new Date(currentTimestamp);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  const selectedParticipants = selectedParticipantIds.map(participantById).filter(Boolean) as PlannerParticipant[];
  const clientSearchResults = PLANNER_CLIENTS.filter((client) => {
    if (selectedParticipantIds.includes(client.id)) return false;
    if (!participantQuery.trim()) return false;
    return client.name.toLowerCase().includes(participantQuery.toLowerCase());
  });
  const assignedToMeTasks = plannerTasks.filter((task) => task.assignedToMe);
  const todayAndOverdueTasks = plannerTasks.filter((task) => {
    const dueDate = new Date(task.dueAt);
    return isToday(dueDate) || dueDate.getTime() < currentTimestamp;
  });
  const pendingTasks = plannerTasks.filter(
    (task) => task.status === "pending" && task.title.toLowerCase().includes(pendingSearch.toLowerCase())
  );
  const filteredTaskTypes = PLANNER_TASK_TYPES.filter((taskType) =>
    taskType.label.toLowerCase().includes(typeSearch.toLowerCase())
  );

  function renderTaskLine(task: PlannerTask, options?: { showStatusPicker?: boolean }) {
    const isTaskMenuOpen = activeTaskMenuId === task.id;
    const currentStatus = statusMeta(task.status);
    const currentType = PLANNER_TASK_TYPES.find((type) => type.id === task.type);

    return (
      <li key={task.id} className="relative">
        <div className="group/item flex items-center gap-2 rounded-md px-1 py-1 hover:bg-sidebar-accent/60">
          {options?.showStatusPicker ? (
            <button
              type="button"
              onClick={() =>
                setActiveTaskMenuId((current) => {
                  const next = current === task.id ? null : task.id;
                  if (next) {
                    setTaskMenuTab("status");
                  }
                  return next;
                })
              }
              className="inline-flex size-5 shrink-0 items-center justify-center rounded-full hover:bg-sidebar-accent"
              title="Editar status e tipo da tarefa"
            >
              <span className={cn("inline-flex size-3 rounded-full", currentStatus.circleClass)} />
            </button>
          ) : (
            <span className="inline-flex size-5 shrink-0 items-center justify-center">
              <span className={cn("inline-flex size-3 rounded-full", currentStatus.circleClass)} />
            </span>
          )}

          <button
            type="button"
            onClick={() => openContextModal(task.title)}
            className="min-w-0 flex-1 truncate text-left text-sm text-sidebar-foreground/90"
          >
            {task.title}
          </button>
        </div>

        {options?.showStatusPicker && isTaskMenuOpen
          ? createPortal(
              <div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 p-4"
                onClick={() => setActiveTaskMenuId(null)}
              >
                <div
                  className="w-[292px] max-h-[80vh] overflow-y-auto rounded-2xl border border-sidebar-border bg-popover p-2 shadow-xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="grid grid-cols-2 rounded-xl bg-muted/60 p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setTaskMenuTab("status")}
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-center",
                        taskMenuTab === "status" ? "bg-background font-medium text-sidebar-foreground" : "text-muted-foreground"
                      )}
                    >
                      Status
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaskMenuTab("tipo")}
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-center",
                        taskMenuTab === "tipo" ? "bg-background font-medium text-sidebar-foreground" : "text-muted-foreground"
                      )}
                    >
                      Tipo de tarefa
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-2 py-1.5">
                    <Search className="size-4 text-muted-foreground" />
                    <input
                      value={taskMenuTab === "tipo" ? typeSearch : ""}
                      onChange={(event) => setTypeSearch(event.target.value)}
                      placeholder="Pesquisar..."
                      className="w-full border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  {taskMenuTab === "status" ? (
                    <div className="mt-3 space-y-3">
                      {(["nao-iniciado", "ativo", "fechado"] as PlannerStatusGroup[]).map((group) => {
                        const groupLabel =
                          group === "nao-iniciado" ? "Não iniciado" : group === "ativo" ? "Ativo" : "Fechado";
                        const groupedOptions = PLANNER_STATUS_OPTIONS.filter((status) => status.group === group);
                        if (groupedOptions.length === 0) return null;

                        return (
                          <div key={group}>
                            <p className="px-1 pb-1 text-xs text-muted-foreground">{groupLabel}</p>
                            <div className="space-y-0.5">
                              {groupedOptions.map((status) => (
                                <button
                                  key={status.id}
                                  type="button"
                                  onClick={() => {
                                    updateTask(task.id, { status: status.id });
                                    setActiveTaskMenuId(null);
                                  }}
                                  className={cn(
                                    "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm",
                                    task.status === status.id ? "bg-sidebar-accent font-medium" : "hover:bg-sidebar-accent/60"
                                  )}
                                >
                                  <span className="flex items-center gap-2">
                                    <span className={cn("inline-flex size-3 rounded-full", status.circleClass)} />
                                    {status.label}
                                  </span>
                                  {task.status === status.id ? "✓" : null}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between px-1">
                        <span className="text-xs text-muted-foreground">
                          Tipos de tarefa
                        </span>
                        <button
                          type="button"
                          title="Configurar tipos de tarefa"
                          className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent"
                          onClick={() => openContextModal("Configurar tipos de tarefa")}
                        >
                          <Settings className="size-3.5" />
                        </button>
                      </div>
                      <div className="space-y-0.5">
                        {filteredTaskTypes.map((taskType) => (
                          <button
                            key={taskType.id}
                            type="button"
                            onClick={() => {
                              updateTask(task.id, { type: taskType.id });
                              setActiveTaskMenuId(null);
                            }}
                            className={cn(
                              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm",
                              task.type === taskType.id ? "bg-sidebar-accent font-medium" : "hover:bg-sidebar-accent/60"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <taskType.icon className="size-3.5 text-muted-foreground" />
                              {taskType.label}
                            </span>
                            {task.type === taskType.id ? "✓" : null}
                          </button>
                        ))}
                        {filteredTaskTypes.length === 0 ? (
                          <p className="px-2 py-2 text-xs text-muted-foreground">Nenhum tipo encontrado.</p>
                        ) : null}
                      </div>
                      {currentType ? (
                        <p className="px-1 pt-2 text-xs text-muted-foreground">Tipo atual: {currentType.label}</p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>,
              document.body
            )
          : null}
      </li>
    );
  }

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
      const isNewSpaceAction = node.type === "space" && node.label.trim().startsWith("Novo Espaco");
      if (isNewSpaceAction) {
        return <Plus className="size-3.5 shrink-0 text-muted-foreground" />;
      }

      switch (node.type) {
        case "space":
          return (
            <span
              className={cn(
                "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                avatarColorClass(node.label)
              )}
            >
              {node.label.charAt(0).toUpperCase()}
            </span>
          );
        case "project":
          return <BriefcaseBusiness className="size-3.5 shrink-0 text-muted-foreground" />;
        case "folder":
          return <Folder className="size-3.5 shrink-0 text-muted-foreground" />;
        case "list":
          return <ListTodo className="size-3.5 shrink-0 text-muted-foreground" />;
        case "sprint":
          return <Gauge className="size-3.5 shrink-0 text-muted-foreground" />;
        default:
          return <TREE_NODE_ICON className="size-3 shrink-0 text-muted-foreground" />;
      }
    }

    function nodeHoverChevron(hasChildren: boolean) {
      if (!hasChildren) return <ChevronsDown className="size-3.5 shrink-0 text-muted-foreground" />;
      return <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />;
    }

    return (
      <ul className={cn("space-y-1", depth > 0 ? "ml-3 mt-1 border-l border-sidebar-border/80 pl-2" : "")}>
        {nodes.map((node) => {
          const hasChildren = Boolean(node.children?.length);
          const isExpanded = expandedNodeIds.has(node.id);
          const isNewSpaceAction = node.type === "space" && node.label.trim().startsWith("Novo Espaco");
          const showWorkspaceActions =
            !hasChildren && ["project", "folder", "list", "sprint"].includes(node.type);

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
                    <span className="inline-flex size-5 shrink-0 items-center justify-center">{nodeLeadingIcon(node)}</span>
                  ) : (
                    <span className="group/icon relative inline-flex size-5 shrink-0 items-center justify-center">
                      <span className="transition-opacity group-hover/icon:opacity-0">{nodeLeadingIcon(node)}</span>
                      <span className="absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity group-hover/icon:opacity-100">
                        {nodeHoverChevron(hasChildren)}
                      </span>
                    </span>
                  )}
                  <span className="truncate">{node.label}</span>
                </button>

                {showWorkspaceActions ? (
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button type="button" title="Acoes" className="rounded-md p-1 hover:bg-sidebar-accent">
                      <WORKSPACE_ACTION_ICONS.options className="size-3.5" />
                    </button>
                    <button type="button" title="Adicionar" className="rounded-md p-1 hover:bg-sidebar-accent">
                      <Plus className="size-3.5" />
                    </button>
                    <button type="button" title="Favoritar" className="rounded-md p-1 hover:bg-sidebar-accent">
                      <Star className="size-3.5" />
                    </button>
                  </div>
                ) : null}
              </div>

              {hasChildren && isExpanded ? renderTree(node.children ?? [], depth + 1) : null}
            </li>
          );
        })}
      </ul>
    );
  }

  function renderPlanejadorSecondary() {
    return (
      <div className="space-y-5">
        <section className="space-y-2">
          <h4 className="px-1 text-sm text-sidebar-foreground/80">Prioridades</h4>
          {plannerPriorities.length === 0 ? (
            <div className="rounded-xl border border-sidebar-border bg-background/40 px-4 py-5 text-center text-xs text-muted-foreground">
              Priorize uma tarefa para vê-la aqui
            </div>
          ) : (
            <ul className="space-y-1">
              {plannerPriorities.map((priority, index) => (
                <li
                  key={priority.id}
                  draggable
                  onDragStart={() => setDraggedPriorityId(priority.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => onDropPriority(priority.id)}
                  className="group flex cursor-grab items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent/60"
                >
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                  <button type="button" onClick={() => openContextModal(priority.title)} className="truncate text-left">
                    {priority.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center gap-2 rounded-xl border border-sidebar-border px-2 py-1.5">
            <Plus className="size-4 text-muted-foreground" />
            <input
              value={priorityName}
              onChange={(event) => setPriorityName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addPriority();
              }}
              placeholder="Adicionar prioridade"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </section>

        <section className="space-y-2">
          <h4 className="px-1 text-sm text-sidebar-foreground/80">Reunião com</h4>
          <div className="relative">
            <div className="flex items-center gap-2 rounded-xl border border-sidebar-border px-2 py-1.5">
              <Users2 className="size-4 text-muted-foreground" />
              <input
                value={participantQuery}
                onChange={(event) => setParticipantQuery(event.target.value)}
                placeholder="Pesquisar pessoas..."
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {clientSearchResults.length > 0 ? (
              <div className="absolute left-0 right-0 top-11 z-20 rounded-xl border border-sidebar-border bg-popover p-1 shadow-lg">
                {clientSearchResults.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => {
                      setSelectedParticipantIds((current) => [...current, client.id]);
                      setParticipantQuery("");
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                  >
                    <span className={cn("inline-flex size-5 items-center justify-center rounded-full text-[11px] text-white", avatarColorClass(client.name))}>
                      {client.name.charAt(0).toUpperCase()}
                    </span>
                    {client.name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {selectedParticipants.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="text-muted-foreground">{participantsCounterLabel(selectedParticipants.length)}</span>
                <button
                  type="button"
                  onClick={() => setSelectedParticipantIds([])}
                  className="text-muted-foreground underline-offset-4 hover:underline"
                >
                  Apagar tudo
                </button>
              </div>
              <ul className="space-y-1">
                {selectedParticipants.map((participant) => (
                  <li key={participant.id} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent/60">
                    <span className={cn("inline-flex size-5 items-center justify-center rounded-full text-[11px] text-white", avatarColorClass(participant.name))}>
                      {participant.name.charAt(0).toUpperCase()}
                    </span>
                    <button type="button" onClick={() => openContextModal(participant.name)} className="truncate text-sm">
                      {participant.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="space-y-2">
          <h4 className="px-1 text-sm text-sidebar-foreground/80">Atribuídas a mim</h4>
          {assignedToMeTasks.length > 0 ? (
            <ul className="space-y-1">{assignedToMeTasks.map((task) => renderTaskLine(task))}</ul>
          ) : (
            <div className="rounded-xl border border-sidebar-border px-4 py-5 text-center text-xs text-muted-foreground">
              As tarefas atribuídas a você aparecerão aqui
            </div>
          )}
        </section>

        <section className="space-y-2">
          <h4 className="px-1 text-sm text-sidebar-foreground/80">Hoje e atrasadas</h4>
          {todayAndOverdueTasks.length > 0 ? (
            <ul className="space-y-1">{todayAndOverdueTasks.map((task) => renderTaskLine(task))}</ul>
          ) : (
            <div className="rounded-xl border border-sidebar-border px-4 py-5 text-center text-xs text-muted-foreground">
              As tarefas atrasadas aparecerão aqui
            </div>
          )}
        </section>

        <section className="space-y-2">
          <h4 className="px-1 text-sm text-sidebar-foreground/80">Lista de pendências</h4>

          <div className="flex items-center gap-2">
            <button type="button" title="Relacionar lista" className="rounded-full border border-sidebar-border p-1.5 hover:bg-sidebar-accent">
              <Link2 className="size-3.5 text-muted-foreground" />
            </button>
            <button type="button" title="Filtrar" className="rounded-full border border-sidebar-border p-1.5 hover:bg-sidebar-accent">
              <Filter className="size-3.5 text-muted-foreground" />
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-sidebar-border px-2 py-1">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={pendingSearch}
                onChange={(event) => setPendingSearch(event.target.value)}
                placeholder="Pesquisar..."
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {pendingTasks.length > 0 ? (
            <ul className="space-y-1">{pendingTasks.map((task) => renderTaskLine(task, { showStatusPicker: true }))}</ul>
          ) : (
            <p className="rounded-xl border border-sidebar-border px-4 py-3 text-xs text-muted-foreground">
              Nenhuma tarefa pendente para esta busca.
            </p>
          )}
        </section>
      </div>
    );
  }

  function renderHomeSecondary() {
    return (
      <>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acesso rapido</h3>
          <ul className="space-y-1">
            {HOME_SECTION_LINKS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="size-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </span>
                  {item.id === "inbox" ? (
                    <span className="rounded-full bg-sidebar-primary px-2 py-0.5 text-xs text-sidebar-primary-foreground">
                      {notificationsCount}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Minhas tarefas</h3>
          {renderTree(MY_TASKS_TREE)}
        </div>

        <div className="h-px bg-sidebar-border" />

        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Favoritos</h3>
          {favoritesList.length === 0 ? (
            <p className="rounded-md bg-muted/40 px-2 py-2 text-xs text-muted-foreground">
              Clique no icone <Star className="mx-1 inline size-3.5 text-yellow-500" /> para adicionar favoritos.
            </p>
          ) : (
            <ul className="space-y-1">
              {favoritesList.map((favorite) => (
                <li key={favorite} className="rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent">
                  {favorite}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Espacos</h3>
            <button type="button" title="Novo espaco" className="rounded-md p-1 hover:bg-sidebar-accent">
              <Plus className="size-4" />
            </button>
          </div>

          {(() => {
            const selectedWorkspace = workspaceTree.find((workspace) => workspace.id === activeWorkspace);
            if (!selectedWorkspace) {
              return (
                <p className="rounded-md bg-muted/40 px-2 py-2 text-xs text-muted-foreground">
                  Nenhum workspace selecionado.
                </p>
              );
            }

            return selectedWorkspace.children?.length ? (
              renderTree(selectedWorkspace.children)
            ) : (
              <p className="rounded-md bg-muted/40 px-2 py-2 text-xs text-muted-foreground">
                Este workspace ainda nao possui espacos cadastrados.
              </p>
            );
          })()}
        </div>
      </>
    );
  }

  return (
    <>
      <aside className="flex h-full w-[320px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        {activeModule === SidebarModule.ESPACOS ? (
          <EspacosSecondaryContent />
        ) : activeModule === SidebarModule.IA_HUB ? (
          <IaHubSecondaryContent />
        ) : activeModule === SidebarModule.EQUIPES ? (
          <EquipesSecondaryContent />
        ) : activeModule === SidebarModule.DOCS_HUB ? (
          <DocsHubSecondaryContent />
        ) : (
          <>
            <div className="border-b border-sidebar-border p-3">
              <div className="group/header flex items-center justify-between gap-2">
                <span className="text-2xl font-semibold tracking-[-0.02em]">{moduleTitle(activeModule)}</span>

                <div className="relative flex items-center gap-1">
                  <button
                    type="button"
                    title="Colapsar sidebar secundaria"
                    onClick={() => setSecondaryOpen(false)}
                    className="rounded-md p-1.5 opacity-0 transition-opacity hover:bg-sidebar-accent group-hover/header:opacity-100"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    title="Acoes rapidas"
                    onClick={() => setPlusDropdownOpen((current) => !current)}
                    className="rounded-md border border-sidebar-border p-1.5 hover:bg-sidebar-accent"
                  >
                    <Plus className="size-4" />
                  </button>

                  {isPlusDropdownOpen ? (
                    <div className="absolute right-0 top-10 z-20 min-w-48 rounded-xl border border-sidebar-border bg-popover p-1.5 shadow-lg">
                      {(activeModule === SidebarModule.PLANEJADOR
                        ? PLANNER_PLUS_MENU_ITEMS
                        : SECONDARY_PLUS_DROPDOWN_ITEMS.map((item) => ({
                            id: item.id,
                            label: item.label,
                            type: "action" as const,
                          }))
                      ).map((item) => {
                        if (item.type === "divider") {
                          return <div key={item.id} className="my-1 h-px bg-sidebar-border" />;
                        }
                        if (item.type === "label") {
                          return (
                            <span key={item.id} className="block px-2 py-1 text-xs text-muted-foreground">
                              {item.label}
                            </span>
                          );
                        }
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => openContextModal(item.label)}
                            className="flex w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>

              {activeModule !== SidebarModule.PLANEJADOR ? (
                <div className="mt-3">
                <select
                  value={activeWorkspace}
                  onChange={(event) => setActiveWorkspace(event.target.value)}
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  {workspaceOptions.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.label}
                    </option>
                  ))}
                </select>
                </div>
              ) : null}
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-3">
              {activeModule === SidebarModule.PLANEJADOR ? (
                renderPlanejadorSecondary()
              ) : activeModule === SidebarModule.HOME ? (
                renderHomeSecondary()
              ) : (
                <div className="rounded-md border border-dashed border-sidebar-border p-4 text-sm text-muted-foreground">
                  Conteudo contextual de <strong>{moduleTitle(activeModule)}</strong> preparado para a Fase 2.
                </div>
              )}
            </div>
          </>
        )}
      </aside>

      {contextModal ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-4" onClick={() => setContextModal(null)}>
          <div
            className="w-full max-w-md rounded-lg border border-sidebar-border bg-popover p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <h4 className="mb-2 text-base font-semibold">{contextModal}</h4>
            <p className="text-sm text-muted-foreground">Modal contextual preparado para implementacao completa na Fase 2.</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setContextModal(null)}
                className="rounded-md bg-sidebar-primary px-3 py-1.5 text-sm text-sidebar-primary-foreground"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
