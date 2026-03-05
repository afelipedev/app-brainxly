import {
  BriefcaseBusiness,
  BrainCircuit,
  Building2,
  CalendarDays,
  CircleDot,
  Ellipsis,
  FileText,
  FileType2,
  Folder,
  Glasses,
  Goal,
  Home,
  Inbox,
  Layers3,
  LogOut,
  MoonStar,
  PenSquare,
  Settings,
  Sparkles,
  Sun,
  CheckSquare,
  Clock,
  Users,
  UserRound,
  Wallet,
} from "lucide-react";
import { SidebarModule, type SidebarNavItem, type SidebarTreeNode, type WorkspaceOption } from "../types/sidebar.types";

export const PRIMARY_TOP_ITEMS: SidebarNavItem[] = [
  { id: SidebarModule.HOME, label: "Home", icon: Home },
  { id: SidebarModule.ESPACOS, label: "Espacos", icon: Building2 },
  { id: SidebarModule.IA_HUB, label: "IA Hub", icon: Sparkles },
  { id: SidebarModule.PLANEJADOR, label: "Planejador", icon: CalendarDays },
  { id: SidebarModule.EQUIPES, label: "Equipes", icon: Users },
  { id: SidebarModule.DOCS_HUB, label: "Docs Hub", icon: FileText },
  { id: SidebarModule.WHITEBOARD, label: "Whiteboard", icon: PenSquare },
];

export const PRIMARY_BOTTOM_ITEMS: SidebarNavItem[] = [
  { id: SidebarModule.CONFIGURACOES, label: "Configuracoes", icon: Settings },
];

export const PRIMARY_CONTROL_ITEMS = {
  more: { id: "more", label: "Mais", icon: Ellipsis },
  darkMode: { id: "dark-mode", label: "Dark/Light", icon: MoonStar },
  logout: { id: "logout", label: "Logout", icon: LogOut },
} as const;

export const MORE_MODULE_ITEMS: SidebarNavItem[] = [
  { id: SidebarModule.CENTRAL_FINANCEIRA, label: "Central Financeira", icon: Wallet },
  { id: SidebarModule.CONTRATOS, label: "Contratos", icon: BriefcaseBusiness },
  { id: SidebarModule.CLIENTES, label: "Clientes", icon: Building2 },
  { id: SidebarModule.USUARIOS, label: "Usuarios", icon: UserRound },
  { id: SidebarModule.ESTUDOS, label: "Estudos", icon: FileType2 },
  { id: SidebarModule.METAS, label: "Metas", icon: Goal },
  { id: SidebarModule.HABITOS, label: "Habitos", icon: BrainCircuit },
];

export const HOME_SECTION_LINKS = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "ia-hub", label: "IA Hub", icon: Sparkles },
  { id: "all-workspaces", label: "Todos os Workspaces", icon: CircleDot },
  { id: "all-tasks", label: "Todas as tarefas", icon: CheckSquare },
] as const;

export const MY_TASKS_TREE: SidebarTreeNode[] = [
  { id: "task-assigned-me", label: "Atribuidas a mim", type: "task" },
  { id: "task-today", label: "Hoje", type: "task" },
  { id: "task-overdue", label: "Atrasadas", type: "task" },
];

export const DEFAULT_WORKSPACE_OPTIONS: WorkspaceOption[] = [
  { id: "workspace-brainxly", label: "Workspace Brainxly" },
  { id: "workspace-pessoal", label: "Workspace Pessoal" },
];

export const DEFAULT_WORKSPACE_TREE: SidebarTreeNode[] = [
  {
    id: "workspace-brainxly",
    label: "Workspace Brainxly",
    type: "workspace",
    children: [
      {
        id: "workspace-brainxly-space-desenvolvimento-app",
        label: "Desenvolvimento App",
        type: "space",
        children: [
          { id: "workspace-brainxly-space-desenvolvimento-app-projects", label: "Projetos", type: "project" },
          { id: "workspace-brainxly-space-desenvolvimento-app-folders", label: "Pastas", type: "folder" },
          { id: "workspace-brainxly-space-desenvolvimento-app-lists", label: "Listas", type: "list" },
          { id: "workspace-brainxly-space-desenvolvimento-app-sprints", label: "Sprints", type: "sprint" },
        ],
      },
      {
        id: "workspace-brainxly-space-comercial",
        label: "Comercial",
        type: "space",
        children: [
          { id: "workspace-brainxly-space-comercial-projects", label: "Projetos", type: "project" },
          { id: "workspace-brainxly-space-comercial-folders", label: "Pastas", type: "folder" },
          { id: "workspace-brainxly-space-comercial-lists", label: "Listas", type: "list" },
          { id: "workspace-brainxly-space-comercial-sprints", label: "Sprints", type: "sprint" },
        ],
      },
      { id: "workspace-brainxly-new-space", label: "Novo Espaco", type: "space" },
    ],
  },
  {
    id: "workspace-pessoal",
    label: "Workspace Pessoal",
    type: "workspace",
    children: [
      {
        id: "workspace-pessoal-space-desenvolvimento-app",
        label: "Desenvolvimento App",
        type: "space",
        children: [
          { id: "workspace-pessoal-space-desenvolvimento-app-projects", label: "Projetos", type: "project" },
          { id: "workspace-pessoal-space-desenvolvimento-app-folders", label: "Pastas", type: "folder" },
          { id: "workspace-pessoal-space-desenvolvimento-app-lists", label: "Listas", type: "list" },
          { id: "workspace-pessoal-space-desenvolvimento-app-sprints", label: "Sprints", type: "sprint" },
        ],
      },
      {
        id: "workspace-pessoal-space-comercial",
        label: "Comercial",
        type: "space",
        children: [
          { id: "workspace-pessoal-space-comercial-projects", label: "Projetos", type: "project" },
          { id: "workspace-pessoal-space-comercial-folders", label: "Pastas", type: "folder" },
          { id: "workspace-pessoal-space-comercial-lists", label: "Listas", type: "list" },
          { id: "workspace-pessoal-space-comercial-sprints", label: "Sprints", type: "sprint" },
        ],
      },
      { id: "workspace-pessoal-new-space", label: "Novo Espaco", type: "space" },
    ],
  },
];

export const SECONDARY_PLUS_DROPDOWN_ITEMS = [
  { id: "settings", label: "Configuracoes" },
  { id: "people", label: "Pessoas" },
  { id: "create-space", label: "Criar Espaco" },
] as const;

/** Menu "Criar" do botão + no módulo Espaços */
export const ESPACOS_CRIAR_ITEMS = [
  { id: "tarefa", label: "Tarefa" },
  { id: "lista", label: "Lista" },
  { id: "espaco", label: "Espaco" },
  { id: "documento", label: "Documento" },
] as const;

/** Menu de reticências no módulo Espaços */
export const ESPACOS_OPTIONS_MENU = [
  { id: "criar-espaco", label: "Criar espaco" },
  { id: "gerenciar-espaco", label: "Gerenciar espaco" },
  { id: "expandir-fechar", label: "expandir-fechar" }, // toggle: "Expandir todos" | "Fechar todos"
] as const;

/** Menu "Criar" do dropdown Edit no módulo IA Hub */
export const IA_HUB_CRIAR_ITEMS = [
  { id: "pergunte-ia", label: "Pergunte à IA", icon: Sparkles },
  { id: "superagente", label: "Superagente", icon: Glasses, badge: "Hot" as const },
] as const;

/** Itens de navegação do dropdown Edit no módulo IA Hub */
export const IA_HUB_NAV_ITEMS = [
  { id: "todos-superagentes", label: "Todos os Superagentes", icon: Users },
  { id: "meus-superagentes", label: "Meus Superagentes", icon: UserRound },
  { id: "registros-auditoria", label: "Registros de auditoria", icon: Clock },
] as const;

/** Menu "Criar" do dropdown + no módulo Equipes */
export const EQUIPES_CRIAR_ITEMS = [{ id: "criar-equipe", label: "Criar Equipe" }] as const;

/** Menu "Criar" do dropdown + no módulo Docs Hub */
export const DOCS_HUB_CRIAR_ITEMS = [
  { id: "criar-documento", label: "Criar documento", icon: FileText },
] as const;

/** Documentos favoritos mock para o módulo Docs Hub */
export const DOCS_HUB_FAVORITES_MOCK = [
  { id: "doc-1", label: "Documentacao CTM" },
] as const;

/** Páginas recentes mock para o módulo Docs Hub */
export const DOCS_HUB_RECENT_PAGES_MOCK = [
  { id: "doc-2", label: "Mapeamento AS Is" },
  { id: "doc-3", label: "AAA" },
  { id: "doc-4", label: "Sem título" },
  { id: "doc-5", label: "Getting Started Guide" },
  { id: "doc-6", label: "Project Overview Doc" },
] as const;

/** Equipes mock para o módulo Equipes (Minhas equipes) */
export const EQUIPES_MOCK_TEAMS = [
  { id: "team-1", label: "Desenvolvimento", iconId: "users" },
] as const;

/** Chats recentes mock para o módulo IA Hub */
export const IA_HUB_RECENT_CHATS = [
  { id: "chat-1", label: "Task Risk Review" },
  { id: "chat-2", label: "Weekly Review & Cartoon Request" },
  { id: "chat-3", label: "Inspirational Quote Request" },
  { id: "chat-4", label: "Weekly Key Decisions Summary" },
] as const;

/** Biblioteca de ícones para seleção de espaço */
export const ESPACOS_ICON_LIBRARY = [
  { id: "briefcase", label: "Briefcase", icon: BriefcaseBusiness },
  { id: "folder", label: "Folder", icon: Folder },
  { id: "file-text", label: "File", icon: FileText },
  { id: "list", label: "List", icon: CheckSquare },
  { id: "sparkles", label: "Sparkles", icon: Sparkles },
  { id: "users", label: "Users", icon: Users },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "goal", label: "Goal", icon: Goal },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "building2", label: "Building", icon: Building2 },
] as const;

type EspacosIconId = (typeof ESPACOS_ICON_LIBRARY)[number]["id"];
export type { EspacosIconId };

export const THEME_ICONS = {
  light: Sun,
  dark: MoonStar,
};

export const TREE_NODE_ICON = CircleDot;

export const WORKSPACE_ACTION_ICONS = {
  add: Layers3,
  options: Ellipsis,
};
