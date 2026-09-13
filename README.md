# Codebase X-Ray

Codebase X-Ray is an interactive developer tool that helps programmers quickly understand unfamiliar JavaScript and TypeScript codebases.

Instead of manually opening dozens of files and tracing imports by hand, Codebase X-Ray analyzes a repository and generates an interactive dependency map showing how files are connected and how the project is structured.

## Why Codebase X-Ray?

Joining a new project, contributing to open source, or working with a large unfamiliar repository often begins with the same problem:

**Where do I start?**

Understanding how files, components, API routes, utilities, and services connect can take a significant amount of time.

Codebase X-Ray turns an unfamiliar repository into an interactive visual map, helping developers understand its structure and dependencies before diving deeply into the source code.

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

## Example

If a project contains:

```ts
import Dashboard from "@/components/Dashboard";
```

and `Dashboard.tsx` contains:

```ts
import UserCard from "./UserCard";
```

Codebase X-Ray can reconstruct the relationship:

```text
page.tsx
   |
   v
Dashboard.tsx
   |
   v
UserCard.tsx
```

The result is displayed as an interactive graph that developers can explore.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React Flow / XYFlow
- Babel Parser
- Babel Traverse
- JSZip

## Project Architecture

```text
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── AnalyzerWorkspace.tsx
│   ├── CodeGraph.tsx
│   ├── NodeInspector.tsx
│   └── RepoUpload.tsx
│
└── lib/
    └── analyzer/
        ├── analyzeFile.ts
        ├── classifyFile.ts
        ├── resolveImport.ts
        └── types.ts
```

The analyzer logic is intentionally separated from the UI.

`lib/analyzer` is responsible for understanding source code, while the React components are responsible for displaying the results.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Tim-ktrl/hackathon-app.git
```

### 2. Enter the project

```bash
cd hackathon-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

in your browser.

## Using Codebase X-Ray

1. Export or download a JavaScript or TypeScript repository as a ZIP file.
2. Open Codebase X-Ray and select the ZIP file.
3. Click **Analyze Codebase**.
4. The application scans the source files and generates a dependency graph.
5. Click nodes in the graph to explore files and their relationships.

## Current Limitations

Codebase X-Ray is currently an MVP created during a hackathon.

The current version focuses primarily on JavaScript and TypeScript repositories.

Static analysis can identify many relationships in source code, but some dynamic behavior may not be detected reliably, including dynamically generated imports or runtime-only dependencies.

File classification also relies on common naming and folder conventions, so classifications are best-effort rather than guaranteed.

## Future Improvements

Potential future features include:

- GitHub repository URL importing
- Natural-language feature search
- Function-level call graphs
- More advanced React component detection
- Search and filtering for large codebases
- Support for additional programming languages
- Saved repository analyses
- AI-generated explanations built on top of static analysis results

## Hackathon Track

Codebase X-Ray was created for the **Unfamiliar Codebase** track.

The project focuses on reducing the time required for developers to understand the structure of a repository they have never worked with before.

Instead of beginning with dozens of disconnected source files, developers can begin with a visual map of the system.

## What Makes It Different?

Codebase X-Ray does not simply send a repository to an AI model and ask it to explain the code.

The application analyzes the source code directly.

Using AST parsing and import resolution, it constructs a structured representation of the repository and visualizes those relationships in an interactive graph.
