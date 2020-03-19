# eslint-plugin-jsx-a11y-styled-components

## Available Scripts
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
const StyledDiv = styled(Div)``;
<StyledDiv onClick{() => null} />
```

```
const ButtonAsDiv = styled.button``;
<ButtonAsDiv as="div" onClick={() => null} />
```
  
## Examples
a working repo can be found at https://github.com/brendanmorrell/styled-components-a11y-example which has a file illustrating the linting rules in action for the above four styled component types for which the library is currently capable of handling

## IMPORTANT

This library is currently a work in progress. At the moment, some of the rules do not fire in all cases, and there is some debugging and testing still to be done.

Also, as the library is not fully packaged and prod ready; you currently have to manually enable each rule in the .eslintrc.js file (as shown in this example repo). Without this, none of the rules will fire. I will post updates to this as I make progress on the project.

## Contributing

Contributions are very welcome, as I don't have a lot of free time to work on this currently. My personal todo list is in Todo.md. I will try to make this more intelligible to other contributors, but if you'd like to start before I get around to that, let me know, and I can tell you what still needs work. Thanks!
