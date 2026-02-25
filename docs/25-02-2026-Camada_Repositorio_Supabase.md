# 25-02-2026 - Camada_Repositorio_Supabase

## Objetivo

Implementar a camada de repositório Supabase com queries reais para os contratos de domínio da hierarquia Brainxly, permitindo que a UI e os serviços consumam dados persistidos via RLS.

## O que foi implementado

### 1) Cliente Supabase e mapeadores

Arquivos:
- `src/features/shared/lib/supabase.ts` — cliente Supabase configurado com variáveis de ambiente
- `src/features/shared/lib/db-mappers.ts` — conversão snake_case (Postgres) → camelCase (domínio)

Variáveis de ambiente necessárias:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Arquivo `.env.example` criado com o padrão esperado.

### 2) Repositório de hierarquia

Arquivo: `src/features/hierarchy/repositories/supabase-hierarchy.repository.ts`

Implementa `HierarchyRepositoryContract`:
- `createWorkspace` — cria workspace e dispara membership do owner
- `listWorkspaces` — lista workspaces do usuário autenticado
- `createSpace` — cria espaço em workspace
- `createProject` — cria projeto em space ou folder
- `createFolder` — cria pasta em space ou project
- `createList` — cria lista em space, folder, project ou sprint
- `moveNode` — move nó entre pais e atualiza posição
- `archiveNode` — arquiva logicamente space, project, folder ou list

### 3) Repositório de controle de acesso

Arquivo: `src/features/hierarchy/repositories/supabase-access-control.repository.ts`

Implementa `AccessControlRepositoryContract`:
- `listWorkspaceMembers` — lista membros do workspace
- `inviteWorkspaceMember` — adiciona ou atualiza membro
- `shareResource` — compartilha recurso com usuário específico
- `upsertPermissionOverride` — insere override de permissão por recurso

### 4) Repositório de sprints

Arquivo: `src/features/sprints/repositories/supabase-sprints.repository.ts`

Implementa `SprintsRepositoryContract`:
- `createTemplate` — cria template com listas e tarefas
- `createSprint` — cria sprint e aplica template automaticamente (RPC)
- `applyTemplate` — aplica template a sprint existente via RPC `apply_sprint_template`

### 5) Repositório de artifacts (Docs Hub)

Arquivo: `src/features/docs-hub/repositories/supabase-artifacts.repository.ts`

Implementa `ArtifactsRepositoryContract`:
- `create` — cria documento, dashboard, formulário ou whiteboard vinculado a nó
- `listByParent` — lista artifacts por parent (workspace, space, project, folder, list, task, sprint)
- `archive` — arquiva artifact logicamente

### 6) Repositório de tarefas

Arquivos:
- `src/features/tasks/contracts/tasks.contracts.ts` — contrato e tipos
- `src/features/tasks/repositories/supabase-tasks.repository.ts` — implementação

Implementa `TasksRepositoryContract`:
- `create` — cria tarefa ou subtarefa (depth calculado pelo trigger)
- `listByList` — lista tarefas da lista ordenadas
- `update` — atualiza título, status, prioridade, assignee, due, parent, position
- `archive` — arquiva tarefa logicamente

## Uso

```ts
import { SupabaseHierarchyRepository } from "@/features/hierarchy/repositories";
import { SupabaseSprintsRepository } from "@/features/sprints/repositories";
import { SupabaseArtifactsRepository } from "@/features/docs-hub/repositories";
import { SupabaseTasksRepository } from "@/features/tasks/repositories";

const hierarchyRepo = new SupabaseHierarchyRepository();
const sprintsRepo = new SupabaseSprintsRepository();
const artifactsRepo = new SupabaseArtifactsRepository();
const tasksRepo = new SupabaseTasksRepository();

// Requer usuário autenticado (RLS valida membership)
const workspaces = await hierarchyRepo.listWorkspaces();
```

## Dependência

- `@supabase/supabase-js` adicionada ao `package.json`

## Próximos passos recomendados

1. Integrar repositórios em hooks ou serviços consumidos pela UI
2. Configurar autenticação Supabase Auth e passar sessão ao cliente
3. Iniciar construção da sidebar dual-tier consumindo `SupabaseHierarchyRepository`
