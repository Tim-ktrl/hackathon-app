export type FileCategory =
  | "component"
  | "page"
  | "api"
  | "service"
  | "model"
  | "hook"
  | "utility"
  | "test"
  | "config"
  | "unknown";

export function classifyFile(
  filePath: string
): FileCategory {
  const path = filePath.toLowerCase();

  // Tests
  if (
    path.includes(".test.") ||
    path.includes(".spec.") ||
    path.includes("/tests/") ||
    path.includes("/__tests__/")
  ) {
    return "test";
  }

  // Next.js API routes
  if (
    path.includes("/api/") &&
    path.endsWith("/route.ts")
  ) {
    return "api";
  }

  if (
    path.includes("/api/") &&
    path.endsWith("/route.js")
  ) {
    return "api";
  }

  // Pages
  if (
    path.endsWith("/page.tsx") ||
    path.endsWith("/page.jsx")
  ) {
    return "page";
  }

  // React components
  if (
    path.includes("/components/") ||
    path.includes("/component/")
  ) {
    return "component";
  }

  // Hooks
  if (
    path.includes("/hooks/") ||
    path.split("/").pop()?.startsWith("use")
  ) {
    return "hook";
  }

  // Services
  if (
    path.includes("/services/") ||
    path.includes("/service/") ||
    path.includes("service.ts") ||
    path.includes("service.js")
  ) {
    return "service";
  }

  // Database / models
  if (
    path.includes("/models/") ||
    path.includes("/model/") ||
    path.includes("/database/") ||
    path.includes("/db/")
  ) {
    return "model";
  }

  // Utilities
  if (
    path.includes("/utils/") ||
    path.includes("/utilities/") ||
    path.includes("/helpers/") ||
    path.includes("/lib/")
  ) {
    return "utility";
  }

  // Config
  if (
    path.includes("config") ||
    path.endsWith("next.config.ts") ||
    path.endsWith("next.config.js")
  ) {
    return "config";
  }

  return "unknown";
}