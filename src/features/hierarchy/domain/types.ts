export const HIERARCHY_NODE_TYPES = [
  "workspace",
  "space",
  "project",
  "folder",
  "list",
  "task",
  "sprint",
] as const;

export type HierarchyNodeType = (typeof HIERARCHY_NODE_TYPES)[number];

export const VISIBILITY_LEVELS = ["private", "workspace", "shared"] as const;
export type VisibilityLevel = (typeof VISIBILITY_LEVELS)[number];

export const MEMBER_ROLES = ["owner", "admin", "member", "guest"] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

export interface BaseEntity {
  id: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
}

export interface Workspace extends Omit<BaseEntity, "workspaceId"> {
  ownerUserId: string;
  name: string;
  slug: string;
  visibility: VisibilityLevel;
  settings: Record<string, unknown>;
}

export interface Space extends BaseEntity {
  name: string;
  description: string | null;
  visibility: VisibilityLevel;
  position: number;
}

export interface Project extends BaseEntity {
  name: string;
  description: string | null;
  visibility: VisibilityLevel;
  position: number;
  docsHubEnabled: boolean;
  spaceId: string | null;
  folderId: string | null;
}

export interface Folder extends BaseEntity {
  name: string;
  description: string | null;
  visibility: VisibilityLevel;
  position: number;
  docsHubEnabled: boolean;
  spaceId: string | null;
  projectId: string | null;
}

export interface List extends BaseEntity {
  name: string;
  description: string | null;
  visibility: VisibilityLevel;
  position: number;
  spaceId: string | null;
  folderId: string | null;
  projectId: string | null;
  sprintId: string | null;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: MemberRole;
  createdAt: string;
}

export interface ResourcePermissionOverride {
  id: string;
  workspaceId: string;
  resourceType: HierarchyNodeType;
  resourceId: string;
  targetRole: MemberRole | null;
  targetUserId: string | null;
  actions: string[];
}
