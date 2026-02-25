import { supabase } from "@/features/shared/lib/supabase";
import {
  mapFolder,
  mapList,
  mapProject,
  mapSpace,
  mapWorkspace,
} from "@/features/shared/lib/db-mappers";
import type { HierarchyRepositoryContract } from "../contracts/hierarchy-service.contracts";
import type {
  CreateHierarchyNodeInput,
  MoveHierarchyNodeInput,
} from "../contracts/hierarchy.contracts";
import type { Folder, List, Project, Space, Workspace } from "../domain/types";

export class SupabaseHierarchyRepository implements HierarchyRepositoryContract {
  async createWorkspace(
    input: Pick<Workspace, "name" | "slug" | "ownerUserId">,
  ): Promise<Workspace> {
    const { data, error } = await supabase
      .from("workspaces")
      .insert({
        name: input.name,
        slug: input.slug,
        owner_user_id: input.ownerUserId,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapWorkspace(data as Record<string, unknown>) as Workspace;
  }

  async listWorkspaces(): Promise<Workspace[]> {
    const { data, error } = await supabase.from("workspaces").select("*");

    if (error) throw new Error(error.message);
    return (data as Record<string, unknown>[]).map((r) =>
      mapWorkspace(r),
    ) as Workspace[];
  }

  async createSpace(input: CreateHierarchyNodeInput): Promise<Space> {
    if (input.parentType !== "workspace" || !input.parentId) {
      throw new Error("Space deve pertencer a um workspace");
    }

    const { data, error } = await supabase
      .from("spaces")
      .insert({
        workspace_id: input.workspaceId,
        name: input.name,
        description: input.description ?? null,
        visibility: input.visibility ?? "workspace",
        position: input.position ?? 0,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapSpace(data as Record<string, unknown>) as Space;
  }

  async createProject(input: CreateHierarchyNodeInput): Promise<Project> {
    const spaceId = input.parentType === "space" ? input.parentId : null;
    const folderId = input.parentType === "folder" ? input.parentId : null;

    if (!spaceId && !folderId) {
      throw new Error("Project deve pertencer a um space ou folder");
    }

    const { data, error } = await supabase
      .from("projects")
      .insert({
        workspace_id: input.workspaceId,
        space_id: spaceId,
        folder_id: folderId,
        name: input.name,
        description: input.description ?? null,
        visibility: input.visibility ?? "workspace",
        position: input.position ?? 0,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapProject(data as Record<string, unknown>) as Project;
  }

  async createFolder(input: CreateHierarchyNodeInput): Promise<Folder> {
    const spaceId = input.parentType === "space" ? input.parentId : null;
    const projectId = input.parentType === "project" ? input.parentId : null;

    if (!spaceId && !projectId) {
      throw new Error("Folder deve pertencer a um space ou project");
    }

    const { data, error } = await supabase
      .from("folders")
      .insert({
        workspace_id: input.workspaceId,
        space_id: spaceId,
        project_id: projectId,
        name: input.name,
        description: input.description ?? null,
        visibility: input.visibility ?? "workspace",
        position: input.position ?? 0,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapFolder(data as Record<string, unknown>) as Folder;
  }

  async createList(input: CreateHierarchyNodeInput): Promise<List> {
    const spaceId = input.parentType === "space" ? input.parentId : null;
    const folderId = input.parentType === "folder" ? input.parentId : null;
    const projectId = input.parentType === "project" ? input.parentId : null;
    const sprintId = input.parentType === "sprint" ? input.parentId : null;

    if (!spaceId && !folderId && !projectId && !sprintId) {
      throw new Error("List deve pertencer a space, folder, project ou sprint");
    }

    const { data, error } = await supabase
      .from("lists")
      .insert({
        workspace_id: input.workspaceId,
        space_id: spaceId,
        folder_id: folderId,
        project_id: projectId,
        sprint_id: sprintId,
        name: input.name,
        description: input.description ?? null,
        visibility: input.visibility ?? "workspace",
        position: input.position ?? 0,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapList(data as Record<string, unknown>) as List;
  }

  async moveNode(input: MoveHierarchyNodeInput): Promise<void> {
    const { nodeId, type, targetParentType, targetParentId, targetPosition } = input;

    const updates: Record<string, unknown> = {};
    if (targetPosition !== undefined) updates.position = targetPosition;

    switch (type) {
      case "space":
        if (targetParentType !== "workspace") {
          throw new Error("Space só pode estar em workspace");
        }
        break;
      case "project":
        updates.space_id = targetParentType === "space" ? targetParentId : null;
        updates.folder_id = targetParentType === "folder" ? targetParentId : null;
        break;
      case "folder":
        updates.space_id = targetParentType === "space" ? targetParentId : null;
        updates.project_id = targetParentType === "project" ? targetParentId : null;
        break;
      case "list":
        updates.space_id = targetParentType === "space" ? targetParentId : null;
        updates.folder_id = targetParentType === "folder" ? targetParentId : null;
        updates.project_id = targetParentType === "project" ? targetParentId : null;
        updates.sprint_id = targetParentType === "sprint" ? targetParentId : null;
        break;
      case "sprint":
        break;
      default:
        throw new Error(`Tipo de nó não suportado para move: ${type}`);
    }

    const table = type === "project" ? "projects" : type === "folder" ? "folders" : type === "list" ? "lists" : "spaces";
    if (table === "spaces" && Object.keys(updates).length === 0 && targetPosition !== undefined) {
      const { error } = await supabase
        .from("spaces")
        .update({ position: targetPosition })
        .eq("id", nodeId);
      if (error) throw new Error(error.message);
      return;
    }

    if (table !== "spaces") {
      const { error } = await supabase
        .from(table)
        .update(updates)
        .eq("id", nodeId);
      if (error) throw new Error(error.message);
    }
  }

  async archiveNode(
    nodeType: "space" | "project" | "folder" | "list",
    nodeId: string,
  ): Promise<void> {
    const table = nodeType === "space" ? "spaces" : nodeType === "project" ? "projects" : nodeType === "folder" ? "folders" : "lists";
    const { error } = await supabase
      .from(table)
      .update({ archived_at: new Date().toISOString() })
      .eq("id", nodeId);

    if (error) throw new Error(error.message);
  }
}
