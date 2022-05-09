import { progress } from '../mod.ts';

await progress({
  message: 'Work is in progress',
  style: 'bar',
  run({ done, progress }) {
    let i = 0;
    const run = () => {
      if (i < 100) {
        i += 10;
        progress(i);
        setTimeout(run, 200);
      } else {
        done();
      }
    };
    run();
  },
});

await progress({
  message: 'Another work is in progress',
  style: 'spinner',
  run({ done }) {
    setTimeout(done, 5000);
  },
});
