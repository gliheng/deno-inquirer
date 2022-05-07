import { readKeypress, green, cursorUp } from './deps.ts';
import { print } from './utils/io.ts';

const defaultOpts = {};
export async function select(_opts: {
  message: string;
  options: string[];
  default?: string;
}) {
  if (_opts.options.length == 0) throw 'select requires non empty list of options';

  const opts = Object.assign({}, _opts, defaultOpts);
  const { options } = opts;
  const len = options.length;
  let idx = 0;
  if (opts.default) {
    const { default: dft } = opts;
    idx = options.indexOf(dft);
    if (idx == -1)
      throw `Default option ${dft} is not included in option list`;
  }
  console.log(`${green('?')} ${opts.message}`);
  const printOptions = () => {
    for (const [i, opt] of opts.options.entries()) {
      const selected = idx == i;
      const selChar = selected ? '❯' : ' ';
      const s = `${selChar} ${opt}`;
      console.log(selected ? green(s) : s);
    }
  };

  printOptions();
  for await (const evt of readKeypress()) {
    const { key, ctrlKey } = evt;
    if (key == 'down') {
      print(cursorUp(len));
      idx = (idx + 1) % len;
      printOptions();
    } else if (key == 'up') {
      await print(cursorUp(len));
      idx = (idx - 1 + len) % len;
      printOptions();
    } else if (key == 'return') {
      return options[idx];
    } else if (ctrlKey && key === 'c') {
      throw 'Noop';
    }
  }
}
