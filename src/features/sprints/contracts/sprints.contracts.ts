import type { SprintTemplate } from "../domain/sprint-template";

export interface CreateSprintTemplateInput {
  workspaceId: string;
  name: string;
  scope: "workspace" | "folder";
  folderId?: string;
  isDefault?: boolean;
  lists: Array<{
    name: string;
    description?: string;
    position?: number;
    tasks: Array<{
      title: string;
      description?: string;
      priority?: "low" | "medium" | "high" | "urgent";
      checklist?: string[];
      position?: number;
    }>;
  }>;
}

export interface CreateSprintFromTemplateInput {
  workspaceId: string;
  folderId?: string;
  spaceId?: string;
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
  templateId?: string;
}

export interface SprintsRepositoryContract {
  createTemplate(input: CreateSprintTemplateInput): Promise<SprintTemplate>;
  createSprint(input: CreateSprintFromTemplateInput): Promise<{ sprintId: string }>;
  applyTemplate(sprintId: string): Promise<void>;
}
