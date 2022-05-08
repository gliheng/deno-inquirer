import { ansi } from '../../deps.ts';

export async function print(s: string) {
  const text = new TextEncoder().encode(s);
  await Deno.write(Deno.stdout.rid, text);
}

// This PR https://github.com/justjavac/deno_ansi/pull/1 fixes upstream
export function eraseLines(count: number) {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += ansi.eraseLine() + (i < count - 1 ? ansi.cursorUp() : '');
	}

  if (count) {
    clear += ansi.cursorHorizontal();
  }

	return clear;
}
