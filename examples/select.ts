#!/usr/bin/env -S deno run --unstable --allow-env

import { select } from '../mod.ts';
let ret;

ret = await select({
  message: 'Which is your favorite fruit?',
  options: [
    'Apple',
    'Orange',
    'Banana',
  ],
});

console.log('Your choice', ret);

ret = await select({
  message: 'Which pet do you prefer?',
  default: 'Dog',
  options: [
    'Cat',
    'Dog',
    'Hamster',
    'Parrot',
  ],
});

console.log('Your choice', ret);

ret = await select({
    message: 'Which letter do you like best?',
    default: 3,
    options: [
      {label: 'A', value: 1},
      {label: 'B', value: 2},
      {label: 'C', value: 3},
      {label: 'D', value: 4},
      {label: 'E', value: 5},
    ],
  });
  
  console.log('Your choice', ret);
  