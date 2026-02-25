create extension if not exists pgcrypto;

do $$
begin
  create type visibility_level as enum ('private', 'workspace', 'shared');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type member_role as enum ('owner', 'admin', 'member', 'guest');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type hierarchy_node_type as enum (
    'workspace',
    'space',
    'project',
    'folder',
    'list',
    'task',
    'sprint'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type task_priority as enum ('low', 'medium', 'high', 'urgent');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type sprint_status as enum ('planned', 'active', 'completed', 'cancelled');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type artifact_kind as enum ('document', 'dashboard', 'form', 'whiteboard');
exception
  when duplicate_object then null;
end $$;

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function is_workspace_member(p_workspace_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
  );
$$;

create or replace function has_workspace_role(p_workspace_id uuid, p_roles member_role[])
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
      and wm.role = any (p_roles)
  );
$$;

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_user_id uuid not null,
  visibility visibility_level not null default 'workspace',
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table if not exists workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null,
  role member_role not null default 'member',
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create table if not exists spaces (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  description text,
  visibility visibility_level not null default 'workspace',
  position integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (workspace_id, name)
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  space_id uuid references spaces(id) on delete cascade,
  folder_id uuid,
  name text not null,
  description text,
  docs_hub_enabled boolean not null default true,
  visibility visibility_level not null default 'workspace',
  position integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  check (((space_id is not null)::int + (folder_id is not null)::int) = 1)
);

create table if not exists folders (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  space_id uuid references spaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  description text,
  docs_hub_enabled boolean not null default true,
  visibility visibility_level not null default 'workspace',
  position integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  check (((space_id is not null)::int + (project_id is not null)::int) = 1)
);

alter table projects
  add constraint projects_folder_id_fkey
  foreign key (folder_id) references folders(id) on delete cascade;

create table if not exists sprint_templates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  scope text not null check (scope in ('workspace', 'folder')),
  folder_id uuid references folders(id) on delete cascade,
  is_default boolean not null default false,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (scope = 'workspace' and folder_id is null)
    or (scope = 'folder' and folder_id is not null)
  )
);

create unique index if not exists sprint_templates_default_workspace_idx
  on sprint_templates (workspace_id)
  where is_default = true and scope = 'workspace';

create unique index if not exists sprint_templates_default_folder_idx
  on sprint_templates (folder_id)
  where is_default = true and scope = 'folder';

create table if not exists sprints (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  folder_id uuid references folders(id) on delete set null,
  space_id uuid references spaces(id) on delete set null,
  name text not null,
  goal text,
  status sprint_status not null default 'planned',
  start_date date not null,
  end_date date not null,
  template_id uuid references sprint_templates(id) on delete set null,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists lists (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  space_id uuid references spaces(id) on delete cascade,
  folder_id uuid references folders(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  sprint_id uuid references sprints(id) on delete cascade,
  name text not null,
  description text,
  visibility visibility_level not null default 'workspace',
  position integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  check (((space_id is not null)::int + (folder_id is not null)::int + (project_id is not null)::int + (sprint_id is not null)::int) = 1)
);

create table if not exists sprint_template_lists (
  id uuid primary key default gen_random_uuid(),
  sprint_template_id uuid not null references sprint_templates(id) on delete cascade,
  name text not null,
  description text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists sprint_template_tasks (
  id uuid primary key default gen_random_uuid(),
  sprint_template_list_id uuid not null references sprint_template_lists(id) on delete cascade,
  title text not null,
  description text,
  checklist jsonb not null default '[]'::jsonb,
  priority task_priority not null default 'medium',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  list_id uuid not null references lists(id) on delete cascade,
  parent_task_id uuid references tasks(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'todo',
  priority task_priority not null default 'medium',
  assignee_user_id uuid,
  due_at timestamptz,
  depth integer not null default 0 check (depth >= 0 and depth <= 5),
  position integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table if not exists resource_shares (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  resource_type hierarchy_node_type not null,
  resource_id uuid not null,
  target_user_id uuid not null,
  permissions jsonb not null default '[]'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (workspace_id, resource_type, resource_id, target_user_id)
);

create table if not exists permission_overrides (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  resource_type hierarchy_node_type not null,
  resource_id uuid not null,
  target_role member_role,
  target_user_id uuid,
  actions jsonb not null default '[]'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now(),
  check (target_role is not null or target_user_id is not null)
);

create table if not exists artifacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  kind artifact_kind not null,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  parent_type hierarchy_node_type not null,
  parent_id uuid not null,
  visibility visibility_level not null default 'workspace',
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table if not exists automations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  sprint_template_id uuid references sprint_templates(id) on delete cascade,
  name text not null,
  trigger_config jsonb not null default '{}'::jsonb,
  action_config jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function validate_artifact_parent()
returns trigger
language plpgsql
as $$
declare
  v_exists boolean := false;
begin
  case new.parent_type
    when 'workspace' then
      select exists (
        select 1
        from workspaces w
        where w.id = new.parent_id
          and w.id = new.workspace_id
      ) into v_exists;
    when 'space' then
      select exists (
        select 1
        from spaces s
        where s.id = new.parent_id
          and s.workspace_id = new.workspace_id
      ) into v_exists;
    when 'project' then
      select exists (
        select 1
        from projects p
        where p.id = new.parent_id
          and p.workspace_id = new.workspace_id
      ) into v_exists;
    when 'folder' then
      select exists (
        select 1
        from folders f
        where f.id = new.parent_id
          and f.workspace_id = new.workspace_id
      ) into v_exists;
    when 'list' then
      select exists (
        select 1
        from lists l
        where l.id = new.parent_id
          and l.workspace_id = new.workspace_id
      ) into v_exists;
    when 'task' then
      select exists (
        select 1
        from tasks t
        where t.id = new.parent_id
          and t.workspace_id = new.workspace_id
      ) into v_exists;
    when 'sprint' then
      select exists (
        select 1
        from sprints s
        where s.id = new.parent_id
          and s.workspace_id = new.workspace_id
      ) into v_exists;
  end case;

  if not v_exists then
    raise exception 'invalid artifact parent: % (%)', new.parent_type, new.parent_id;
  end if;

  return new;
end;
$$;

create or replace function validate_task_hierarchy()
returns trigger
language plpgsql
as $$
declare
  v_parent_list_id uuid;
  v_parent_workspace_id uuid;
  v_parent_depth integer;
begin
  if new.parent_task_id is null then
    new.depth = 0;
    return new;
  end if;

  select t.list_id, t.workspace_id, t.depth
    into v_parent_list_id, v_parent_workspace_id, v_parent_depth
  from tasks t
  where t.id = new.parent_task_id;

  if v_parent_list_id is null then
    raise exception 'parent task % not found', new.parent_task_id;
  end if;

  if v_parent_workspace_id <> new.workspace_id then
    raise exception 'parent task must belong to the same workspace';
  end if;

  if v_parent_list_id <> new.list_id then
    raise exception 'nested tasks must remain in the same list';
  end if;

  if v_parent_depth + 1 > 5 then
    raise exception 'maximum task nesting depth exceeded (max=5)';
  end if;

  if tg_op = 'UPDATE' and old.parent_task_id is distinct from new.parent_task_id then
    if exists (
      with recursive descendants as (
        select id, parent_task_id
        from tasks
        where parent_task_id = old.id
        union all
        select t.id, t.parent_task_id
        from tasks t
        inner join descendants d on d.id = t.parent_task_id
      )
      select 1 from descendants
    ) then
      raise exception 'reparenting tasks with descendants is blocked to avoid depth inconsistencies';
    end if;
  end if;

  if new.id is not null then
    if exists (
      with recursive ancestors as (
        select id, parent_task_id
        from tasks
        where id = new.parent_task_id
        union all
        select t.id, t.parent_task_id
        from tasks t
        inner join ancestors a on a.parent_task_id = t.id
      )
      select 1
      from ancestors
      where id = new.id
    ) then
      raise exception 'cycle detected in task hierarchy';
    end if;
  end if;

  new.depth = v_parent_depth + 1;
  return new;
end;
$$;

create or replace function ensure_workspace_owner_membership()
returns trigger
language plpgsql
as $$
begin
  insert into workspace_members (workspace_id, user_id, role)
  values (new.id, new.owner_user_id, 'owner')
  on conflict (workspace_id, user_id) do update
    set role = 'owner';

  return new;
end;
$$;

create or replace function apply_sprint_template(p_sprint_id uuid)
returns void
language plpgsql
as $$
declare
  v_sprint record;
  v_template_list record;
  v_new_list_id uuid;
begin
  select s.id, s.workspace_id, s.template_id
    into v_sprint
  from sprints s
  where s.id = p_sprint_id;

  if v_sprint.id is null then
    raise exception 'sprint % not found', p_sprint_id;
  end if;

  if v_sprint.template_id is null then
    return;
  end if;

  for v_template_list in
    select stl.id, stl.name, stl.description, stl.position
    from sprint_template_lists stl
    where stl.sprint_template_id = v_sprint.template_id
    order by stl.position asc, stl.created_at asc
  loop
    insert into lists (
      workspace_id,
      sprint_id,
      name,
      description,
      position,
      created_by
    )
    values (
      v_sprint.workspace_id,
      v_sprint.id,
      v_template_list.name,
      v_template_list.description,
      v_template_list.position,
      auth.uid()
    )
    returning id into v_new_list_id;

    insert into tasks (
      workspace_id,
      list_id,
      title,
      description,
      priority,
      position,
      created_by
    )
    select
      v_sprint.workspace_id,
      v_new_list_id,
      stt.title,
      stt.description,
      stt.priority,
      stt.position,
      auth.uid()
    from sprint_template_tasks stt
    where stt.sprint_template_list_id = v_template_list.id
    order by stt.position asc, stt.created_at asc;
  end loop;
end;
$$;

create trigger trg_workspaces_set_updated_at
before update on workspaces
for each row execute function set_updated_at();

create trigger trg_spaces_set_updated_at
before update on spaces
for each row execute function set_updated_at();

create trigger trg_projects_set_updated_at
before update on projects
for each row execute function set_updated_at();

create trigger trg_folders_set_updated_at
before update on folders
for each row execute function set_updated_at();

create trigger trg_sprints_set_updated_at
before update on sprints
for each row execute function set_updated_at();

create trigger trg_lists_set_updated_at
before update on lists
for each row execute function set_updated_at();

create trigger trg_tasks_set_updated_at
before update on tasks
for each row execute function set_updated_at();

create trigger trg_sprint_templates_set_updated_at
before update on sprint_templates
for each row execute function set_updated_at();

create trigger trg_artifacts_set_updated_at
before update on artifacts
for each row execute function set_updated_at();

create trigger trg_automations_set_updated_at
before update on automations
for each row execute function set_updated_at();

create trigger trg_tasks_validate_hierarchy
before insert or update on tasks
for each row execute function validate_task_hierarchy();

create trigger trg_artifacts_validate_parent
before insert or update on artifacts
for each row execute function validate_artifact_parent();

create trigger trg_workspace_owner_membership
after insert on workspaces
for each row execute function ensure_workspace_owner_membership();

create index if not exists idx_workspace_members_workspace_user
  on workspace_members (workspace_id, user_id);

create index if not exists idx_spaces_workspace
  on spaces (workspace_id, position);

create index if not exists idx_projects_workspace
  on projects (workspace_id, position);

create index if not exists idx_folders_workspace
  on folders (workspace_id, position);

create index if not exists idx_lists_workspace
  on lists (workspace_id, position);

create index if not exists idx_tasks_list_parent
  on tasks (list_id, parent_task_id, position);

create index if not exists idx_tasks_workspace_depth
  on tasks (workspace_id, depth);

create index if not exists idx_sprints_workspace_dates
  on sprints (workspace_id, start_date, end_date);

create index if not exists idx_artifacts_workspace_parent
  on artifacts (workspace_id, parent_type, parent_id);

alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table spaces enable row level security;
alter table projects enable row level security;
alter table folders enable row level security;
alter table sprint_templates enable row level security;
alter table sprints enable row level security;
alter table lists enable row level security;
alter table sprint_template_lists enable row level security;
alter table sprint_template_tasks enable row level security;
alter table tasks enable row level security;
alter table resource_shares enable row level security;
alter table permission_overrides enable row level security;
alter table artifacts enable row level security;
alter table automations enable row level security;

create policy "workspace_read_members"
  on workspaces
  for select
  using (is_workspace_member(id));

create policy "workspace_create_owner"
  on workspaces
  for insert
  with check (owner_user_id = auth.uid());

create policy "workspace_update_admins"
  on workspaces
  for update
  using (has_workspace_role(id, array['owner', 'admin']::member_role[]))
  with check (has_workspace_role(id, array['owner', 'admin']::member_role[]));

create policy "workspace_members_read"
  on workspace_members
  for select
  using (is_workspace_member(workspace_id));

create policy "workspace_members_manage"
  on workspace_members
  for all
  using (has_workspace_role(workspace_id, array['owner', 'admin']::member_role[]))
  with check (has_workspace_role(workspace_id, array['owner', 'admin']::member_role[]));

create policy "spaces_member_access"
  on spaces
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "projects_member_access"
  on projects
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "folders_member_access"
  on folders
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "sprint_templates_member_access"
  on sprint_templates
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "sprints_member_access"
  on sprints
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "lists_member_access"
  on lists
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "tasks_member_access"
  on tasks
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "resource_shares_member_access"
  on resource_shares
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "permission_overrides_member_access"
  on permission_overrides
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "artifacts_member_access"
  on artifacts
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "automations_member_access"
  on automations
  for all
  using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

create policy "sprint_template_lists_member_access"
  on sprint_template_lists
  for all
  using (
    exists (
      select 1
      from sprint_templates st
      where st.id = sprint_template_lists.sprint_template_id
        and is_workspace_member(st.workspace_id)
    )
  )
  with check (
    exists (
      select 1
      from sprint_templates st
      where st.id = sprint_template_lists.sprint_template_id
        and is_workspace_member(st.workspace_id)
    )
  );

create policy "sprint_template_tasks_member_access"
  on sprint_template_tasks
  for all
  using (
    exists (
      select 1
      from sprint_template_lists stl
      inner join sprint_templates st on st.id = stl.sprint_template_id
      where stl.id = sprint_template_tasks.sprint_template_list_id
        and is_workspace_member(st.workspace_id)
    )
  )
  with check (
    exists (
      select 1
      from sprint_template_lists stl
      inner join sprint_templates st on st.id = stl.sprint_template_id
      where stl.id = sprint_template_tasks.sprint_template_list_id
        and is_workspace_member(st.workspace_id)
    )
  );
