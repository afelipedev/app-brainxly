import { DEFAULT_WORKSPACE_OPTIONS, DEFAULT_WORKSPACE_TREE } from "@/features/sidebar/data/sidebar.data";
import { SidebarModule, type SidebarTreeNode } from "@/features/sidebar/types/sidebar.types";
import type { SidebarContextValue } from "@/features/sidebar/types/sidebar.types";
import { useEffect, useMemo, useState } from "react";
import { SidebarContext } from "./sidebar-context";

interface SidebarProviderProps {
  children: React.ReactNode;
}

function createNodeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 10000)}`;
}

function appendWorkspaceToTree(tree: SidebarTreeNode[], workspaceId: string, workspaceLabel: string): SidebarTreeNode[] {
  return [
    ...tree,
    {
      id: workspaceId,
      label: workspaceLabel,
      type: "workspace",
      children: [
        {
          id: `${workspaceId}-space-desenvolvimento-app`,
          label: "Desenvolvimento App",
          type: "space",
          children: [
            { id: `${workspaceId}-space-desenvolvimento-app-projects`, label: "Projetos", type: "project" },
            { id: `${workspaceId}-space-desenvolvimento-app-folders`, label: "Pastas", type: "folder" },
            { id: `${workspaceId}-space-desenvolvimento-app-lists`, label: "Listas", type: "list" },
            { id: `${workspaceId}-space-desenvolvimento-app-sprints`, label: "Sprints", type: "sprint" },
          ],
        },
        {
          id: `${workspaceId}-space-comercial`,
          label: "Comercial",
          type: "space",
          children: [
            { id: `${workspaceId}-space-comercial-projects`, label: "Projetos", type: "project" },
            { id: `${workspaceId}-space-comercial-folders`, label: "Pastas", type: "folder" },
            { id: `${workspaceId}-space-comercial-lists`, label: "Listas", type: "list" },
            { id: `${workspaceId}-space-comercial-sprints`, label: "Sprints", type: "sprint" },
          ],
        },
        { id: `${workspaceId}-new-space`, label: "Novo Espaco", type: "space" },
      ],
    },
  ];
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [activeModule, setActiveModuleState] = useState<SidebarModule>(SidebarModule.HOME);
  const [isSecondaryOpen, setSecondaryOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const persistedTheme = localStorage.getItem("brainxly-theme");
    if (persistedTheme) return persistedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [workspaceOptions, setWorkspaceOptions] = useState(DEFAULT_WORKSPACE_OPTIONS);
  const [workspaceTree, setWorkspaceTree] = useState<SidebarTreeNode[]>(DEFAULT_WORKSPACE_TREE);
  const [activeWorkspace, setActiveWorkspace] = useState(DEFAULT_WORKSPACE_OPTIONS[0]?.id ?? "");
  const [notificationsCount, setNotificationsCount] = useState(7);
  const [favoritesList, setFavoritesList] = useState<string[]>([]);
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(() => new Set(workspaceTree.map((node) => node.id)));
  const [isMorePanelOpen, setMorePanelOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("brainxly-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function setActiveModule(module: SidebarModule) {
    setActiveModuleState(module);
    setSecondaryOpen(true);
    setMorePanelOpen(false);
  }

  function toggleNode(nodeId: string) {
    setExpandedNodeIds((currentSet) => {
      const nextSet = new Set(currentSet);
      if (nextSet.has(nodeId)) nextSet.delete(nodeId);
      else nextSet.add(nodeId);
      return nextSet;
    });
  }

  function collectAllNodeIds(nodes: SidebarTreeNode[]): string[] {
    return nodes.flatMap((node) => [
      node.id,
      ...(node.children ? collectAllNodeIds(node.children) : []),
    ]);
  }

  function expandAllNodes() {
    const activeWorkspaceNode = workspaceTree.find((w) => w.id === activeWorkspace);
    if (!activeWorkspaceNode?.children) return;
    const allIds = collectAllNodeIds(activeWorkspaceNode.children);
    setExpandedNodeIds((current) => new Set([...current, ...allIds]));
  }

  function collapseAllNodes() {
    const activeWorkspaceNode = workspaceTree.find((w) => w.id === activeWorkspace);
    if (!activeWorkspaceNode?.children) return;
    const allIds = collectAllNodeIds(activeWorkspaceNode.children);
    setExpandedNodeIds((current) => {
      const next = new Set(current);
      allIds.forEach((id) => next.delete(id));
      return next;
    });
  }

  function addSpace(params: { name: string; description?: string; iconId?: string }) {
    const workspaceNode = workspaceTree.find((w) => w.id === activeWorkspace);
    if (!workspaceNode) return;
    const spaceId = createNodeId("space");
    const newSpace: SidebarTreeNode = {
      id: spaceId,
      label: params.name.trim(),
      type: "space",
      iconId: params.iconId,
      children: [
        { id: `${spaceId}-projects`, label: "Projetos", type: "project" },
        { id: `${spaceId}-folders`, label: "Pastas", type: "folder" },
        { id: `${spaceId}-lists`, label: "Listas", type: "list" },
        { id: `${spaceId}-sprints`, label: "Sprints", type: "sprint" },
      ],
    };
    setWorkspaceTree((current) =>
      current.map((w) =>
        w.id === activeWorkspace
          ? {
              ...w,
              children: [
                ...(w.children ?? []).filter((c) => !c.label.trim().startsWith("Novo Espaco")),
                newSpace,
                { id: `${activeWorkspace}-new-space`, label: "Novo Espaco", type: "space" },
              ],
            }
          : w
      )
    );
    setExpandedNodeIds((current) => new Set(current).add(spaceId));
  }

  function addWorkspace() {
    const workspaceName = window.prompt("Nome do novo workspace:");
    if (!workspaceName) return;
    const workspaceLabel = workspaceName.trim();
    if (!workspaceLabel) return;

    const workspaceId = createNodeId("workspace");
    setWorkspaceOptions((current) => [...current, { id: workspaceId, label: workspaceLabel }]);
    setWorkspaceTree((current) => appendWorkspaceToTree(current, workspaceId, workspaceLabel));
    setExpandedNodeIds((currentSet) => new Set(currentSet).add(workspaceId));
    setActiveWorkspace(workspaceId);
  }

  function addFavorite(item: string) {
    setFavoritesList((current) => (current.includes(item) ? current : [...current, item]));
  }

  function removeFavorite(item: string) {
    setFavoritesList((current) => current.filter((entry) => entry !== item));
  }

  const value = useMemo<SidebarContextValue>(
    () => ({
      activeModule,
      isSecondaryOpen,
      collapsed,
      darkMode,
      activeWorkspace,
      notificationsCount,
      favoritesList,
      workspaceOptions,
      workspaceTree,
      expandedNodeIds,
      isMorePanelOpen,
      setActiveModule,
      setSecondaryOpen,
      setCollapsed,
      toggleDarkMode: () => setDarkMode((current) => !current),
      setActiveWorkspace,
      setNotificationsCount,
      addFavorite,
      removeFavorite,
      toggleNode,
      expandAllNodes,
      collapseAllNodes,
      addWorkspace,
      addSpace,
      openMorePanel: () => setMorePanelOpen(true),
      closeMorePanel: () => setMorePanelOpen(false),
    }),
    [
      activeModule,
      isSecondaryOpen,
      collapsed,
      darkMode,
      activeWorkspace,
      notificationsCount,
      favoritesList,
      workspaceOptions,
      workspaceTree,
      expandedNodeIds,
      isMorePanelOpen,
    ]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
