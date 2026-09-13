# Codebase X-Ray

Codebase X-Ray is an interactive developer tool that helps programmers quickly understand unfamiliar JavaScript and TypeScript codebases.

Instead of manually opening dozens of files and tracing imports by hand, Codebase X-Ray analyzes a repository and generates an interactive dependency map showing how files are connected and how the project is structured.

## Why Codebase X-Ray?

Joining a new project, contributing to open source, or working with a large unfamiliar repository often begins with the same problem:

**Where do I start?**

Understanding how files, components, API routes, utilities, and services connect can take a significant amount of time.

Codebase X-Ray provides a visual overview of the repository so developers can build a mental model of the project before diving deeply into the source code.

## Features

- Upload a JavaScript or TypeScript project as a ZIP file
- Automatically scan `.js`, `.jsx`, `.ts`, and `.tsx` source files
- Parse source code using Abstract Syntax Trees (ASTs)
- Detect internal imports and file relationships
- Support relative imports such as `./component` and `../utils/helper`
- Support common `@/` TypeScript and Next.js import aliases
- Generate an interactive dependency graph
- Classify files into categories such as:
  - Components
  - Pages
  - API routes
  - Services
  - Models
  - Hooks
  - Utilities
  - Tests
  - Configuration files
- Display repository statistics such as file and dependency counts
- Click files in the graph to explore their relationships
- Identify which files a selected file depends on
- Identify which files depend on the selected file

## How It Works

Codebase X-Ray performs static analysis on the uploaded repository.

```text
Repository ZIP
      |
      v
Extract Source Files
      |
      v
Parse JavaScript / TypeScript
      |
      v
Generate Abstract Syntax Trees
      |
      v
Detect Imports and Code Structure
      |
      v
Build Dependency Graph
      |
      v
Interactive Codebase X-Ray
```

The project does not rely on an LLM to determine the repository structure. Relationships are discovered directly from the source code using static analysis.

Example

If a project contains:

import Dashboard from "@/components/Dashboard";

and Dashboard.tsx contains:

import UserCard from "./UserCard";

Codebase X-Ray can reconstruct the relationship:

page.tsx
|
v
Dashboard.tsx
|
v
UserCard.tsx

The result is displayed as an interactive graph that developers can explore.

## Tech Stack

Next.js
TypeScript
Tailwind CSS
React Flow / XYFlow
Babel Parser
Babel Traverse
JSZip
Project Architecture
src/
├── app/
│ ├── api/
│ │ └── analyze/
│ │ └── route.ts
│ ├── globals.css
│ └── page.tsx
│
├── components/
│ ├── AnalyzerWorkspace.tsx
│ ├── CodeGraph.tsx
│ ├── NodeInspector.tsx
│ └── RepoUpload.tsx
│
└── lib/
└── analyzer/
├── analyzeFile.ts
├── classifyFile.ts
├── resolveImport.ts
└── types.ts

The analyzer logic is intentionally separated from the UI.

lib/analyzer is responsible for understanding source code, while the React components are responsible for displaying the results.

## Getting Started

1. Clone the repository
   git clone https://github.com/Tim-ktrl/hackathon-app.git
2. Enter the project
   cd hackathon-app
3. Install dependencies
   npm install
4. Start the development server
   npm run dev

Open:

http://localhost:3000

in your browser.

Using Codebase X-Ray

Export or download a JavaScript or TypeScript repository as a ZIP file.

Open Codebase X-Ray and select the ZIP file.

Click Analyze Codebase.

The application will scan the source files and generate a dependency graph.

Click nodes in the graph to explore files and their relationships.
