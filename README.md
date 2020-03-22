## Eslint Plugin Styled Components A11y

This is a work in progress for linting styled components according to the rules outlined in eslint-plugin-jsx-a11y.

It handles all 4 methods styled components uses to create components. All of these would show the error

`Visible, non-interactive elements with click handlers must have at least one keyboard listener.`

```
const Div = styled.div``;
<Div onClick={() => null}/>
```

```
const Div = styled.div.attrs({ onClick: () => null})``;
<Div />
```

```
const Div = styled.div.attrs({ onClick: () => null})``;
const StyledDiv = styled(Div)``;
<StyledDiv />
```

```
const ButtonAsDiv = styled.button``;
<ButtonAsDiv as="div" onClick={() => null} />
```

![linting examples](https://github.com/brendanmorrell/styled-components-a11y-example/blob/master/example.png)

## Examples

a working repo can be found at https://github.com/brendanmorrell/styled-components-a11y-example which has a file illustrating the linting rules in action for the above four styled component types for which the library is currently capable of handling

## IMPORTANT

This library is currently a work in progress. At the moment, some of the rules do not fire in all cases, and there is some debugging and testing still to be done.

## Usage

Add styled-components-a11y to the plugins section of your .eslintrc configuration file. You can omit the eslint-plugin- prefix:

```
{
  "plugins": [
    "styled-components-a11y"
  ]
}
```

You enable the recommeded rules or strict rules. Add `plugin:styled-components-a11y/recommended` or `plugin:styled-components-a11y/`strict in extends:

```
{
  "extends": [
    "plugin:styled-components-a11y/recommended"
  ]
}
Alternatively, you can configure individual rules under the rules section.
```

{
"rules": {
"styled-components-a11y/rule-name": 2
}
}

```

## Contributing

Contributions are very welcome, as I don't have a lot of free time to work on this currently. My personal todo list is in Todo.md. I will try to make this more intelligible to other contributors, but if you'd like to start before I get around to that, let me know, and I can tell you what still needs work. Thanks!

Note: Someone asked how to contribute. I'll drop the response here in case it's useful (can clean it up/add more later depending on interest)

I would absolutely love some help as I only get around to working on this in my spare time (of which I have little at the moment). there is a Todo.md in the repo with a list of things I still want to look into/work on, but I wasn't intending for others to read that, so it might not make a ton of sense.

Here are the broad strokes in order of priority:

1. I want to have all the rules tested at least minimally. I currently have like half of them running tests. For the bare minimum tests, I would like to at least grab all of the pass/fail examples listed for each rule for jsx-a11y (e.g., here https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md), and make sure that all the different forms of styled components can handle them (styled.{html tag}, styled.{html tag}.attrs() styled(Component)``, and <Component as="{some other tag}"). I have a helper function that already creates all of these test cases for you. You basically tell it the tag, the attrs, the props, the children, and the error (all of these are strings and are optional). For example, this would create an array of the following strings that you could then run tests on to make sure the correct linter rule fired:
   This:

```

const clickKeyDown = makeStyledTestCases({
tag: 'a',
attrs: '{ onClick:() => 0, onKeyDown: foo }',
props: 'onClick={() => 0} onKeyDown={foo}',
children: 'some text'
});

```

would create an array of objects with the key 'code' having the following strings respectively

- (tag is set to a, props is the string from 'props', and children are present inside styled component)

```

const FUNC = styled.a``;
const Component = () => <FUNC onClick={() => 0} onKeyDown={foo}>some text</FUNC>

```

- (tag is set to a, attrs is the string from 'attrs', and children are present inside styled component)

```

const FUNC = styled.a.attrs({ onClick:() => 0, onKeyDown: foo })``;
const Component = () => <Component>some text</Component>

```

- the same thing but using an extended component

```

const FUNC = styled.a.attrs({ onClick:() => 0, onKeyDown: foo })`; const Extended = styled(FUNC)`;
const Component = () => <Extended>some text</Extended>

```

- the same thing but with the as prop (the initial component is just anything other than what you put in as the tag)

```

const FUNC = styled.div.attrs({ onClick:() => 0, onKeyDown: foo })`; const Extended = styled(FUNC)`;
const Component = () => <Extended as="a">some text</Extended>

````

to test error cases, you add the errors parameter to makeStyledTestCases, which will pass if the correct error fires

See if you can add some more rules. When the rules error out, best bet is to log whatever the failing role is, and then take all those test cases, paste them into a project that is running eslint-plugin-styled-components-a11y, and just trace the code to see why it is either firing when it shouldn't or not firing when it should. The way i have been doing this (which is kind of painful) is to go into your node_modules and start by just getting the rule to fire. for this you either want to look in src/collectStyledComponentData.js (if the problem is with collecting the data for the styled component), or more frequently in the relevant parser file in src/nodeParsers. Look at src/ruleNameToTypeDict to see what parser goes with what rule. When you have the right file, i generally start out by just getting the linter to fire off with a hello world. Each parser file has a helper function in it called 'func'. it looks like this:

```const func = inspectee => name.includes('scope') && context.report(node, inspect(inspectee || node));

````

put the name of the rule in where the example says 'scope' (so it only runs once for that rule instead of on every rule) and call it with either the node you want to log (which is what eslint is parsing. it runs over every node in the code's abstract syntax tree and calls your lining rules), or anything else you want to log. immediately after you run fund (at first, at the top of the file), add a return statement, as sometimes the linter is erroring out, and thus won't log unless you short-circuit it before the error. For example, if i were testing the rule accessible-emoji i would have the following to start:

```
const func = inspectee => name.includes('accessible-emoji') && context.report(node, inspect(inspectee || node));
fund('hello world');
return;
```

When you reload your editor (this is necessary unfortunately), you should see hello world as an error on the styled component. Then you just work your way through the code until you can see where it is erroring out or not passing the correct data through.

2. the rule currently does not handle imports, only components defined within a single file. I would like to change from the current setup, where i create a dictionary with all the styled components names (eg, if the declaration is ` const Func = styled.div.attrs({foo:'bar'})``; ` the component dictionary i make looks like this `{ Func : { tag: 'div', attrs: {foo:'bar'} }`), to keying off the name of the component and the filename, e.g. change Foo to '/users/brendan/components/Tab\_\_Func'. Look to the eslint rule import/no-cycle for some guidance on how to possibly do this

3. just generally setting up the library so it is easier to run and more polished(e.g., not having to explicitly name all the rules in the eslintrc, added some default rule configurations, etc.)

4. there are a lot of edge cases in terms of both the function and arrow function syntax for attrs (e.g.,

````
styled.div.attrs(p => p.large ? ({foo:'bar', baz: p.small ? 1 : 2}))``;```
````

and just expressions in general for all the attributes and props, especially handling template strings with embedded expressions. This is pretty complex though, and no linter is perfect, so this should probably wait until the end
