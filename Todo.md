## recheck
- no-access-key
- mouse-events-have-key-events
  lang ang html-has-lang appear to be identical. i thus removed lang. make sure rule isn't somehow different

## cant get regular to work correctly

- autocomplete-valid (can't get this to fire.add rule/file when ready)
- label-has-associated-control (fires when it shouldn't):

```
function Foo(props) {
    const {
        htmlFor,
        ...otherProps
    } = props;

   return <label htmlFor={htmlFor} {...otherProps} />
}
```

```
<label>
  <input type="text" />
  Surname
</label>
```

## look into

- attrs and props with using children directly like in anchor-has-content, e.g. attrs: {children: () => <Bar aria-hidden>}
- media-has-caption with attrs (child element is track)
- non styled Component inputs to Styled (like, Link. currently just disregard but maybe there is a way to figure out tag)

## bugs/improvements

- JSXAttribute for attr:
  - location is set to entire component. would be better at the attrs obj
- the value for template literals is definitely bullshit. need to evaluate the tree to figure out how to handle
- need a way to make sure plugin doesnt crash eslint regardless of parsing difficulties
- need to set tests to handle more varietes of keys/values, specifically should have at least handle everything surrounded by all types of string quotes
- add support for object syntax (const Button = styled.button({ color: 'blue' }));
- add optional params to change the name from styled

## tests to revisit (first four mimic actual tests instead of npm docs.)

- alt-text
  - alt-text has a bunch of false positives commented out as well as the below which does not cause an error
    // TODO this one does not work because of the template string evaluation
    // <img {...props} alt={`${undefined}`} /> // Has no value
    const imgPropsSpreadUndefinedAltTemplate = makeStyledTestCases({
    attrs: '{ ...props, alt:`${undefined}` }',
    props: ' {...props} alt={`${undefined}`} ',
    tag: 'img',
    errors: [altValueError('img')],
    });
- click-events-have-jey-events
- scope
- tabindex-no-positive

## Post

I've been working on an eslint plugin to solve this issue in my spare time.You can use it now if you clone the repo, but I want to make it more robust/add more tests before releasing it on npm to make sure it's solid enough for production use. If anyone is interested in helping out to expedite the process, here is the repo: https://github.com/brendanmorrell/eslint-plugin-jsx-a11y-styled-components

It handles all 4 methods styled components uses to create components. All of these would show the error `Visible, non-interactive elements with click handlers must have at least one keyboard listener.`

1. const Div = styled.div\`\`;
   &lt;Div onClick={() => null}/>.
2. const Div = styled.div.attrs({ onClick: () => null})\`\`;
   &lt;Div />
3. const StyledDiv = styled(Div)\`\`;
   &lt;StyledDiv onClick{() => null} />
4. const ButtonAsDiv = styled.button\`\`;
   &lt;ButtonAsDiv as="div" onClick={() => null} />
