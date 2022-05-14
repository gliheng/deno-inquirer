import { color } from '../deps.ts';
import { print, eraseLines } from './utils/io.ts';
import { deferred } from './utils/async.ts';

type ProgressStyle = 'bar' | 'spinner';

const defaultOpts = {
  style: 'bar',
};

const spinnerList = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
  
export function progress<T>(_opts: {
  run: (args: {
    progress: (n: number) => void;
    done: (ret?: T) => void;
  }) => void,
  message: string;
  style?: ProgressStyle;
}) {
  const ret = deferred<T | undefined>();
  const opts = Object.assign({}, defaultOpts, _opts);
  const { style } = opts;
  let i = 0;
  const render = () => {
    if (i != 0) {
      print(eraseLines(1));
    }
    if (style == 'spinner') {
      print(spinnerList[i % spinnerList.length] + ' ');
    } else if (style == 'bar') {
      const barSize = 50;
      const total = 80;
      const label = `${i}%`;
      const bar = "#".repeat(Math.round(i/100 * barSize));
      print('[' + color.red(bar) + ' '.repeat(barSize - bar.length) + ']' + ' '.repeat(total - barSize - label.length) + label);
    }
  };

  const done = (v?: T) => {
    i = 100;
    render();
    print("\n");
    if (spinTimer) {
      clearInterval(spinTimer);
      spinTimer = 0;
    }
    ret.resolve(v);
  };
  const progress = (p: number) => {
    i = Math.min(p, 100);
    render();
  };

  opts.run({
    progress, done,
  });

  console.log(opts.message);
  let spinTimer: ReturnType<typeof setInterval>;
  // print(ansi.cursorHide());
  if (style == 'spinner') {
    spinTimer = setInterval(() => {
      render();
      i++;
    }, 250);
  }
  render();
  return ret.promise;
}
