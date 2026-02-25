import type { HierarchyNodeType, VisibilityLevel } from "@/features/hierarchy/domain/types";

export const ARTIFACT_KINDS = ["document", "dashboard", "form", "whiteboard"] as const;
export type ArtifactKind = (typeof ARTIFACT_KINDS)[number];

export interface Artifact {
  id: string;
  workspaceId: string;
  kind: ArtifactKind;
  title: string;
  content: Record<string, unknown>;
  parentType: HierarchyNodeType;
  parentId: string;
  visibility: VisibilityLevel;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
}

export interface CreateArtifactInput {
  workspaceId: string;
  kind: ArtifactKind;
  title: string;
  parentType: HierarchyNodeType;
  parentId: string;
  visibility?: VisibilityLevel;
}
