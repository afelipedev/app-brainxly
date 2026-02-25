import { supabase } from "@/features/shared/lib/supabase";
import type { SprintsRepositoryContract } from "../contracts/sprints.contracts";
import type {
  CreateSprintFromTemplateInput,
  CreateSprintTemplateInput,
} from "../contracts/sprints.contracts";
import type {
  SprintTemplate,
  SprintTemplateListBlueprint,
  SprintTemplateTaskBlueprint,
} from "../domain/sprint-template";

export class SupabaseSprintsRepository implements SprintsRepositoryContract {
  async createTemplate(input: CreateSprintTemplateInput): Promise<SprintTemplate> {
    const { data: templateData, error: templateError } = await supabase
      .from("sprint_templates")
      .insert({
        workspace_id: input.workspaceId,
        name: input.name,
        scope: input.scope,
        folder_id: input.folderId ?? null,
        is_default: input.isDefault ?? false,
      })
      .select()
      .single();

    if (templateError) throw new Error(templateError.message);
    const templateId = (templateData as { id: string }).id;

    const lists: SprintTemplateListBlueprint[] = [];

    for (let i = 0; i < input.lists.length; i++) {
      const listInput = input.lists[i];
      const { data: listData, error: listError } = await supabase
        .from("sprint_template_lists")
        .insert({
          sprint_template_id: templateId,
          name: listInput.name,
          description: listInput.description ?? null,
          position: listInput.position ?? i * 10,
        })
        .select()
        .single();

      if (listError) throw new Error(listError.message);
      const listId = (listData as { id: string }).id;

      const tasks: SprintTemplateTaskBlueprint[] = [];
      const taskInputs = listInput.tasks ?? [];

      for (let j = 0; j < taskInputs.length; j++) {
        const t = taskInputs[j];
        const { data: taskData, error: taskError } = await supabase
          .from("sprint_template_tasks")
          .insert({
            sprint_template_list_id: listId,
            title: t.title,
            description: t.description ?? null,
            priority: t.priority ?? "medium",
            checklist: t.checklist ?? [],
            position: t.position ?? j * 10,
          })
          .select()
          .single();

        if (taskError) throw new Error(taskError.message);
        const taskRow = taskData as {
          id: string;
          title: string;
          description: string | null;
          priority: string;
          checklist: unknown[];
          position: number;
        };
        tasks.push({
          id: taskRow.id,
          title: taskRow.title,
          description: taskRow.description,
          priority: taskRow.priority as SprintTemplateTaskBlueprint["priority"],
          checklist: taskRow.checklist as string[],
          position: taskRow.position,
        });
      }

      const listRow = listData as {
        id: string;
        name: string;
        description: string | null;
        position: number;
      };
      lists.push({
        id: listRow.id,
        name: listRow.name,
        description: listRow.description,
        position: listRow.position,
        tasks,
      });
    }

    const templateRow = templateData as {
      id: string;
      workspace_id: string;
      name: string;
      scope: string;
      folder_id: string | null;
    };

    return {
      id: templateRow.id,
      workspaceId: templateRow.workspace_id,
      name: templateRow.name,
      scope: templateRow.scope as SprintTemplate["scope"],
      folderId: templateRow.folder_id,
      isDefault: (templateData as { is_default: boolean }).is_default,
      lists,
    };
  }

  async createSprint(
    input: CreateSprintFromTemplateInput,
  ): Promise<{ sprintId: string }> {
    const { data, error } = await supabase
      .from("sprints")
      .insert({
        workspace_id: input.workspaceId,
        folder_id: input.folderId ?? null,
        space_id: input.spaceId ?? null,
        name: input.name,
        goal: input.goal ?? null,
        start_date: input.startDate,
        end_date: input.endDate,
        template_id: input.templateId ?? null,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    const sprintId = (data as { id: string }).id;

    if (input.templateId) {
      const { error: rpcError } = await supabase.rpc("apply_sprint_template", {
        p_sprint_id: sprintId,
      });
      if (rpcError) throw new Error(rpcError.message);
    }

    return { sprintId };
  }

  async applyTemplate(sprintId: string): Promise<void> {
    const { error } = await supabase.rpc("apply_sprint_template", {
      p_sprint_id: sprintId,
    });
    if (error) throw new Error(error.message);
  }
}
