/** Converte registros snake_case do Postgres para camelCase do domínio */

export function mapWorkspace(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    ownerUserId: row.owner_user_id as string,
    name: row.name as string,
    slug: row.slug as string,
    visibility: row.visibility as string,
    settings: (row.settings as Record<string, unknown>) ?? {},
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    archivedAt: (row.archived_at as string | null) ?? null,
  };
}

export function mapWorkspaceMember(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    userId: row.user_id as string,
    role: row.role as string,
    createdAt: row.created_at as string,
  };
}

export function mapSpace(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    visibility: row.visibility as string,
    position: (row.position as number) ?? 0,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    archivedAt: (row.archived_at as string | null) ?? null,
  };
}

export function mapProject(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    visibility: row.visibility as string,
    position: (row.position as number) ?? 0,
    docsHubEnabled: (row.docs_hub_enabled as boolean) ?? true,
    spaceId: (row.space_id as string | null) ?? null,
    folderId: (row.folder_id as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    archivedAt: (row.archived_at as string | null) ?? null,
  };
}

export function mapFolder(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    visibility: row.visibility as string,
    position: (row.position as number) ?? 0,
    docsHubEnabled: (row.docs_hub_enabled as boolean) ?? true,
    spaceId: (row.space_id as string | null) ?? null,
    projectId: (row.project_id as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    archivedAt: (row.archived_at as string | null) ?? null,
  };
}

export function mapList(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    visibility: row.visibility as string,
    position: (row.position as number) ?? 0,
    spaceId: (row.space_id as string | null) ?? null,
    folderId: (row.folder_id as string | null) ?? null,
    projectId: (row.project_id as string | null) ?? null,
    sprintId: (row.sprint_id as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    archivedAt: (row.archived_at as string | null) ?? null,
  };
}

export function mapArtifact(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    kind: row.kind as string,
    title: row.title as string,
    content: (row.content as Record<string, unknown>) ?? {},
    parentType: row.parent_type as string,
    parentId: row.parent_id as string,
    visibility: row.visibility as string,
    createdBy: (row.created_by as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    archivedAt: (row.archived_at as string | null) ?? null,
  };
}

export function mapResourcePermissionOverride(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    resourceType: row.resource_type as string,
    resourceId: row.resource_id as string,
    targetRole: (row.target_role as string | null) ?? null,
    targetUserId: (row.target_user_id as string | null) ?? null,
    actions: (row.actions as string[]) ?? [],
  };
}
