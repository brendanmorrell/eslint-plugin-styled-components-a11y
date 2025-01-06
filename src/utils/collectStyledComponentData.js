/**
 *
 * @param {import('estree').Expression} node
 * @returns  {node is import('estree').CallExpression}
 */
const isStyledCallExpression = (tag) => tag?.type === 'CallExpression';
const isStyledFunc = (node) => node.tag.callee?.name === 'styled';
const isStyledFuncComponentArgument = (node) => isStyledFunc(node) && node.tag.arguments?.[0]?.type === 'Identifier';
const isStyledFuncStringArgument = (node) => isStyledFunc(node) && node.tag.arguments?.[0]?.type === 'Literal';

const isStyledFuncWithAttrs = (node) => node.tag.callee?.object?.callee?.name === 'styled' && isAttrs(node);
const isStyledStringArgumentFuncWithAttrs = (node) =>
  isStyledFuncWithAttrs(node) && node.tag.callee?.object?.arguments?.[0]?.type === 'Literal';
const isStyledComponentArgumentFuncWithAttrs = (node) =>
  isStyledFuncWithAttrs(node) && node.tag.callee?.object?.arguments?.[0]?.type === 'Identifier';

const styledCallElementObjectMapArgumentTag = (node) => node.tag?.arguments?.[0]?.property?.name;
/**
 *
 * @param {import('eslint').Rule.Node | null | undefined} node
 * @returns  {node is import('estree').Identifier}
 */
const isIdentifier = (node) => node?.type === 'Identifier';
/**
 *
 * @param {import('eslint').Rule.Node | null | undefined} node
 * @returns  {node is import('estree').Identifier}
 */
const isStyledIdentifier = (node) => isIdentifier(node) && node.name === 'styled';
/**
 *
 * @param {import('estree').TaggedTemplateExpression | null | undefined} node
 * @returns  {boolean}
 */
const isPlainSTE = (node) => node.tag.type === 'MemberExpression' && isStyledIdentifier(node.tag?.object);
const isAttrs = ({ tag }) => tag.callee?.property?.name === 'attrs';

const getAttrsType = (node) => {
  const type = node.tag?.arguments?.[0]?.type;
  return type === 'FunctionExpression'
    ? 'func'
    : type === 'ArrowFunctionExpression'
    ? 'arrow'
    : type === 'ObjectExpression'
    ? 'object'
    : '';
};
const { inspect } = require('util');
const { __UNKNOWN_IDENTIFER__ } = require('./constants');

/**
 *
 * @param {Record<string, {name: string; attrs: any[]; tag: string}>} styledComponentsDict
 * @param {import('eslint').Rule.RuleContext} context
 * @param {string} name
 * @returns {import('eslint').Rule.RuleListener}
 */
module.exports = (styledComponentsDict, context, name) => {
  /**
   * enable checking custom components
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#usage
   */
  const componentMap = context.settings?.['jsx-a11y']?.components ?? {};

  return {
    CallExpression: function CallExpression(node) {
      try {
        // TODO: Consider supporting more complex parent name definitions (e.g. object keys)
        let styledComponentName =
          node.parent && 'id' in node.parent && node.parent.id?.type === 'Identifier' ? node.parent.id.name : null;
        if (!styledComponentName) {
          // const Components = { Component: styled.div({ ... }) }
          if (
            node.parent.type === 'Property' &&
            isIdentifier(node.parent.key) &&
            node.parent.key.name &&
            node.parent.parent?.parent?.type === 'VariableDeclarator' &&
            isIdentifier(node.parent.parent.parent.id) &&
            node.parent.parent.parent.id.name
          ) {
            styledComponentName = `${node.parent.parent.parent.id.name}.${node.parent.key.name}`;
          } else {
            return;
          }
        }

        let tag = '';

        if (!styledComponentName) return;

        // styled.?({ ... })
        if (node.callee?.type === 'MemberExpression' && isStyledIdentifier(node.callee.object)) {
          // styled.div({ ... })
          if (node.callee.property?.type === 'Identifier' && node.callee.property.name) {
            tag = node.callee.property.name;

            if (!tag) return;

            styledComponentsDict[styledComponentName] = {
              name: styledComponentName,
              attrs: [],
              tag: tag,
            };
          }
        }

        // styled(...)(...)
        if (node.callee?.type === 'CallExpression' && isStyledIdentifier(node.callee.callee)) {
          let arg = node.callee.arguments[0];

          if (!arg) return;

          // styled('div')(...)
          if (arg.type === 'Literal') {
            tag = arg.value;

            if (!tag) return;

            styledComponentsDict[styledComponentName] = {
              name: styledComponentName,
              attrs: [],
              tag: tag,
            };
          }

          // TODO: Consider supporting templates like styled(`div`)(...)
          if (arg.type !== 'Identifier') return;

          // styled(StyledComponent)({ ... })

          let attrs = [];
          let ancestorScName = arg.name;

          if (styledComponentsDict[ancestorScName]) {
            // Add attrs if the ancestor has them
            attrs = styledComponentsDict[ancestorScName].attrs;
            tag = styledComponentsDict[ancestorScName].tag;
          }

          // styled(CustomComponent)({ ...})
          if (componentMap[ancestorScName]) {
            tag = componentMap[ancestorScName];
          }

          if (!tag) return;

          styledComponentsDict[styledComponentName] = {
            name: styledComponentName,
            attrs: attrs,
            tag: tag,
          };
        }
      } catch (error) {
        context.report({
          message: 'Unable to parse styled component: {{ message }}',
          node,
          data: { message: error.message, stack: error.stack },
        });
      }
    },
    TaggedTemplateExpression(node) {
      const func = (inspectee) =>
        name.includes('html-has-lang') && context.report(node, `made it here: ${inspect(inspectee || node)}`);
      let scName = node.parent.id && node.parent.id.name;

      if (!scName) {
        // const Components = { Component: styled.div`` }
        if (
          node.tag.type === 'MemberExpression' &&
          isStyledIdentifier(node.tag?.object) &&
          node.parent.type === 'Property' &&
          isIdentifier(node.parent.key) &&
          node.parent.key.name &&
          node.parent.parent?.parent?.type === 'VariableDeclarator' &&
          isIdentifier(node.parent.parent.parent.id) &&
          node.parent.parent.parent.id.name
        ) {
          scName = `${node.parent.parent.parent.id.name}.${node.parent.key.name}`;
        } else {
          return;
        }
      }

      let attrs = [];
      let tag = '';

      // styled(Component)`` || styled.div.attrs(...)`` || styled('div')``
      if (isStyledCallExpression(node.tag)) {
        // styled(animated.div)``
        if (styledCallElementObjectMapArgumentTag(node)) {
          tag = styledCallElementObjectMapArgumentTag(node);
        }
        // styled('div')``;
        else if (isStyledFuncStringArgument(node)) {
          tag = node.tag.arguments?.[0]?.value || '';
        }

        // styled(Component)`` || styled(Component).attrs(...)``
        if (isStyledFuncComponentArgument(node) || isStyledComponentArgumentFuncWithAttrs(node)) {
          const ancestorScName = isStyledFuncComponentArgument(node)
            ? node.tag.arguments[0].name
            : node.tag.callee.object.arguments[0].name;

          // styled(StyledComponent)`` || styled(StyledComponent).attrs(...)``
          if (styledComponentsDict[ancestorScName]) {
            ({ attrs } = styledComponentsDict[ancestorScName]);
            ({ tag } = styledComponentsDict[ancestorScName]);
          }

          // styled(CustomComponent)`` || styled(CustomComponent).attrs(...)``
          if (componentMap[ancestorScName]) {
            tag = componentMap[ancestorScName];
          }
        }

        // styled.div.attrs(...)`` || styled(Component).attrs(...)`` || styled('div').attrs(...)``
        if (isAttrs(node) || isStyledFuncWithAttrs(node)) {
          let attrsPropertiesArr = [];
          const attrsNode = node.tag.arguments[0];

          if (isStyledStringArgumentFuncWithAttrs(node)) {
            tag = node.tag.callee?.object?.arguments?.[0]?.value;
          } else if (!isStyledComponentArgumentFuncWithAttrs(node)) {
            tag = node.tag.callee.object.property?.name;
          }
          const attrsType = getAttrsType(node);
          if (!tag || !attrsType) return;
          // styled.div.attrs(function() { return {} })``

          // TODO all these empty array defaults are a temp fix. Should get a better way of actually trying to see what
          //  is returned from function attrs in the case they aren't just simple immediate returns, e.g., if else statements
          if (attrsType === 'arrow') {
            attrsPropertiesArr = attrsNode?.body?.properties || [];
            // styled.div.attrs(() => ({}))``
          } else if (attrsType === 'func') {
            attrsPropertiesArr =
              attrsNode?.body?.body?.find((x) => x.type === 'ReturnStatement')?.argument?.properties || [];
            // styled.div.attrs({})``
          } else if (attrsType === 'object') {
            attrsPropertiesArr = attrsNode?.properties || [];
          }

          const arithmeticUnaryOperators = ['+', '-'];
          // filter out spread elements (which have no key nor value)
          attrs = attrs.concat(
            attrsPropertiesArr
              .filter((x) => x.key)
              .map((x) => ({
                key: x.key.name || x.key.value,
                // this is pretty useless. would need to generate code from any template expression for this to really work
                value:
                  x.value.type === 'TemplateLiteral'
                    ? // need to grab falsy vals like empty strings, thus the x ? x : identifier instead of x|| identifier
                      typeof x.value.quasis[0].value.raw === 'undefined'
                      ? __UNKNOWN_IDENTIFER__
                      : x.value.quasis[0].value.raw
                    : x.value.type === 'UnaryExpression' && arithmeticUnaryOperators.includes(x.value.operator)
                    ? // if simple arithemetic, concat the symbol and the strings (like a negative) and then coerce to a number
                      +(x.value.operator + x.value.argument.value)
                    : x.value.type === 'Identifier'
                    ? x.value.name === 'undefined'
                      ? undefined
                      : __UNKNOWN_IDENTIFER__
                    : typeof x.value.value === 'undefined'
                    ? // if property exists, but no value found, just set it to our unknown identifier so it returns truthy and not something specific like a number or boolean or undefined as these are tested in specific ways for different linting rules
                      // too many options for what this could be, but this can approxinate what is needed for linting
                      // need to grab falsy vals like empty strings, thus the x ? x : identifier instead of x|| identifier
                      __UNKNOWN_IDENTIFER__
                    : x.value.value,
              })),
          );
        }

        styledComponentsDict[scName] = { name: scName, attrs, tag };
      }

      // const A = styled.div``
      if (node.tag.type === 'MemberExpression' && isStyledIdentifier(node.tag?.object)) {
        tag = 'name' in node.tag.property ? node.tag.property.name : '';

        if (!tag) return;

        styledComponentsDict[scName] = {
          name: scName,
          tag,
          attrs,
        };
      }
    },
  };
};
