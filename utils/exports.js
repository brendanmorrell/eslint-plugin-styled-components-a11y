/**
 * @fileOverview Ensures that no imported module imports the linted module.
 * @author Ben Mosher
 */

const Exports = require('../ExportMap').default;
const moduleVisitor = require('eslint-module-utils/moduleVisitor').default;
const makeOptionsSchema = require('eslint-module-utils/moduleVisitor');
const docsUrl = require('../docsUrl').default;

// todo: cache cycles / deep relationships for faster repeat evaluation
module.exports = {
  meta: {
    type: 'suggestion',
    docs: { url: docsUrl('no-cycle') },
    schema: [
      makeOptionsSchema({
        maxDepth: {
          description: 'maximum dependency depth to traverse',
          type: 'integer',
          minimum: 1,
        },
      }),
    ],
  },

  create: function(context) {
    const myPath = context.getFilename();
    if (myPath === '<text>') return {}; // can't cycle-check a non-file

    const options = context.options[0] || {};
    const maxDepth = options.maxDepth || Infinity;

    function checkSourceValue(sourceNode, importer) {
      context.report(sourceNode, 'hi');
      const imported = Exports.get(sourceNode.value, context);

      if (importer.importKind === 'type') {
        return; // no Flow import resolution
      }

      if (imported == null) {
        return; // no-unresolved territory
      }

      if (imported.path === myPath) {
        return; // no-self-import territory
      }

      const untraversed = [{ mget: () => imported, route: [] }];
      const traversed = new Set();
      function detectCycle({ mget, route }) {
        const m = mget();
        if (m == null) return;
        if (traversed.has(m.path)) return;
        traversed.add(m.path);

        for (let [path, { getter, source }] of m.imports) {
          if (path === myPath) return true;
          if (traversed.has(path)) continue;
          if (route.length + 1 < maxDepth) {
            untraversed.push({
              mget: getter,
              route: route.concat(source),
            });
          }
        }
      }

      while (untraversed.length > 0) {
        const next = untraversed.shift(); // bfs!
        if (detectCycle(next)) {
          const message =
            next.route.length > 0 ? `Dependency cycle via ${routeString(next.route)}` : 'Dependency cycle detected.';
          context.report(importer, message);
          return;
        }
      }
    }

    return moduleVisitor(checkSourceValue, context.options[0]);
  },
};

function routeString(route) {
  return route.map(s => `${s.value}:${s.loc.start.line}`).join('=>');
}
