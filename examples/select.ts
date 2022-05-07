#!/usr/bin/env -S deno run --unstable --allow-env

import { select } from '../mod.ts';

let ret;

ret = await select({
  message: 'Which is your favorite fruit',
  options: [
    'Apple',
    'Orange',
    'Banana',
  ],
});

console.log('Your choice', ret);

ret = await select({
    message: 'Which pet do you prefer',
    default: 'Dog',
    options: [
      'Cat',
      'Dog',
      'Hamster',
      'Parrot',
    ],
  });
  
  console.log('Your choice', ret);
  