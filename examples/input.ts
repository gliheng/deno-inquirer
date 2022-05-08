#!/usr/bin/env -S deno run --unstable --allow-env

import { input } from '../mod.ts';
let ret;

ret = await input({
  message: 'Which is your favorite fruit?',
});

console.log('Your choice', ret);

ret = await input({
  message: 'Which pet do you prefer?',
  default: 'Dog',
});
  
console.log('Your choice', ret);
