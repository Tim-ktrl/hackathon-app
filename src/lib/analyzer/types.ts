import type { FileCategory } from "./classifyFile";

export type AnalyzedFile = {
  path: string;

  imports: string[];
  internalImports: string[];
  externalImports: string[];

  functions: string[];
  components: string[];
  classes: string[];

  exports: string[];

  apiRoutes: string[];
};

export type GraphNode = {
  id: string;
  label: string;
  path: string;
  category: FileCategory;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
};

export type AnalysisResult = {
  files: AnalyzedFile[];
  nodes: GraphNode[];
  edges: GraphEdge[];
};