const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');
const expectedError = {
  message: 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.',
};

const ruleName = 'click-events-have-key-events';
const rule = makeRule(ruleName);
// ## VALID
// <div onClick={() => 0} onKeyDown={foo}/>
const clickKeyDown = makeStyledTestCases({
  attrs: '{ onClick:() => 0, onKeyDown: foo }',
  props: 'onClick={() => 0} onKeyDown={foo}',
});
// <div onClick={() => 0} onKeyUp={foo} />
const clickKeyUp = makeStyledTestCases({
  attrs: '{ onClick:() => 0, onKeyUp: foo}',
  props: 'onClick={() => 0} onKeyUp={foo}',
});
// <div onClick={() => 0} onKeyPress={foo}/>
const clickKeyPress = makeStyledTestCases({
  attrs: '{ onClick:() => 0, onKeyPress: foo }',
  props: 'onClick={() => 0} onKeyPress={foo}',
});
// <div onClick={() => 0} onKeyDown={foo} onKeyUp={bar} />
const clickKeyUpKeyDown = makeStyledTestCases({
  attrs: '{ onClick:() => 0, onKeyUp: foo, onKeyDown: bar }',
  props: 'onClick={() => 0} onKeyUp={foo} onKeyDown={bar}',
});
// <div onClick={() => 0} onKeyDown={foo} {...props} />
const clickKeyDownSpread = makeStyledTestCases({
  attrs: '{ onClick:() => 0, onKeyDown: foo, ...props }',
  props: 'onClick={() => 0} onKeyDown={foo} {...props}',
});
// <div className="foo" />
const divClass = makeStyledTestCases({
  attrs: '{ className: "foo" }',
  props: 'className="foo"',
});
// <div onClick={() => 0} aria-hidden />
const divClickAriaHidden = makeStyledTestCases({
  attrs: `{ onClick: () => 0, 'aria-hidden': true }`,
  props: 'onClick={() => 0} aria-hidden',
});
// <div onClick={() => 0} aria-hidden={true} />
const divClickAriaHiddenTrue = makeStyledTestCases({
  attrs: `{ onClick: () => 0, 'aria-hidden': true }`,
  props: 'onClick={() => 0} aria-hidden={true}',
});
// <div onClick={() => 0} aria-hidden={false} onKeyDown={foo} />
const divClickAriaHiddenFalseWithKeyDown = makeStyledTestCases({
  attrs: `{ onClick: () => 0, 'aria-hidden': false, onKeyDown: foo }`,
  props: 'onClick={() => 0} aria-hidden={false} onKeyDown={foo}',
});
// <div onClick={() => 0} onKeyDown={foo} aria-hidden={undefined} />
const divClickAriaHiddenUndefinedWithKeyDown = makeStyledTestCases({
  attrs: `{ onClick: () => 0, 'aria-hidden': undefined, onKeyDown: foo }`,
  props: 'onClick={() => 0} aria-hidden={undefined} onKeyDown={foo}',
});
// <input type="text" onClick={() => 0} />
const inputTypeTextWithClick = makeStyledTestCases({
  tag: 'input',
  attrs: '{ type: "text", onClick: () => 0 }',
  props: 'type="text" onClick={() => 0}',
});
// <input onClick={() => 0} />
const inputWithClick = makeStyledTestCases({
  tag: 'input',
  attrs: '{ onClick: () => 0 }',
  props: 'onClick={() => 0}',
});
// <button onClick={() => 0} className="foo" />
const buttonClickClass = makeStyledTestCases({
  tag: 'button',
  attrs: '{ onClick: () => 0, className: "foo" }',
  props: 'onClick={() => 0} className="foo"',
});
// <option onClick={() => 0} className="foo" />
const optionClickClass = makeStyledTestCases({
  tag: 'option',
  attrs: '{ onClick: () => 0, className: "foo" }',
  props: 'onClick={() => 0} className="foo"',
});
// <select onClick={() => 0} className="foo" />
const selectClickClass = makeStyledTestCases({
  tag: 'select',
  attrs: '{ onClick: () => 0, className: "foo" }',
  props: 'onClick={() => 0} className="foo"',
});
// <textarea onClick={() => 0} className="foo" />
const textareaClickClass = makeStyledTestCases({
  tag: 'textarea',
  attrs: '{ onClick: () => 0, className: "foo" }',
  props: 'onClick={() => 0} className="foo"',
});
// <a onClick={() => 0} href="http://x.y.z" />
const anchorClickHref = makeStyledTestCases({
  tag: 'a',
  attrs: '{ onClick: () => 0, href: "http://x.y.z" }',
  props: 'onClick={() => 0} href="http://x.y.z"',
});
// <a onClick={() => 0} href="http://x.y.z" tabIndex="0" />
const anchorClickHrefTabIndex = makeStyledTestCases({
  tag: 'a',
  attrs: '{ onClick: () => 0, href: "http://x.y.z", tabIndex: "0" }',
  props: 'onClick={() => 0} href="http://x.y.z" tabIndex="0"',
});
// <input onClick={() => 0} type="hidden" />
const inputClickHidden = makeStyledTestCases({
  tag: 'input',
  attrs: '{ onClick: () => 0, type: "hidden" }',
  props: 'onClick={() => 0} type="hidden"',
});
// <div onClick={() => 0} role="presentation" />
const divClickPresentation = makeStyledTestCases({
  attrs: '{ onClick: () => 0, role: "presentation" }',
  props: 'onClick={() => 0} role="presentation"',
});
// <div onClick={() => 0} role="none" />
const divClickRoleNone = makeStyledTestCases({
  attrs: '{ onClick: () => 0, role: "none" }',
  props: 'onClick={() => 0} role="none"',
});

//  ## INVALID

// <div onClick={() => 0} />
const divJustClick = makeStyledTestCases({
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});

// <div onClick={() => 0} role={undefined} />
const divJustClickUndefinedRole = makeStyledTestCases({
  attrs: '{ onClick:() => 0, role: undefined }',
  props: 'onClick={() => 0} role={undefined}',
  errors: [expectedError],
});

// TODO fix this. doesnt error for some reason
// <div onClick={() => 0} {...props} />
const divJustClickSpread = makeStyledTestCases({
  attrs: '{ onClick:() => 0, ...props }',
  props: 'onClick={() => 0} {...props}',
  errors: [expectedError],
});
// <section onClick={() => 0} />
const sectionClick = makeStyledTestCases({
  tag: 'section',
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});
// <main onClick={() => 0} />
const mainClick = makeStyledTestCases({
  tag: 'main',
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});
// <article onClick={() => 0} />
const articleClick = makeStyledTestCases({
  tag: 'article',
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});
// <header onClick={() => 0} />
const headerClick = makeStyledTestCases({
  tag: 'header',
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});
// <footer onClick={() => 0} />
const footerClick = makeStyledTestCases({
  tag: 'footer',
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});

// <div onClick={() => 0} aria-hidden={false} />
const divClickAriaHiddenFalse = makeStyledTestCases({
  attrs: `{ onClick:() => 0, 'aria-hidden':false }`,
  props: 'onClick={() => 0} aria-hidden={false}',
  errors: [expectedError],
});

// <a onClick={() => 0} />
const anchorClick = makeStyledTestCases({
  tag: 'a',
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});
// <a tabIndex="0" onClick={() => 0} />
const anchorClickTabIndex = makeStyledTestCases({
  tag: 'a',
  attrs: '{ onClick:() => 0, tabIndex: "0" }',
  props: 'onClick={() => 0} tabIndex="0"',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [
    ...clickKeyDown,
    ...clickKeyUp,
    ...clickKeyPress,
    ...clickKeyUpKeyDown,
    ...clickKeyDownSpread,
    ...divClass,
    ...divClickAriaHidden,
    ...divClickAriaHiddenTrue,
    ...divClickAriaHiddenFalseWithKeyDown,
    ...divClickAriaHiddenUndefinedWithKeyDown,
    ...inputTypeTextWithClick,
    ...inputWithClick,
    ...buttonClickClass,
    ...optionClickClass,
    ...selectClickClass,
    ...textareaClickClass,
    ...anchorClickHref,
    ...anchorClickHrefTabIndex,
    ...inputClickHidden,
    ...divClickPresentation,
    ...divClickRoleNone,
  ],
  invalid: [
    ...divJustClick,
    ...divJustClickUndefinedRole,
    ...divJustClickSpread,
    ...sectionClick,
    ...mainClick,
    ...articleClick,
    ...footerClick,
    ...divClickAriaHiddenFalse,
    ...anchorClick,
    ...anchorClickTabIndex,
  ],
});
