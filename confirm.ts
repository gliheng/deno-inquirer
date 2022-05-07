import { color, readLines } from './deps.ts';
import { print } from './utils/io.ts';

const defaultOpts = {
  default: true,
};

export async function confirm(_opts: {
  message: string;
  default?: boolean;
}) {
  const opts = Object.assign({}, defaultOpts, _opts);
  const choice = opts.default ? 'Y/n' : 'y/N';
  const prompt = `${color.green('?')} ${opts.message} ${color.gray(choice)} `;
  await print(prompt);
  const ret = await readLines(Deno.stdin).next();
  const c = ret.value.toLowerCase();
  if (c) {
    if (c == 'y') {
      return true;
    }
    return false;
  }
  return opts.default;
}
