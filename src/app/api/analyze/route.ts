import { NextResponse } from "next/server";
import JSZip from "jszip";

import { analyzeFile } from "@/lib/analyzer/analyzeFile";
import { resolveImport } from "@/lib/analyzer/resolveImport";

import { classifyFile } from "@/lib/analyzer/classifyFile";

export const runtime = "nodejs";

const VALID_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

function shouldAnalyze(path: string) {
  const lower = path.toLowerCase();

  if (
    lower.includes("node_modules/") ||
    lower.includes(".next/") ||
    lower.includes("dist/") ||
    lower.includes("build/")
  ) {
    return false;
  }

  return VALID_EXTENSIONS.some((extension) =>
    lower.endsWith(extension)
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const uploadedFile = formData.get("file");

    if (!(uploadedFile instanceof File)) {
      return NextResponse.json(
        {
          error: "No repository ZIP was provided.",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = await uploadedFile.arrayBuffer();

    const zip = await JSZip.loadAsync(buffer);

    const sourceFiles: {
      path: string;
      content: string;
    }[] = [];

    for (const [filePath, zipEntry] of Object.entries(zip.files)) {
      if (zipEntry.dir) {
        continue;
      }

      if (!shouldAnalyze(filePath)) {
        continue;
      }

      const content = await zipEntry.async("text");

      sourceFiles.push({
        path: filePath,
        content,
      });
    }

    const filePaths = new Set(
      sourceFiles.map((file) => file.path)
    );

    const analyzedFiles = sourceFiles.map((file) =>
      analyzeFile(file.path, file.content)
    );

    const nodes = analyzedFiles.map((file) => ({
  id: file.path,
  label: file.path.split("/").pop() ?? file.path,
  path: file.path,
  category: classifyFile(file.path),
}));

    const edges = [];

    for (const file of analyzedFiles) {
      for (const importedPath of file.imports) {
        const resolved = resolveImport(
          file.path,
          importedPath,
          filePaths
        );

        if (!resolved) {
          continue;
        }

        edges.push({
          id: `${file.path}->${resolved}`,
          source: file.path,
          target: resolved,
        });
      }
    }

    return NextResponse.json({
      files: analyzedFiles,
      nodes,
      edges,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to analyze repository.",
      },
      {
        status: 500,
      }
    );
  }
}