export async function print(s: string) {
  const text = new TextEncoder().encode(s);
  await Deno.write(Deno.stdout.rid, text);
}