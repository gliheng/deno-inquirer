import { readKeypress, green, cursorUp } from './deps.ts';

const defaultOpts = {};
export async function select(_opts: {
  message: string;
  options: string[];
  default?: string;
}) {
  if (_opts.options.length == 0) throw 'select requires non empty list of options';

  const opts = Object.assign({}, _opts, defaultOpts);
  console.log(`${green('?')} ${opts.message}`);
  let idx = 0;
  const printOptions = () => {
    for (const [i, opt] of opts.options.entries()) {
      const selected = idx == i;
      const selChar = selected ? '❯' : ' ';
      const s = `${selChar} ${opt}`;
      console.log(selected ? green(s) : s);
    }
  };

  const { options } = opts;
  const len = options.length;
  printOptions();
  for await (const evt of readKeypress()) {
    const { key, ctrlKey } = evt;
    if (key == 'down') {
      console.log(cursorUp(len + 1));
      idx = (idx + 1) % len;
      printOptions();
    } else if (key == 'up') {
      console.log(cursorUp(len + 1));
      idx = (idx - 1 + len) % len;
      printOptions();
    } else if (key == 'return') {
      return options[idx];
    } else if (ctrlKey && key === 'c') {
      throw 'Noop';
    }
  }
}
