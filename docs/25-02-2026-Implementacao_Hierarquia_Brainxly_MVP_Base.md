# 25-02-2026 - Implementacao_Hierarquia_Brainxly_MVP_Base

## Objetivo

Implementar a base técnica da hierarquia do Brainxly com foco em regras de negócio, segurança multi-tenant (RLS), contratos de domínio e estrutura por features para execução das próximas fases (UI de navegação e sidebar dual-tier).

## O que foi implementado

### 1) ERD inicial + fundação de banco e RLS (Supabase/Postgres)

Arquivo principal:
- `supabase/migrations/20260225113000_brainxly_hierarchy_core.sql`

Inclui:
- Tipos de domínio (`visibility_level`, `member_role`, `hierarchy_node_type`, `task_priority`, `sprint_status`, `artifact_kind`).
- Tabelas centrais da hierarquia:
  - `workspaces`, `workspace_members`, `spaces`, `projects`, `folders`, `lists`, `tasks`.
- Tabelas de sprint e template:
  - `sprint_templates`, `sprint_template_lists`, `sprint_template_tasks`, `sprints`, `automations`.
- Tabelas de permissões e compartilhamento:
  - `resource_shares`, `permission_overrides`.
- Tabela de itens complementares:
  - `artifacts` (document, dashboard, form, whiteboard) vinculados a um nó hierárquico.
- Funções e triggers de integridade:
  - `validate_task_hierarchy` (mesmo workspace/lista, anti-ciclo, limite de profundidade).
  - `validate_artifact_parent` (garante parent válido no mesmo workspace).
  - `ensure_workspace_owner_membership` (owner vira membro automaticamente).
  - `apply_sprint_template` (aplica listas/tarefas de template na criação de sprint).
- Políticas RLS por workspace para todas as entidades principais.

### 2) Seed inicial para validação local

Arquivo:
- `supabase/seed.sql`

Inclui:
- Workspace demo.
- Membros com papéis (`owner`, `admin`, `member`).
- Espaços, pasta, projeto.
- Template de sprint com listas e tarefas.
- Sprint exemplo e aplicação automática de template.

### 3) Contratos e domínio da hierarquia (feature-based)

Arquivos:
- `src/features/hierarchy/domain/types.ts`
- `src/features/hierarchy/contracts/hierarchy.contracts.ts`
- `src/features/hierarchy/contracts/hierarchy-service.contracts.ts`

Inclui:
- Tipos canônicos de nós da hierarquia, visibilidade e papéis.
- Contratos de criação/movimentação de nós.
- Matriz de parentes permitidos por tipo de nó.
- Contratos de repositório para CRUD e controle de acesso.

### 4) Estratégia de subtarefas aninhadas

Arquivos:
- `src/features/tasks/domain/task.types.ts`
- `src/features/tasks/domain/task-tree.ts`

Inclui:
- Tipos de prioridade/status.
- Regra de profundidade máxima (`MAX_TASK_DEPTH = 5`).
- Validação de vínculo com mesmo workspace/lista.
- Validação anti-ciclo.
- Cálculo de profundidade de novo pai (`computeNextDepth`).

### 5) Regras de sprint e template padrão

Arquivos:
- `src/features/sprints/domain/sprint-template.ts`
- `src/features/sprints/contracts/sprints.contracts.ts`

Inclui:
- Tipos de sprint/template e blueprints de listas/tarefas.
- Resolução de template efetivo (explícito > pasta > workspace).
- Validação de período de sprint.
- Contratos de criação/aplicação de templates.

### 6) Itens complementares (Docs, Dashboards, Forms, Whiteboards)

Arquivos:
- `src/features/docs-hub/domain/artifacts.ts`
- `src/features/docs-hub/contracts/artifacts.contracts.ts`

Inclui:
- Modelo único de `Artifact` para os quatro tipos.
- Contratos de criação/listagem por nó pai/arquivamento.
- Integração com política de visibilidade e escopo de workspace.

## Regras de negócio efetivamente aplicadas

- Isolamento total por `workspace_id`.
- Hierarquia com validação de parent-child por tipo.
- Subtarefas aninhadas limitadas e sem ciclo.
- Templates de sprint aplicados de forma padronizada.
- Acesso baseado em membership e RLS.
- Compartilhamento e overrides por recurso.

## Organização por features

A implementação foi separada por responsabilidade:
- `features/hierarchy` para estrutura e contratos principais.
- `features/tasks` para lógica de árvore de tarefas.
- `features/sprints` para ciclos ágeis e templates.
- `features/docs-hub` para itens complementares.

## Build e validação

Validação executada:
- `npm run build` concluído com sucesso.

## Critérios de aceite (DoD) desta entrega

- Migração única cobrindo entidades, índices, funções e políticas RLS da hierarquia.
- Seed funcional com cadeia mínima `Workspace -> Space -> Folder -> Project -> Sprint -> List -> Task`.
- Regras de subtarefa aninhada implementadas no SQL e espelhadas no domínio TypeScript.
- Contratos de serviço definidos por feature para orientar implementação da camada de dados.
- Itens complementares (docs/dashboards/forms/whiteboards) modelados e vinculáveis a nós válidos.
- Documentação da implementação registrada em `docs/` com data e título.

## Próximos passos recomendados

1. Implementar camada de repositório Supabase (queries reais) para os contratos criados.
2. Subir testes automatizados de integridade de hierarquia e RLS.
3. Iniciar construção da sidebar dual-tier com navegação em árvore consumindo este modelo.
