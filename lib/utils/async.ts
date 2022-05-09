export function deferred<T>() {
  let resolve, reject;
  let promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve: resolve as any as (v: T) => void,
    reject: reject as any as (reason: any) => void,
  };
}
