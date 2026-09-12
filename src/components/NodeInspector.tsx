import type { AnalysisResult } from "@/lib/analyzer/types";

type NodeInspectorProps = {
  nodeId: string;
  analysis: AnalysisResult;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
};

export default function NodeInspector({
  nodeId,
  analysis,
  onClose,
  onSelectNode,
}: NodeInspectorProps) {
  const node = analysis.nodes.find((node) => node.id === nodeId);

  const file = analysis.files.find((file) => file.path === nodeId);

  if (!node || !file) {
    return null;
  }

  const dependencies = analysis.edges
    .filter((edge) => edge.source === nodeId)
    .map((edge) => edge.target);

  const importedBy = analysis.edges
    .filter((edge) => edge.target === nodeId)
    .map((edge) => edge.source);

  return (
    <aside className="h-full w-80 shrink-0 overflow-y-auto border-l p-5">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{node.label}</h2>

          <p className="mt-1 text-sm text-gray-500">{node.path}</p>
        </div>

        <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
          ✕
        </button>
      </div>

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Category
        </p>

        <p className="mt-2 capitalize">{node.category}</p>
      </section>

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Functions
        </p>

        {file.functions.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {file.functions.map((func) => (
              <li key={func} className="rounded-md border px-3 py-2 text-sm">
                {func}()
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No functions detected.</p>
        )}
      </section>

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Components
        </p>

        {file.components.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {file.components.map((component) => (
              <li
                key={component}
                className="rounded-md border px-3 py-2 text-sm"
              >
                {component}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No components detected.</p>
        )}
      </section>

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Classes
        </p>

        {file.classes.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {file.classes.map((className) => (
              <li
                key={className}
                className="rounded-md border px-3 py-2 text-sm"
              >
                {className}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No classes detected.</p>
        )}
      </section>

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Exports
        </p>

        {file.exports.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {file.exports.map((exportName) => (
              <li
                key={exportName}
                className="rounded-md border px-3 py-2 text-sm"
              >
                {exportName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No exports detected.</p>
        )}
      </section>

      {file.apiRoutes.length > 0 && (
        <section className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            API Methods
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {file.apiRoutes.map((method) => (
              <span
                key={method}
                className="rounded-md border px-2 py-1 text-sm font-medium"
              >
                {method}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          External Packages
        </p>

        {file.externalImports.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {file.externalImports.map((packageName) => (
              <li
                key={packageName}
                className="rounded-md border px-3 py-2 text-sm"
              >
                {packageName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            No external packages detected.
          </p>
        )}
      </section>

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Depends on
        </p>

        {dependencies.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {dependencies.map((dependency) => (
              <button
                key={dependency}
                onClick={() => onSelectNode(dependency)}
                className="block w-full rounded-md border px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                {dependency}
              </button>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            No internal dependencies.
          </p>
        )}
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Imported by
        </p>

        {importedBy.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {importedBy.map((importer) => (
              <button
                key={importer}
                onClick={() => onSelectNode(importer)}
                className="block w-full rounded-md border px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                {importer}
              </button>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Nothing imports this file.
          </p>
        )}
      </section>
    </aside>
  );
}
