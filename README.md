## Eslint Plugin Styled Components A11y 🤝

This plugin adds the ability to lint styled components according to the rules outlined in eslint-plugin-jsx-a11y.

It handles all 5 methods styled components uses to create components. All of these would show the error

```diff
-Visible, non-interactive elements with click handlers must have at least one keyboard listener.`
```

```jsx
const Div = styled.div``;
<Div onClick={() => null} />;
```

```jsx
const Div = styled('div')``;
<Div onClick={() => null} />;
```

```jsx
const Div = styled.div.attrs({ onClick: () => null })``;
<Div />;
```

```jsx
const Div = styled.div.attrs({ onClick: () => null })``;
const StyledDiv = styled(Div)``;
<StyledDiv />;
```

```jsx
const ButtonAsDiv = styled.button``;
<ButtonAsDiv as="div" onClick={() => null} />;
```

Elements can also be defined within objects:

```jsx
const Component = { Div: styled.div`` };
<Component.Div onClick={() => null} />;
```

![linting examples](https://iili.io/h1rZBI.png)
<br />
<br />
<br />

<div style="display:flex; justify-content:center; align-items:center;">

### Give the project a [⭐ STAR ⭐](https://github.com/brendanmorrell/eslint-plugin-styled-components-a11y) and help increase accessibility for everyone!

<img align="left" src="https://iili.io/h1rLLN.png" alt="handshake-emoji" style="margin-right:30px;"/>
<img align="right" src="https://iili.io/h1rLLN.png" alt="handshake-emoji" style="margin-left:30px;"/>

</div>
<br />
<br />
<br />
<!-- should figure out how to actually style this section. this is a temp fix -->
<br />
<br />
<br />

## Installation

Install as a dev dependency:

    yarn add -D eslint-plugin-styled-components-a11y

or

    npm i --save-dev eslint-plugin-styled-components-a11y

### Configuration - Legacy Config (`.eslintrc`)

Add styled-components-a11y to the plugins section of your .eslintrc configuration file. You can omit the eslint-plugin- prefix:

```json
{
  "plugins": ["styled-components-a11y"]
}
```

Enable the recommeded ruleset or the strict ruleset. Add `plugin:styled-components-a11y/recommended` or `plugin:styled-components-a11y/strict` in extends:

```json
{
  "extends": ["plugin:styled-components-a11y/recommended"]
}
```

Alternatively, you can configure individual rules under the rules section.

```json
{
  "rules": {
    "styled-components-a11y/rule-name": 2
  }
}
```

### Configuration - Flat Config

The default export is a plugin object:

```js
import styledA11y from 'eslint-plugin-styled-components-a11y';

export default [
  {
    plugins: {
      'styled-components-a11y': styledA11y,
    },
    rules: {
      'styled-components-a11y/rule-name': 2,
    },
  },
];
```

#### Shareable Configs

There are two shareable configs provided by the plugin:

- `flatConfigs.recommended`
- `flatConfigs.strict`

```js
import styledA11y from 'eslint-plugin-styled-components-a11y';

export default [
  styledA11y.flatConfigs.recommended,
  // ... additional configs
];
```

## Examples

a working repo can be found [here](https://github.com/brendanmorrell/styled-components-a11y-example) at brendanmorrell/styled-components-a11y-example which has a file illustrating the linting rules in action for the above four styled component types the library is currently capable of handling

# Please [⭐ STAR ⭐](https://github.com/brendanmorrell/eslint-plugin-styled-components-a11y), share, report bugs, and contribute!!!

## With your help, we can increase web accessibility for all!

If you like the project and believe in the goal, it would bea **HUGE** help if you could **[give it a star on github](https://github.com/brendanmorrell/eslint-plugin-styled-components-a11y)** ans/or spread the word on
social/with coworkers so we could get more people using it, testing it, and contributing (any bump would help, as this
is solely a pet project of mine, and I have limited time to work on it).

Really.

Most modern sites are almost entirely unnavigable for those with special needs. Linters are the primary method of informing developers and enforcing solutions, but with most now using CSS in JS, existing a11y linting has become significantly less useful (personally, 99% of the components I actually need linted are styled); using and promoting solutions to this problem would be a **massive** step toward increasing accessibillity on the web. If you can, please help give us a boost so I can keep working on this, get others to assist, and work toward a more open, accessible internet for everyone.

Also, **PLEASE** let me know of any bugs you find so I can more quickly rectify them (or even better, make a PR).

### Note

1. version 0.0.15 had two major bug fixes, if you have a previous version, please update.
2. As evidence of the importance of styled a11y linting, I ran just this plugin on a prod repo i'm working on, and it uncovered 6,567 errors that were undiscovered using airbnb/jsx-a11y linting rules. once again, please share, star the [github repo](https://github.com/brendanmorrell/eslint-plugin-styled-components-a11y), report any bugs, and contribute so we can increase web accessibility for all!

## Contributing

Contributions are very welcome, as I don't have a lot of free time to work on this currently. My personal todo list is in Todo.md. I will try to make this more intelligible to other contributors, but if you'd like to start before I get around to that, let me know, and I can tell you what still needs work. Thanks!

Note: Someone asked how to contribute. I'll drop the response here in case it's useful (can clean it up/add more later depending on interest)

I would absolutely love some help as I only get around to working on this in my spare time (of which I have little at the moment). there is a Todo.md in the repo with a list of things I still want to look into/work on, but I wasn't intending for others to read that, so it might not make a ton of sense.

Here are the broad strokes in order of priority:

1. I want to have all the rules running more test cases. Make sure that the test passes with all the different forms styled components can handle (styled.{html tag}, styled.{html tag}.attrs() styled(Component)``, and <Component as="{some other tag}"). I have a helper function that already creates all of these test cases for you. You basically tell it the tag, the attrs, the props, the children, and the error (all of these are strings and are optional). For example, this would create an array of the following strings that you could then run tests on to make sure the correct linter rule fired:
   This:

```jsx
const clickKeyDown = makeStyledTestCases({
  tag: 'a',
  attrs: '{ onClick:() => 0, onKeyDown: foo }',
  props: 'onClick={() => 0} onKeyDown={foo}',
  children: 'some text',
});
```

would create an array of objects with the key 'code' having the following strings respectively

- (tag is set to a, props is the string from 'props', and children are present inside styled component)

```jsx
const FUNC = styled.a``;
const Component = () => (
  <FUNC onClick={() => 0} onKeyDown={foo}>
    some text
  </FUNC>
);
```

- (tag is set to a, attrs is the string from 'attrs', and children are present inside styled component)

```jsx
const FUNC = styled.a.attrs({ onClick: () => 0, onKeyDown: foo })``;
const Component = () => <Component>some text</Component>;
```

- the same thing but using an extended component

```jsx
const FUNC = styled.a.attrs({ onClick: () => 0, onKeyDown: foo })``;
const Extended = styled(FUNC)``;
const Component = () => <Extended>some text</Extended>;
```

- the same thing but with the as prop (the initial component is just anything other than what you put in as the tag)

```jsx
const FUNC = styled.div.attrs({ onClick: () => 0, onKeyDown: foo })``;
const Extended = styled(FUNC)``;
const Component = () => <Extended as="a">some text</Extended>;
```

to test error cases, you add the errors parameter to makeStyledTestCases, which will pass if the correct error fires

See if you can add some more rules. When the rules error out, best bet is to log whatever the failing role is, and then take all those test cases, paste them into a project that is running eslint-plugin-styled-components-a11y, and just trace the code to see why it is either firing when it shouldn't or not firing when it should. The way i have been doing this (which is kind of painful) is to go into your node_modules and start by just getting the rule to fire. for this you either want to look in src/collectStyledComponentData.js (if the problem is with collecting the data for the styled component), or more frequently in the relevant parser file in src/nodeParsers. Look at src/ruleNameToTypeDict to see what parser goes with what rule. When you have the right file, i generally start out by just getting the linter to fire off with a hello world. Each parser file has a helper function in it called 'func'. it looks like this:

```jsx
const func = (inspectee) => name.includes('scope') && context.report(node, inspect(inspectee || node));
```

put the name of the rule in where the example says 'scope' (so it only runs once for that rule instead of on every rule) and call it with either the node you want to log (which is what eslint is parsing. it runs over every node in the code's abstract syntax tree and calls your linting rules), or anything else you want to log. immediately after you run func (at first, at the top of the file), add a return statement, as sometimes the linter is erroring out, and thus won't log unless you short-circuit it before the error. For example, if i were testing the rule accessible-emoji i would have the following to start:

```jsx
const func = (inspectee) => name.includes('accessible-emoji') && context.report(node, inspect(inspectee || node));
func('hello world');
return;
```

When you reload your editor (this is necessary unfortunately), you should see hello world as an error on the styled component. Then you just work your way through the code until you can see where it is erroring out or not passing the correct data through.

2. the rule currently does not handle imports, only components defined within a single file. I would like to change from the current setup, where i create a dictionary with all the styled components names (eg, if the declaration is ` const Func = styled.div.attrs({foo:'bar'})``; ` the component dictionary i make looks like this `{ Func : { tag: 'div', attrs: {foo:'bar'} }`), to keying off the name of the component and the filename, e.g. change Foo to '/users/brendan/components/Tab\_\_Func'. Look to the eslint rule import/no-cycle for some guidance on how to possibly do this

3. there are a lot of edge cases in terms of both the function and arrow function syntax for attrs (e.g.,

````jsx
styled.div.attrs(p => p.large ? ({foo:'bar', baz: p.small ? 1 : 2}))``;```
````

and just expressions in general for all the attributes and props, especially handling template strings with embedded expressions. This is pretty complex though, and no linter is perfect, so this should probably wait until the end
