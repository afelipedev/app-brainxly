import { supabase } from "@/features/shared/lib/supabase";
import { mapArtifact } from "@/features/shared/lib/db-mappers";
import type { ArtifactsRepositoryContract } from "../contracts/artifacts.contracts";
import type { CreateArtifactLinkInput } from "../contracts/artifacts.contracts";
import type { Artifact } from "../domain/artifacts";

export class SupabaseArtifactsRepository implements ArtifactsRepositoryContract {
  async create(input: CreateArtifactLinkInput): Promise<Artifact> {
    const { data, error } = await supabase
      .from("artifacts")
      .insert({
        workspace_id: input.workspaceId,
        kind: input.kind,
        title: input.title,
        parent_type: input.parentType,
        parent_id: input.parentId,
        visibility: input.visibility ?? "workspace",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapArtifact(data as Record<string, unknown>) as Artifact;
  }

  async listByParent(input: {
    workspaceId: string;
    parentType: string;
    parentId: string;
  }): Promise<Artifact[]> {
    const { data, error } = await supabase
      .from("artifacts")
      .select("*")
      .eq("workspace_id", input.workspaceId)
      .eq("parent_type", input.parentType)
      .eq("parent_id", input.parentId)
      .is("archived_at", null)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as Record<string, unknown>[]).map((r) =>
      mapArtifact(r),
    ) as Artifact[];
  }

  async archive(artifactId: string, _workspaceId: string): Promise<void> {
    const { error } = await supabase
      .from("artifacts")
      .update({ archived_at: new Date().toISOString() })
      .eq("id", artifactId);

    if (error) throw new Error(error.message);
  }
}
