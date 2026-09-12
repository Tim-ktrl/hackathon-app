"use client";

import { useState } from "react";

import CodeGraph from "./CodeGraph";
import RepoUpload from "./RepoUpload";

import type { AnalysisResult } from "@/lib/analyzer/types";

export default function AnalyzerWorkspace() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const categoryCounts = analysis?.nodes.reduce<Record<string, number>>(
    (counts, node) => {
      counts[node.category] = (counts[node.category] ?? 0) + 1;

      return counts;
    },
    {},
  );

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Codebase X-Ray</h1>

          <p className="mt-2 text-gray-500">
            Understand an unfamiliar codebase.
          </p>
        </div>

        <RepoUpload onAnalyzed={setAnalysis} />

        {analysis && (
          <>
            <div className="flex gap-6">
              {categoryCounts &&
                Object.entries(categoryCounts).map(([category, count]) => (
                  <div key={category}>
                    <p className="text-sm capitalize text-gray-500">
                      {category}
                    </p>

                    <p className="text-2xl font-semibold">{count}</p>
                  </div>
                ))}
              <div>
                <p className="text-sm text-gray-500">Files analyzed</p>

                <p className="text-2xl font-semibold">
                  {analysis.files.length}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Relationships</p>

                <p className="text-2xl font-semibold">
                  {analysis.edges.length}
                </p>
              </div>
            </div>

            <CodeGraph analysis={analysis} />
          </>
        )}
      </div>
    </main>
  );
}
