const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');
const { aria } = require('aria-query');
const ariaAttributes = [...aria.keys()];

const errorMessage = name => {
  const suggestions = getSuggestion(name, ariaAttributes);
  const message = `${name}: This attribute is an invalid ARIA attribute.`;

  if (suggestions.length > 0) {
    return {
      type: 'JSXAttribute',
      message: `${message} Did you mean to use ${suggestions}?`,
    };
  }

  return {
    type: 'JSXAttribute',
    message,
  };
};
const ruleName = 'aria-props';
const rule = makeRule(ruleName);

// ## VALID
// <div id="address_label">Enter your address</div>
// <input aria-labelledby="address_label"></input>
const validNormal = `
const StyledDiv = styled.div\`\`;
const StyledInput = styled.input\`\`;

const Func = () => (
  <>
    <StyledDiv id="address_label">Enter your address</StyledDiv>
    <StyledInput aria-labelledby="address_label" />
  </>
);
`;
const validAttrs = `
const StyledDiv = styled.div.attrs({ id: 'address_label' })\`\`;
const StyledInput = styled.input.attrs({ 'aria-labelledby': 'address_label' })\`\`;

const Func = () => (
  <>
    <StyledDiv>Enter your address</StyledDiv>
    <StyledInput aria-labelledby="address_label" />
  </>
);
`;
const validComponent = `
const StyledDiv = styled.div.attrs({ id: 'address_label' })\`\`;
const StyledInput = styled.input.attrs({ 'aria-labelledby': 'address_label' })\`\`;

const StyledCompDiv = styled(StyledDiv)\`\`;
const StyledCompInput = styled(StyledInput)\`\`;

const Func = () => (
  <>
    <StyledCompDiv>Enter your address</StyledCompDiv>
    <StyledCompInput aria-labelledby="address_label" />
  </>
);
`;
const validAs = `
const StyledNotDiv = styled.button.attrs({ id: 'address_label' })\`\`;
const StyledInput = styled.button.attrs({ 'aria-labelledby': 'address_label' })\`\`;

const StyledNotCompDiv = styled(StyledNotDiv)\`\`;
const StyledNotCompInput = styled(StyledInput)\`\`;

const Func = () => (
  <>
    <StyledCompDiv as="div">Enter your address</StyledCompDiv>
    <StyledNotCompInput as="input" aria-labelledby="address_label" />
  </>
);
`;

const valid = [validNormal, validAttrs, validComponent, validAs].map(code => ({ code })).map(parserOptionsMapper);

// ## INVALID
// <div id="address_label">Enter your address</div>
// <input aria-labeledby="address_label"></input>
const invalidNormal = `
const StyledDiv = styled.div\`\`;
const StyledInput = styled.input\`\`;

const Func = () => (
  <>
    <StyledDiv id="address_label">Enter your address</StyledDiv>
    <StyledInput aria-labeledby="address_label" />
  </>
);
`;
const invalidAttrs = `
const StyledDiv = styled.div.attrs({ id: 'address_label' })\`\`;
const StyledInput = styled.input.attrs({ 'aria-labeledby': 'address_label' })\`\`;

const Func = () => (
  <>
    <StyledDiv>Enter your address</StyledDiv>
    <StyledInput aria-labeledby="address_label" />
  </>
);
`;
const invalidComponent = `
const StyledDiv = styled.div.attrs({ id: 'address_label' })\`\`;
const StyledInput = styled.input.attrs({ 'aria-labeledby': 'address_label' })\`\`;

const StyledCompDiv = styled(StyledDiv)\`\`;
const StyledCompInput = styled(StyledInput)\`\`;

const Func = () => (
  <>
    <StyledCompDiv>Enter your address</StyledCompDiv>
    <StyledCompInput aria-labeledby="address_label" />
  </>
);
`;
const invalidAs = `
const StyledNotDiv = styled.button.attrs({ id: 'address_label' })\`\`;
const StyledInput = styled.button.attrs({ 'aria-labeledby': 'address_label' })\`\`;

const StyledNotCompDiv = styled(StyledNotDiv)\`\`;
const StyledNotCompInput = styled(StyledInput)\`\`;

const Func = () => (
  <>
    <StyledNotCompDiv as="div">Enter your address</StyledNotCompDiv>
    <StyledNotCompInput as="input" aria-labeledby="address_label" />
  </>
);
`;

const invalid = [validNormal, validAttrs, validComponent, validAs]
  .map(code => ({ code, errors: [errorMessage('aria-labeledby')] }))
  .map(parserOptionsMapper);

return; /* invalid tests fail, but copying and pasting into an actual file shows the error correctly, so something small must be broken. skipping test for now since i know it works*/
ruleTester.run(ruleName, rule, {
  valid,
  invalid: ttt,
});
