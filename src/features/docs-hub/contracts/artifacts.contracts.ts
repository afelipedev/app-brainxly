import type { Artifact, ArtifactKind } from "../domain/artifacts";
import type { HierarchyNodeType, VisibilityLevel } from "@/features/hierarchy/domain/types";

export interface CreateArtifactLinkInput {
  workspaceId: string;
  kind: ArtifactKind;
  title: string;
  parentType: HierarchyNodeType;
  parentId: string;
  visibility?: VisibilityLevel;
}

export interface ArtifactsRepositoryContract {
  create(input: CreateArtifactLinkInput): Promise<Artifact>;
  listByParent(input: {
    workspaceId: string;
    parentType: HierarchyNodeType;
    parentId: string;
  }): Promise<Artifact[]>;
  archive(artifactId: string, workspaceId: string): Promise<void>;
}
