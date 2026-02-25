import type { HierarchyNodeType, MemberRole, VisibilityLevel } from "../domain/types";

export interface HierarchyScopeRef {
  workspaceId: string;
  parentType: HierarchyNodeType | null;
  parentId: string | null;
}

export interface CreateHierarchyNodeInput extends HierarchyScopeRef {
  type: Exclude<HierarchyNodeType, "workspace" | "task">;
  name: string;
  description?: string;
  visibility?: VisibilityLevel;
  position?: number;
}

export interface MoveHierarchyNodeInput {
  nodeId: string;
  type: Exclude<HierarchyNodeType, "workspace" | "task">;
  targetParentType: Exclude<HierarchyNodeType, "task"> | null;
  targetParentId: string | null;
  targetPosition?: number;
}

export interface ShareResourceInput {
  workspaceId: string;
  resourceType: HierarchyNodeType;
  resourceId: string;
  targetUserId: string;
  permissions: string[];
}

export interface UpsertPermissionOverrideInput {
  workspaceId: string;
  resourceType: HierarchyNodeType;
  resourceId: string;
  targetRole?: MemberRole;
  targetUserId?: string;
  actions: string[];
}

export const ALLOWED_HIERARCHY_PARENTS: Record<
  Exclude<HierarchyNodeType, "workspace" | "task">,
  readonly HierarchyNodeType[]
> = {
  space: ["workspace"],
  folder: ["space", "project"],
  project: ["space", "folder"],
  list: ["space", "folder", "project", "sprint"],
  sprint: ["workspace", "space", "folder"],
};

export function isValidHierarchyParent(
  childType: Exclude<HierarchyNodeType, "workspace" | "task">,
  parentType: HierarchyNodeType | null,
): boolean {
  if (childType === "space") {
    return parentType === "workspace";
  }

  if (parentType === null) {
    return false;
  }

  return ALLOWED_HIERARCHY_PARENTS[childType].includes(parentType);
}
