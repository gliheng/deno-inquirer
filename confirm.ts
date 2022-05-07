import { gray, green, readLines } from './deps.ts';

const defaultOpts = {
  default: true,
};

export async function confirm(_opts: {
  message: string;
  default?: boolean;
}) {
  const opts = Object.assign({}, defaultOpts, _opts);
  const choice = opts.default ? 'Y/n' : 'y/N';
  const s = `${green('?')} ${opts.message} ${gray(choice)} `;
  const text = new TextEncoder().encode(s);
  await Deno.write(Deno.stdout.rid, text);

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
