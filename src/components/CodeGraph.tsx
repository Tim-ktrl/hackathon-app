"use client";

import { useState } from "react";

import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import NodeInspector from "./NodeInspector";

import type { AnalysisResult } from "@/lib/analyzer/types";

type CodeGraphProps = {
  analysis: AnalysisResult;
};

export default function CodeGraph({ analysis }: CodeGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const nodes: Node[] = analysis.nodes.map((node, index) => ({
    id: node.id,

    data: {
      label: `${node.label} (${node.category})`,
    },

    position: {
      x: (index % 4) * 250,
      y: Math.floor(index / 4) * 150,
    },
  }));

  const edges: Edge[] = analysis.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  return (
    <div className="flex h-[650px] overflow-hidden rounded-xl border">
      <div className="min-w-0 flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeClick={(_, node) => {
            setSelectedNodeId(node.id);
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {selectedNodeId && (
        <NodeInspector
          nodeId={selectedNodeId}
          analysis={analysis}
          onClose={() => setSelectedNodeId(null)}
          onSelectNode={setSelectedNodeId}
        />
      )}
    </div>
  );
}
