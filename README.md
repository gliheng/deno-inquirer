# Inquirer

Interactive command line user interfaces for deno.


> This lib requires `--unstable --allow-env` flag to run

## confirm

```ts
import { confirm } from 'https://deno.land/x/inquirer/mod.ts';

let ret = await confirm({
  message: 'Would you like a cup of ☕?',
});
```

## select
```ts
import { select } from 'https://deno.land/x/inquirer/mod.ts';

let ret = await select({
  message: 'Which is your favorite fruit',
  options: [
    'Apple',
    'Orange',
    'Banana',
  ],
});
```
