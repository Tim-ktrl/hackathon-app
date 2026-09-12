import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optional compatibility setting for environments that restrict child processes.
  experimental: process.env.NEXT_BUILD_WORKER_THREADS === "1"
    ? { workerThreads: true, useTypeScriptCli: false }
    : {},
};

export default nextConfig;
