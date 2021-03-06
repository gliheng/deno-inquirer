import { readKeypress, color, ansi } from '../deps.ts';
import { print } from './utils/io.ts';

const defaultOpts = {};

interface Option<T> {
  label: string;
  value: T;
}

export async function select<T>(_opts: {
  message: string;
  options: Option<T>[];
  default?: T;
}): Promise<T>;
export async function select(_opts: {
  message: string;
  options: string[];
  default?: string;
}): Promise<string>;
export async function select(_opts: {
  message: string;
  options: unknown[];
  default?: unknown;
}): Promise<unknown> {
  if (_opts.options.length == 0) throw 'select requires non empty list of options';

  const opts = Object.assign({}, defaultOpts, _opts);
  const { options } = opts;
  // Normalize options
  let optionList: Option<unknown>[];
  if (typeof options[0] == 'string') {
    optionList = (options as string[]).map(e => ({label: e, value: e}));
  } else {
    optionList = options as Option<unknown>[];
  }

  const len = optionList.length;
  let idx = 0;
  if (opts.default) {
    const { default: dft } = opts;
    idx = optionList.findIndex(e => dft == e.value);
    if (idx == -1)
      throw `Default option ${dft} is not included in option list`;
  }
  console.log(`${color.green('?')} ${opts.message}`);
  const printOptions = () => {
    for (const [i, opt] of optionList.entries()) {
      const selected = idx == i;
      const selChar = selected ? '❯' : ' ';
      const s = `${selChar} ${opt.label}`;
      console.log(selected ? color.green(s) : s);
    }
  };

  const eraseOptions = async () => {
    await print(ansi.eraseLines(len + 1));
  };

  await print(ansi.cursorHide());
  printOptions();
  let ret;
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
      ret = optionList[idx].value;
      break;
    } else if (ctrlKey && key === 'c') {
      Deno.exit()
    }
  }

  await eraseOptions();
  await print(ansi.cursorShow());
  if (ret) return ret;
  throw 'Noop';
}
