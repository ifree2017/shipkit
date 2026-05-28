# CLI Split

ShipKit CLI has been split from a single large `bin/sk.js` file into a small command dispatcher plus reusable command and library modules.

## Layout

```text
bin/sk.js
commands/
  init.js
  new.js
  classify.js
  check.js
  up.js
lib/
  args.js
  context.js
  fsx.js
  gates.js
  paths.js
  profiles.js
  project.js
  registry.js
  yaml.js
```

## Why

The CLI is expected to grow with commands such as:

```text
sk hive ...
sk graph ...
sk spec ...
sk vet ...
sk project ...
sk stage ...
```

Keeping all behavior in `bin/sk.js` would make the CLI hard to test and maintain. The new layout keeps `bin/sk.js` as a dispatcher only.

## Compatibility

Existing commands should keep their behavior:

```bash
sk init codex --to ./tmp-codex
sk init openclaw --to ./tmp-openclaw
sk new demo --profile standard-team --to ./tmp-demo
sk classify --project ./tmp-demo
sk check --project ./tmp-demo
sk check list
sk up
```

## Next steps

Future CLI commands should follow this pattern:

1. Create `commands/<name>.js`.
2. Put shared logic in `lib/`.
3. Keep `bin/sk.js` limited to argument dispatch.
4. Add or update selftests for the command.
