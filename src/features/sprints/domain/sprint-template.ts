import type { TaskPriority } from "@/features/tasks/domain/task.types";

export type SprintTemplateScope = "workspace" | "folder";
export type SprintStatus = "planned" | "active" | "completed" | "cancelled";

export interface SprintTemplateTaskBlueprint {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  checklist: string[];
  position: number;
}

export interface SprintTemplateListBlueprint {
  id: string;
  name: string;
  description: string | null;
  position: number;
  tasks: SprintTemplateTaskBlueprint[];
}

export interface SprintTemplate {
  id: string;
  workspaceId: string;
  name: string;
  scope: SprintTemplateScope;
  folderId: string | null;
  isDefault: boolean;
  lists: SprintTemplateListBlueprint[];
}

export interface CreateSprintInput {
  workspaceId: string;
  folderId: string | null;
  spaceId: string | null;
  name: string;
  goal: string | null;
  startDate: string;
  endDate: string;
  templateId: string | null;
}

export function validateSprintDateRange(startDate: Date, endDate: Date): boolean {
  return endDate.getTime() >= startDate.getTime();
}

export function resolveSprintTemplateId(params: {
  explicitTemplateId?: string | null;
  defaultWorkspaceTemplateId?: string | null;
  defaultFolderTemplateId?: string | null;
}): string | null {
  const { explicitTemplateId, defaultWorkspaceTemplateId, defaultFolderTemplateId } = params;
  return explicitTemplateId ?? defaultFolderTemplateId ?? defaultWorkspaceTemplateId ?? null;
}
