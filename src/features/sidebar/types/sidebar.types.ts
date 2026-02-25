import type { LucideIcon } from "lucide-react";

export const SidebarModule = {
  HOME: "home",
  ESPACOS: "espacos",
  IA_HUB: "ia-hub",
  PLANEJADOR: "planejador",
  EQUIPES: "equipes",
  DOCS_HUB: "docs-hub",
  WHITEBOARD: "whiteboard",
  CONFIGURACOES: "configuracoes",
  CENTRAL_FINANCEIRA: "central-financeira",
  ESTUDOS: "estudos",
  METAS: "metas",
  HABITOS: "habitos",
  CONTRATOS: "contratos",
  CLIENTES: "clientes",
  USUARIOS: "usuarios",
} as const;

export type SidebarModule = (typeof SidebarModule)[keyof typeof SidebarModule];

export type SidebarNodeType =
  | "workspace"
  | "space"
  | "project"
  | "folder"
  | "list"
  | "sprint"
  | "task"
  | "doc"
  | "finance";

export interface SidebarTreeNode {
  id: string;
  label: string;
  type: SidebarNodeType;
  iconId?: string;
  children?: SidebarTreeNode[];
}

export interface SidebarNavItem {
  id: SidebarModule;
  label: string;
  icon: LucideIcon;
}

export interface WorkspaceOption {
  id: string;
  label: string;
}

export interface SidebarState {
  activeModule: SidebarModule;
  isSecondaryOpen: boolean;
  collapsed: boolean;
  darkMode: boolean;
  activeWorkspace: string;
  notificationsCount: number;
  favoritesList: string[];
}

export interface SidebarContextValue extends SidebarState {
  workspaceOptions: WorkspaceOption[];
  workspaceTree: SidebarTreeNode[];
  expandedNodeIds: Set<string>;
  isMorePanelOpen: boolean;
  setActiveModule: (module: SidebarModule) => void;
  setSecondaryOpen: (isOpen: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleDarkMode: () => void;
  setActiveWorkspace: (workspaceId: string) => void;
  setNotificationsCount: (count: number) => void;
  addFavorite: (item: string) => void;
  removeFavorite: (item: string) => void;
  toggleNode: (nodeId: string) => void;
  expandAllNodes: () => void;
  collapseAllNodes: () => void;
  addWorkspace: () => void;
  addSpace: (params: { name: string; description?: string; iconId?: string }) => void;
  openMorePanel: () => void;
  closeMorePanel: () => void;
}
