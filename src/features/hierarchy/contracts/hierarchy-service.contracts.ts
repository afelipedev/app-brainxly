import type {
  Folder,
  List,
  Project,
  ResourcePermissionOverride,
  Space,
  Workspace,
  WorkspaceMember,
} from "../domain/types";
import type {
  CreateHierarchyNodeInput,
  MoveHierarchyNodeInput,
  ShareResourceInput,
  UpsertPermissionOverrideInput,
} from "./hierarchy.contracts";

export interface HierarchyRepositoryContract {
  createWorkspace(input: Pick<Workspace, "name" | "slug" | "ownerUserId">): Promise<Workspace>;
  listWorkspaces(): Promise<Workspace[]>;

  createSpace(input: CreateHierarchyNodeInput): Promise<Space>;
  createProject(input: CreateHierarchyNodeInput): Promise<Project>;
  createFolder(input: CreateHierarchyNodeInput): Promise<Folder>;
  createList(input: CreateHierarchyNodeInput): Promise<List>;

  moveNode(input: MoveHierarchyNodeInput): Promise<void>;
  archiveNode(nodeType: "space" | "project" | "folder" | "list", nodeId: string): Promise<void>;
}

export interface AccessControlRepositoryContract {
  listWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]>;
  inviteWorkspaceMember(input: {
    workspaceId: string;
    userId: string;
    role: WorkspaceMember["role"];
  }): Promise<void>;
  shareResource(input: ShareResourceInput): Promise<void>;
  upsertPermissionOverride(input: UpsertPermissionOverrideInput): Promise<ResourcePermissionOverride>;
}
