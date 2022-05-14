import { color, readLines } from '../deps.ts';
import { print } from './utils/io.ts';


const defaultOpts = {};

export async function input(_opts: {
  message: string;
  default?: string;
}) {
  const opts = Object.assign({}, defaultOpts, _opts);
  const { default: dft } = opts;
  const prompt = [color.green('?'), opts.message];
  if (dft) {
    prompt.push(color.gray(dft));
  }
  prompt.push('');
  await print(prompt.join(' '));
  const ret = await readLines(Deno.stdin).next();
  return ret.value || dft;
}
