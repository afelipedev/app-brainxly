import { supabase } from "@/features/shared/lib/supabase";
import type { TasksRepositoryContract } from "../contracts/tasks.contracts";
import type {
  CreateTaskInput,
  Task,
} from "../contracts/tasks.contracts";

function mapTask(row: Record<string, unknown>): Task {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    listId: row.list_id as string,
    parentTaskId: (row.parent_task_id as string | null) ?? null,
    title: row.title as string,
    description: (row.description as string | null) ?? null,
    status: (row.status as string) as Task["status"],
    priority: (row.priority as string) as Task["priority"],
    assigneeUserId: (row.assignee_user_id as string | null) ?? null,
    dueAt: (row.due_at as string | null) ?? null,
    depth: (row.depth as number) ?? 0,
    position: (row.position as number) ?? 0,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    archivedAt: (row.archived_at as string | null) ?? null,
  };
}

export class SupabaseTasksRepository implements TasksRepositoryContract {
  async create(input: CreateTaskInput): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        workspace_id: input.workspaceId,
        list_id: input.listId,
        parent_task_id: input.parentTaskId ?? null,
        title: input.title,
        description: input.description ?? null,
        status: input.status ?? "todo",
        priority: input.priority ?? "medium",
        assignee_user_id: input.assigneeUserId ?? null,
        due_at: input.dueAt ?? null,
        position: input.position ?? 0,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapTask(data as Record<string, unknown>);
  }

  async listByList(listId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("list_id", listId)
      .is("archived_at", null)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as Record<string, unknown>[]).map((r) => mapTask(r));
  }

  async update(
    taskId: string,
    updates: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "assigneeUserId" | "dueAt" | "parentTaskId" | "position">>,
  ): Promise<Task> {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
    if (updates.assigneeUserId !== undefined) dbUpdates.assignee_user_id = updates.assigneeUserId;
    if (updates.dueAt !== undefined) dbUpdates.due_at = updates.dueAt;
    if (updates.parentTaskId !== undefined) dbUpdates.parent_task_id = updates.parentTaskId;
    if (updates.position !== undefined) dbUpdates.position = updates.position;

    const { data, error } = await supabase
      .from("tasks")
      .update(dbUpdates)
      .eq("id", taskId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapTask(data as Record<string, unknown>);
  }

  async archive(taskId: string): Promise<void> {
    const { error } = await supabase
      .from("tasks")
      .update({ archived_at: new Date().toISOString() })
      .eq("id", taskId);

    if (error) throw new Error(error.message);
  }
}
