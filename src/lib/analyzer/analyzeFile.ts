import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const HTTP_METHODS = new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
]);

function isComponentName(name: string) {
  return /^[A-Z]/.test(name);
}

function isInternalImport(importPath: string) {
  return (
    importPath.startsWith(".") ||
    importPath.startsWith("@/")
  );
}

export function analyzeFile(
  filePath: string,
  sourceCode: string
) {
  const imports = new Set<string>();

  const internalImports = new Set<string>();
  const externalImports = new Set<string>();

  const functions = new Set<string>();
  const components = new Set<string>();
  const classes = new Set<string>();

  const exports = new Set<string>();

  const apiRoutes = new Set<string>();

  try {
    const ast = parse(sourceCode, {
      sourceType: "unambiguous",
      plugins: ["typescript", "jsx"],
      errorRecovery: true,
    });

    traverse(ast, {
      ImportDeclaration(path) {
        const importPath = path.node.source.value;

        imports.add(importPath);

        if (isInternalImport(importPath)) {
          internalImports.add(importPath);
        } else {
          externalImports.add(importPath);
        }
      },

      FunctionDeclaration(path) {
        const name = path.node.id?.name;

        if (!name) {
          return;
        }

        functions.add(name);

        if (isComponentName(name)) {
          components.add(name);
        }
      },

      VariableDeclarator(path) {
        const id = path.node.id;
        const init = path.node.init;

        if (id.type !== "Identifier") {
          return;
        }

        if (
          !init ||
          (
            init.type !== "ArrowFunctionExpression" &&
            init.type !== "FunctionExpression"
          )
        ) {
          return;
        }

        const name = id.name;

        functions.add(name);

        if (isComponentName(name)) {
          components.add(name);
        }
      },

      ClassDeclaration(path) {
        const name = path.node.id?.name;

        if (name) {
          classes.add(name);
        }
      },

      ExportNamedDeclaration(path) {
        const declaration = path.node.declaration;

        /*
         * export function GET() {}
         * export function login() {}
         */
        if (declaration?.type === "FunctionDeclaration") {
          const name = declaration.id?.name;

          if (name) {
            exports.add(name);

            if (HTTP_METHODS.has(name)) {
              apiRoutes.add(name);
            }
          }
        }

        /*
         * export class UserService {}
         */
        if (declaration?.type === "ClassDeclaration") {
          const name = declaration.id?.name;

          if (name) {
            exports.add(name);
          }
        }

        /*
         * export const GET = () => {}
         * export const userService = ...
         */
        if (declaration?.type === "VariableDeclaration") {
          for (const variable of declaration.declarations) {
            if (variable.id.type !== "Identifier") {
              continue;
            }

            const name = variable.id.name;

            exports.add(name);

            if (HTTP_METHODS.has(name)) {
              apiRoutes.add(name);
            }
          }
        }

        /*
         * const login = ...
         * export { login }
         */
        for (const specifier of path.node.specifiers) {
          if (specifier.exported.type === "Identifier") {
            const name = specifier.exported.name;

            exports.add(name);

            if (HTTP_METHODS.has(name)) {
              apiRoutes.add(name);
            }
          }
        }
      },

      ExportDefaultDeclaration(path) {
        exports.add("default");

        const declaration = path.node.declaration;

        if (
          declaration.type === "FunctionDeclaration" &&
          declaration.id
        ) {
          const name = declaration.id.name;

          functions.add(name);

          if (isComponentName(name)) {
            components.add(name);
          }
        }

        if (
          declaration.type === "ClassDeclaration" &&
          declaration.id
        ) {
          classes.add(declaration.id.name);
        }
      },
    });
  } catch (error) {
    console.error(
      `Failed to parse ${filePath}`,
      error
    );
  }

  return {
    path: filePath,

    imports: [...imports],

    internalImports: [...internalImports],
    externalImports: [...externalImports],

    functions: [...functions],
    components: [...components],
    classes: [...classes],

    exports: [...exports],

    apiRoutes: [...apiRoutes],
  };
}