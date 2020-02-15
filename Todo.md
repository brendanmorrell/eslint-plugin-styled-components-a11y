## recheck but seem unnecessary until attrs worked out

- aria-role
- aria-props
- aria-proptypes
- no-access-key
- mouse-events-have-key-events
- accessible-emoji

## cant get regular rule to fire even

- autocomplete-valid (add rule/file when ready)

## look into

- media-has-caption with attrs (child elmeent is track)

## bugs/improvements

- JSXAttribute for attr:
  - location is set to entire component. would be better at the attrs obj
- the value for template literals is definitely bullshit. need to evaluate the tree to figure out how to handle
- need a way to make sure plugin doesnt crash eslint regardless of parsing difficulties
- need to set tests to handle more varietes of keys/values, specifically should have at least handle everything surrounded by all types of string quotes
