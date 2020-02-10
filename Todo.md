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
  - runs once for each prop instead of just once
  - does not run if zero props added
  - location is set to entire component. would be better at the attrs obj
