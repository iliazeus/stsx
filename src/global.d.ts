declare global {
  namespace JSX {
    type Element = import("node:stream").Readable;
    type ElementClass = null;
    type IntrinsicElements = __ReactJSX.IntrinsicElements;
  }

  const STSX: typeof import("./index");
}
