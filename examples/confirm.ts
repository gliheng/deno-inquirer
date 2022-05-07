#!/usr/bin/env -S deno run --unstable --allow-env

import { confirm } from '../mod.ts';

let ret;
ret = await confirm({
  message: 'Would you like a cup of ☕?',
});

console.log(`Your choice ${ret}`);

ret = await confirm({
  message: 'Would you like a cup of ☕?',
  default: false,
});

console.log(`Your choice ${ret}`);
