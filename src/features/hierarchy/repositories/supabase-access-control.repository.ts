import { supabase } from "@/features/shared/lib/supabase";
import {
  mapResourcePermissionOverride,
  mapWorkspaceMember,
} from "@/features/shared/lib/db-mappers";
import type { AccessControlRepositoryContract } from "../contracts/hierarchy-service.contracts";
import type {
  ShareResourceInput,
  UpsertPermissionOverrideInput,
} from "../contracts/hierarchy.contracts";
import type {
  ResourcePermissionOverride,
  WorkspaceMember,
} from "../domain/types";

export class SupabaseAccessControlRepository
  implements AccessControlRepositoryContract
{
  async listWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    const { data, error } = await supabase
      .from("workspace_members")
      .select("*")
      .eq("workspace_id", workspaceId);

    if (error) throw new Error(error.message);
    return (data as Record<string, unknown>[]).map((r) =>
      mapWorkspaceMember(r),
    ) as WorkspaceMember[];
  }

  async inviteWorkspaceMember(input: {
    workspaceId: string;
    userId: string;
    role: WorkspaceMember["role"];
  }): Promise<void> {
    const { error } = await supabase.from("workspace_members").upsert(
      {
        workspace_id: input.workspaceId,
        user_id: input.userId,
        role: input.role,
      },
      { onConflict: "workspace_id,user_id" },
    );

    if (error) throw new Error(error.message);
  }

  async shareResource(input: ShareResourceInput): Promise<void> {
    const { error } = await supabase.from("resource_shares").upsert(
      {
        workspace_id: input.workspaceId,
        resource_type: input.resourceType,
        resource_id: input.resourceId,
        target_user_id: input.targetUserId,
        permissions: input.permissions,
      },
      {
        onConflict: "workspace_id,resource_type,resource_id,target_user_id",
      },
    );

    if (error) throw new Error(error.message);
  }

  async upsertPermissionOverride(
    input: UpsertPermissionOverrideInput,
  ): Promise<ResourcePermissionOverride> {
    const row = {
      workspace_id: input.workspaceId,
      resource_type: input.resourceType,
      resource_id: input.resourceId,
      target_role: input.targetRole ?? null,
      target_user_id: input.targetUserId ?? null,
      actions: input.actions,
    };

    const { data, error } = await supabase
      .from("permission_overrides")
      .insert(row)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapResourcePermissionOverride(data as Record<string, unknown>) as ResourcePermissionOverride;
  }
}
