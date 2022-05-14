import { color, ansi } from '../deps.ts';
import { print } from './utils/io.ts';
import { deferred } from './utils/async.ts';

type ProgressStyle = 'bar' | 'spinner';

const defaultOpts = {
  style: 'bar',
  barChar: '▉',
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
  let p = 0;
  const render = () => {
    if (i != 0) {
      print(ansi.eraseLines(1));
    }
    print(opts.message + ' ');
    if (style == 'spinner') {
      print(spinnerList[i % spinnerList.length]);
    } else if (style == 'bar') {
      const total = 60;
      const barSize = 40;
      const label = `${p}%`;
      const bar = opts.barChar.repeat(Math.round(p/100 * barSize));
      print('[' + color.red(bar) + ' '.repeat(barSize - bar.length) + ']' + ' '.repeat(total - barSize - label.length) + label);
    }
    i++;
  };

  const done = (v?: T) => {
    p = 100;
    render();
    print("\n");
    if (spinTimer) {
      clearInterval(spinTimer);
      spinTimer = 0;
    }
    ret.resolve(v);
  };
  const progress = (pct: number) => {
    p = Math.min(pct, 100);
    render();
  };

  opts.run({
    progress, done,
  });

  let spinTimer: ReturnType<typeof setInterval>;
  // print(ansi.cursorHide());
  if (style == 'spinner') {
    spinTimer = setInterval(render, 250);
  }
  render();
  return ret.promise;
}
