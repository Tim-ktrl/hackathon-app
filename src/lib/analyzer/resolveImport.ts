import path from "path";

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

function findCandidate(
  basePath: string,
  allFiles: Set<string>
): string | null {
  const candidates = [
    basePath,
    ...EXTENSIONS.map((ext) => `${basePath}${ext}`),
    ...EXTENSIONS.map((ext) => `${basePath}/index${ext}`),
  ];

  for (const candidate of candidates) {
    if (allFiles.has(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function resolveImport(
  fromFile: string,
  importPath: string,
  allFiles: Set<string>
): string | null {
  // Relative import:
  // ./Component
  // ../lib/helper

  if (importPath.startsWith(".")) {
    const directory = path.posix.dirname(fromFile);

    const basePath = path.posix.normalize(
      path.posix.join(directory, importPath)
    );

    return findCandidate(basePath, allFiles);
  }

  // Next.js / TypeScript alias:
  // @/components/Navbar

  if (importPath.startsWith("@/")) {
    const aliasPath = importPath.slice(2);

    for (const filePath of allFiles) {
      const normalized = filePath.replaceAll("\\", "/");

      for (const extension of EXTENSIONS) {
        if (
          normalized.endsWith(
            `/src/${aliasPath}${extension}`
          ) ||
          normalized.endsWith(
            `/src/${aliasPath}/index${extension}`
          ) ||
          normalized === `src/${aliasPath}${extension}` ||
          normalized === `src/${aliasPath}/index${extension}`
        ) {
          return filePath;
        }
      }
    }
  }

  // External packages like:
  // react
  // next
  // express
  // @supabase/supabase-js

  return null;
}