import type { TaskPriority, TaskStatus } from "../domain/task.types";

export interface Task {
  id: string;
  workspaceId: string;
  listId: string;
  parentTaskId: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeUserId: string | null;
  dueAt: string | null;
  depth: number;
  position: number;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
}

export interface CreateTaskInput {
  workspaceId: string;
  listId: string;
  parentTaskId?: string | null;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeUserId?: string | null;
  dueAt?: string | null;
  position?: number;
}

export interface TasksRepositoryContract {
  create(input: CreateTaskInput): Promise<Task>;
  listByList(listId: string): Promise<Task[]>;
  update(
    taskId: string,
    updates: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "assigneeUserId" | "dueAt" | "parentTaskId" | "position">>,
  ): Promise<Task>;
  archive(taskId: string): Promise<void>;
}
