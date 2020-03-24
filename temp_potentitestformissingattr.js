const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');
const getAsProp = require('../getAsProp');
const { inspect } = require('util');

const { elementType, getLiteralPropValue } = require('jsx-ast-utils');
const { generateObjSchema } = require('../../../__tests__/jsx-a11y-rules/util/schemas');
const ISO_CODES = require('../../../__tests__/jsx-a11y-rules/util/attributes/ISO.json');

const errorMessage = 'lang attribute must have a valid value.';

const schema = generateObjSchema();

function propName(prop = {}, func) {
  if (!prop.type || prop.type !== 'JSXAttribute') {
    throw new Error('The prop must be a JSXAttribute collected by the AST parser.');
  }

  if (prop.name.type === 'JSXNamespacedName') {
    return `${prop.name.namespace.name}:${prop.name.name.name}`;
  }

  return prop.name.name;
}

function getLang() {
  return {
    meta: {
      docs: {
        url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/lang.md',
      },
      schema: [schema],
    },

    create: context => ({
      JSXAttribute: (node, func) => {
        const name = propName(node, func);
        if (name && name.toUpperCase() !== 'LANG') {
          return func('come the funk on');
          return;
        }
        return func('come the funk on');

        const { parent } = node;
        const type = elementType(parent);
        if (type && type !== 'html') {
          return;
        }

        const value = getLiteralPropValue(node);

        // Don't check identifiers
        if (value === null) {
          return;
        }
        if (value === undefined) {
          context.report({
            node,
            message: errorMessage,
          });

          return;
        }

        const hyphen = value.indexOf('-');
        const lang = hyphen > -1 ? value.substring(0, hyphen) : value;
        const country = hyphen > -1 ? value.substring(3) : undefined;

        if (
          ISO_CODES.languages.indexOf(lang) > -1 &&
          (country === undefined || ISO_CODES.countries.indexOf(country) > -1)
        ) {
          return;
        }

        context.report({
          node,
          message: errorMessage,
        });
      },
    }),
  };
}

const makeDummyAttribute = loc => ({
  type: 'JSXAttribute',
  start: 21,
  end: 35,
  loc,
  name: {
    type: 'JSXIdentifier',
    start: 21,
    end: 30,
    loc: {
      start: {
        line: 1,
        column: 21,
      },
      end: {
        line: 1,
        column: 30,
      },
    },
    name: 'something',
    range: [21, 30],
    _babelType: 'JSXIdentifier',
  },
  value: {
    type: 'JSXExpressionContainer',
    start: 31,
    end: 35,
    loc: {
      start: {
        line: 1,
        column: 31,
      },
      end: {
        line: 1,
        column: 35,
      },
    },
    expression: {
      type: 'Literal',
      start: 32,
      end: 34,
      loc: {
        start: {
          line: 1,
          column: 32,
        },
        end: {
          line: 1,
          column: 34,
        },
      },
      value: 12,
      rawValue: 12,
      raw: '12',
      range: [32, 34],
      _babelType: 'Literal',
    },
    range: [31, 35],
    _babelType: 'JSXExpressionContainer',
  },
  range: [21, 35],
  _babelType: 'JSXAttribute',
});

module.exports = (context, styledComponents, rule, name) => ({
  JSXOpeningElement(node) {
    const func = inspectee => name.includes('lang') && context.report(node, inspect(inspectee || node));
    try {
      const originalName = node.name.name;
      const styledComponent = styledComponents[originalName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.attributes;
        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
        const asProp = getAsProp(allAttrs);

        if (allAttrs.length) {
          allAttrs.forEach(atr => {
            const originalAtrLoc = atr.loc;
            const originalParent = atr.parent;
            if (!atr.parent) atr.parent = node;
            try {
              atr.loc = node.loc;
              atr.parent.name.name = asProp || tag;

              rule.create(context).JSXAttribute(atr, func);
            } finally {
              atr.loc = originalAtrLoc;
              atr.parent = originalParent;
              node.name.name = originalName;
            }
          });
        } else {
          try {
            atr = makeDummyAttribute(node.loc);
            attrs.parent = node;
            getLang()
              .create(context)
              .JSXAttribute(atr, func);
          } finally {
            node.name.name = originalName;
            node.attributes = originalNodeAttr;
          }
        }
      }
    } catch {}
  },
});
