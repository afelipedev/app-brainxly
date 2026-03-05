import {
  EQUIPES_CRIAR_ITEMS,
  EQUIPES_MOCK_TEAMS,
} from "@/features/sidebar/data/sidebar.data";
import { IconPicker } from "@/features/sidebar/components/IconPicker";
import { useSidebar } from "@/features/sidebar/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronsLeft, Plus, Users, UserRound } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { useRef, useState } from "react";

interface Team {
  id: string;
  label: string;
  iconId: string;
}

const USERS_COUNT_INITIAL = 1;

function avatarColorClass(label: string) {
  const palette = [
    "bg-blue-500 text-white",
    "bg-violet-500 text-white",
    "bg-emerald-500 text-white",
    "bg-rose-500 text-white",
    "bg-amber-500 text-white",
  ];
  return palette[label.length % palette.length];
}

export function EquipesSecondaryContent() {
  const { setSecondaryOpen } = useSidebar();
  const [isPlusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [createTeamForm, setCreateTeamForm] = useState({
    name: "",
    description: "",
    iconId: "users",
  });
  const [teams, setTeams] = useState<Team[]>(
    EQUIPES_MOCK_TEAMS.map((t) => ({ ...t, iconId: t.iconId }))
  );
  const teamsCount = teams.length;
  const [usersCount] = useState(USERS_COUNT_INITIAL);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(
    EQUIPES_MOCK_TEAMS[0]?.id ?? null
  );
  const plusDropdownRef = useRef<HTMLDivElement>(null);

  function handleCriarEquipe() {
    setPlusDropdownOpen(false);
    setIsCreateTeamModalOpen(true);
  }

  function handleCreateTeamSubmit() {
    if (!createTeamForm.name.trim()) return;
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      label: createTeamForm.name.trim(),
      iconId: createTeamForm.iconId,
    };
    setTeams((current) => [...current, newTeam]);
    setIsCreateTeamModalOpen(false);
    setCreateTeamForm({ name: "", description: "", iconId: "users" });
  }

  return (
    <>
      {/* Header: Título Equipes + collapse (hover) + dropdown + */}
      <div className="relative border-b border-sidebar-border p-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Equipes</h2>

          <div className="group/header flex items-center gap-0.5">
            {/* Botão colapsar - visível apenas em hover */}
            <div className="flex items-center opacity-0 transition-opacity group-hover/header:opacity-100">
              <button
                type="button"
                title="Colapsar sidebar secundária"
                onClick={() => setSecondaryOpen(false)}
                className="rounded-md p-1.5 hover:bg-sidebar-accent"
              >
                <ChevronsLeft className="size-4" />
              </button>
            </div>

            {/* Dropdown + */}
            <div className="relative" ref={plusDropdownRef}>
              <button
                type="button"
                title="Criar equipe"
                onClick={() => setPlusDropdownOpen((v) => !v)}
                className="flex items-center gap-0.5 rounded-md border border-sidebar-border p-1.5 hover:bg-sidebar-accent"
              >
                <Plus className="size-4" />
                <ChevronDown className="size-3" />
              </button>

              {isPlusDropdownOpen ? (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    aria-hidden
                    onClick={() => setPlusDropdownOpen(false)}
                  />
                  <div
                    className="absolute right-0 top-full z-20 mt-1 min-w-52 rounded-lg border border-sidebar-border bg-popover p-1 shadow-lg"
                  >
                    {/* a. Criar Equipe */}
                    <div className="border-b border-sidebar-border px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Criar
                    </div>
                    {EQUIPES_CRIAR_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={handleCriarEquipe}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                      >
                        {item.label}
                      </button>
                    ))}

                    {/* b. Todas as Equipes */}
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="size-4 shrink-0 text-muted-foreground" />
                        <span>Todas as equipes</span>
                      </span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {teamsCount}
                      </span>
                    </button>

                    {/* c. Todas as Pessoas */}
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                    >
                      <span className="flex items-center gap-2">
                        <UserRound className="size-4 shrink-0 text-muted-foreground" />
                        <span>Todas as pessoas</span>
                      </span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {usersCount}
                      </span>
                    </button>

                    {/* d. Divider */}
                    <div className="my-1 h-px bg-sidebar-border" />

                    {/* e. Minhas equipes */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Minhas equipes
                    </div>
                    {teams.map((team) => (
                      <button
                        key={team.id}
                        type="button"
                        onClick={() => setPlusDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
                      >
                        <span
                          className={cn(
                            "inline-flex size-6 shrink-0 items-center justify-center rounded-full",
                            avatarColorClass(team.label)
                          )}
                        >
                          <DynamicIcon
                            name={team.iconId as IconName}
                            className="size-3.5 text-white"
                          />
                        </span>
                        <span className="truncate">{team.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal da sidebar */}
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {/* b. Todas as equipes */}
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
        >
          <span className="flex items-center gap-2">
            <Users className="size-4 shrink-0 text-muted-foreground" />
            <span>Todas as equipes</span>
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {teamsCount}
          </span>
        </button>

        {/* c. Todas as pessoas */}
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent"
        >
          <span className="flex items-center gap-2">
            <UserRound className="size-4 shrink-0 text-muted-foreground" />
            <span>Todas as pessoas</span>
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {usersCount}
          </span>
        </button>

        {/* d. Divider */}
        <div className="h-px bg-sidebar-border" />

        {/* e. Minhas equipes */}
        <div className="space-y-1">
          <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Minhas equipes
          </h3>
          <ul className="space-y-0.5">
            {teams.map((team) => (
              <li key={team.id}>
                <button
                  type="button"
                  onClick={() => setActiveTeamId(team.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                    activeTeamId === team.id
                      ? "bg-sidebar-accent"
                      : "hover:bg-sidebar-accent"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-6 shrink-0 items-center justify-center rounded-full",
                      avatarColorClass(team.label)
                    )}
                  >
                    <DynamicIcon
                      name={team.iconId as IconName}
                      className="size-3.5 text-white"
                    />
                  </span>
                  <span className="truncate">{team.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Criar nova equipe */}
      {isCreateTeamModalOpen ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-4"
          onClick={() => setIsCreateTeamModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-sidebar-border bg-popover p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="mb-4 text-base font-semibold">Criar nova equipe</h4>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="team-name"
                  className="mb-1 block text-sm font-medium text-muted-foreground"
                >
                  Nome da Equipe
                </label>
                <input
                  id="team-name"
                  type="text"
                  value={createTeamForm.name}
                  onChange={(e) =>
                    setCreateTeamForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Ex: Desenvolvimento"
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="team-description"
                  className="mb-1 block text-sm font-medium text-muted-foreground"
                >
                  Descrição
                </label>
                <input
                  id="team-description"
                  type="text"
                  value={createTeamForm.description}
                  onChange={(e) =>
                    setCreateTeamForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descrição opcional"
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Ícone
                </label>
                <IconPicker
                  value={createTeamForm.iconId}
                  onChange={(iconId) =>
                    setCreateTeamForm((prev) => ({ ...prev, iconId }))
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateTeamModalOpen(false)}
                className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-sidebar-accent"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateTeamSubmit}
                disabled={!createTeamForm.name.trim()}
                className="rounded-md bg-sidebar-primary px-3 py-1.5 text-sm text-sidebar-primary-foreground disabled:opacity-50"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
