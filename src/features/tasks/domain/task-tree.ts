export const MAX_TASK_DEPTH = 5;

export interface TaskNode {
  id: string;
  workspaceId: string;
  listId: string;
  parentTaskId: string | null;
  depth: number;
}

export interface ValidateTaskParentingInput {
  movingTaskId: string | null;
  parentTaskId: string | null;
  listId: string;
  workspaceId: string;
  tasksById: Record<string, TaskNode>;
}

function isAncestorOf(
  ancestorId: string,
  descendantId: string,
  tasksById: Record<string, TaskNode>,
): boolean {
  let current = tasksById[descendantId];

  while (current?.parentTaskId) {
    if (current.parentTaskId === ancestorId) {
      return true;
    }
    current = tasksById[current.parentTaskId];
  }

  return false;
}

export function computeNextDepth(
  parentTaskId: string | null,
  tasksById: Record<string, TaskNode>,
): number {
  if (!parentTaskId) {
    return 0;
  }
  const parent = tasksById[parentTaskId];
  if (!parent) {
    throw new Error("Tarefa pai nao encontrada.");
  }
  return parent.depth + 1;
}

export function validateTaskParenting(input: ValidateTaskParentingInput): {
  isValid: boolean;
  nextDepth: number;
  reason?: string;
} {
  const { movingTaskId, parentTaskId, listId, workspaceId, tasksById } = input;
  const nextDepth = computeNextDepth(parentTaskId, tasksById);

  if (nextDepth > MAX_TASK_DEPTH) {
    return {
      isValid: false,
      nextDepth,
      reason: `Profundidade maxima excedida (${MAX_TASK_DEPTH}).`,
    };
  }

  if (!parentTaskId) {
    return { isValid: true, nextDepth };
  }

  const parent = tasksById[parentTaskId];
  if (!parent) {
    return { isValid: false, nextDepth, reason: "Tarefa pai nao encontrada." };
  }

  if (parent.listId !== listId) {
    return {
      isValid: false,
      nextDepth,
      reason: "Subtarefas devem permanecer na mesma lista.",
    };
  }

  if (parent.workspaceId !== workspaceId) {
    return {
      isValid: false,
      nextDepth,
      reason: "Subtarefas devem permanecer no mesmo workspace.",
    };
  }

  if (movingTaskId && isAncestorOf(movingTaskId, parentTaskId, tasksById)) {
    return { isValid: false, nextDepth, reason: "Ciclo detectado na arvore de tarefas." };
  }

  return { isValid: true, nextDepth };
}
