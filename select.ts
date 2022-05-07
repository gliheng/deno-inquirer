import { readKeypress, color, ansi } from './deps.ts';
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
  console.log(`${color.green('?')} ${opts.message}`);
  const printOptions = () => {
    for (const [i, opt] of opts.options.entries()) {
      const selected = idx == i;
      const selChar = selected ? '❯' : ' ';
      const s = `${selChar} ${opt}`;
      console.log(selected ? color.green(s) : s);
    }
  };

  const eraseOptions = async () => {
    await print(eraseLines(len + 1));
  };

  await print(ansi.cursorHide());
  printOptions();
  for await (const evt of readKeypress()) {
    const { key, ctrlKey } = evt;
    if (key == 'down') {
      idx = (idx + 1) % len;
      await eraseOptions();
      printOptions();
    } else if (key == 'up') {
      idx = (idx - 1 + len) % len;
      await eraseOptions();      
      printOptions();
    } else if (key == 'return') {
      await eraseOptions();
      await print(ansi.cursorShow());
      return options[idx];
    } else if (ctrlKey && key === 'c') {
      await eraseOptions();
      await print(ansi.cursorShow());
      throw 'Noop';
    }
  }
}
// This PR https://github.com/justjavac/deno_ansi/pull/1 fixes upstream
function eraseLines(count: number) {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += ansi.eraseLine() + (i < count - 1 ? ansi.cursorUp() : '');
	}

  if (count) {
    clear += ansi.cursorHorizontal();
  }

	return clear;
}
