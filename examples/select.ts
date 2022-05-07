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
