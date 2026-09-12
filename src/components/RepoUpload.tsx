"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/analyzer/types";

type RepoUploadProps = {
  onAnalyzed: (result: AnalysisResult) => void;
};

export default function RepoUpload({ onAnalyzed }: RepoUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!file) {
      setError("Choose a ZIP file first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      onAnalyzed(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Analyze Repository</h2>

      <input
        type="file"
        accept=".zip"
        onChange={(event) => {
          const selectedFile = event.target.files?.[0];

          setFile(selectedFile ?? null);
        }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Codebase"}
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
