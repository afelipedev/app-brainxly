-- Seed base para validar a hierarquia Brainxly localmente.
-- IDs fixos para facilitar cenários de teste e debug.

insert into workspaces (id, name, slug, owner_user_id)
values (
  '11111111-1111-1111-1111-111111111111',
  'Brainxly Workspace Demo',
  'brainxly-demo',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
)
on conflict (id) do nothing;

insert into workspace_members (workspace_id, user_id, role)
values
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'owner'),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'admin'),
  ('11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'member')
on conflict (workspace_id, user_id) do nothing;

insert into spaces (id, workspace_id, name, description, created_by)
values
  (
    '22222222-2222-2222-2222-222222222221',
    '11111111-1111-1111-1111-111111111111',
    'Produto',
    'Fluxo de produto e desenvolvimento.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Operações',
    'Fluxo operacional e financeiro.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  )
on conflict (id) do nothing;

insert into folders (id, workspace_id, space_id, name, description, created_by)
values (
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  'Sprint Folder',
  'Pasta dedicada ao ciclo de sprint.',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
)
on conflict (id) do nothing;

insert into projects (id, workspace_id, folder_id, name, description, created_by)
values (
  '44444444-4444-4444-4444-444444444441',
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333331',
  'Projeto Brainxly Core',
  'Escopo inicial do segundo cérebro da plataforma.',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
)
on conflict (id) do nothing;

insert into sprint_templates (
  id,
  workspace_id,
  name,
  scope,
  folder_id,
  is_default,
  created_by
)
values (
  '55555555-5555-5555-5555-555555555551',
  '11111111-1111-1111-1111-111111111111',
  'Template Sprint Scrum',
  'folder',
  '33333333-3333-3333-3333-333333333331',
  true,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
)
on conflict (id) do nothing;

insert into sprint_template_lists (id, sprint_template_id, name, position)
values
  ('66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555551', 'Planning', 10),
  ('66666666-6666-6666-6666-666666666662', '55555555-5555-5555-5555-555555555551', 'Execution', 20),
  ('66666666-6666-6666-6666-666666666663', '55555555-5555-5555-5555-555555555551', 'Retrospective', 30)
on conflict (id) do nothing;

insert into sprint_template_tasks (
  sprint_template_list_id,
  title,
  description,
  priority,
  position
)
values
  (
    '66666666-6666-6666-6666-666666666661',
    'Planejar sprint',
    'Definir metas, capacidade e escopo.',
    'high',
    10
  ),
  (
    '66666666-6666-6666-6666-666666666663',
    'Retrospectiva',
    'Registrar aprendizados e ações de melhoria.',
    'medium',
    10
  )
on conflict do nothing;

insert into sprints (
  id,
  workspace_id,
  folder_id,
  name,
  goal,
  status,
  start_date,
  end_date,
  template_id,
  created_by
)
values (
  '77777777-7777-7777-7777-777777777771',
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333331',
  'Sprint 01',
  'Entrega do núcleo da hierarquia.',
  'planned',
  current_date,
  current_date + interval '14 days',
  '55555555-5555-5555-5555-555555555551',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
)
on conflict (id) do nothing;

select apply_sprint_template('77777777-7777-7777-7777-777777777771');
