import { Readable } from "node:stream";
import { __ReactGlobal } from "./react";

declare global {
  namespace JSX {
    type Element = import("node:stream").Readable;
    type ElementClass = null;
    type IntrinsicElements = __ReactGlobal.JSX.IntrinsicElements;
  }
}

export function createElement(
  el: string | Function,
  props: Record<string, any>,
  ...children: Readable[]
): Readable {
  if (typeof el === "string") {
    return Readable.from(intrinsicElement(el, props, children));
  } else {
    return el({ ...props, children });
  }
}

async function* intrinsicElement(
  el: string,
  props: Record<string, any>,
  children: Readable[]
): AsyncIterable<Buffer> {
  yield Buffer.from(`<${el} `);

  for (const [key, value] of Object.entries(props ?? {})) {
    if (key === "children") continue;
    yield Buffer.from(` ${String(key)}="${String(value)}"`);
  }

  if (children.length === 0) {
    yield Buffer.from(`/>`);
    return;
  }

  yield Buffer.from(`>`);

  for (const child of children) {
    if (typeof child === "object" && child !== null && Symbol.asyncIterator in child) {
      yield* child;
    } else if (Buffer.isBuffer(child)) {
      yield child;
    } else {
      yield Buffer.from(String(child));
    }
  }

  yield Buffer.from(`</${el}>`);
}

export function Fragment(props: { children: Readable[] }): Readable {
  return Readable.from(fragment(props.children));
}

async function* fragment(children: Readable[]): AsyncIterable<Buffer> {
  for (const child of children) {
    yield* child;
  }
}
