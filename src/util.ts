import { nt } from 'nefs';

export type FUse<A> = (_: A) => void

export class Sub<A> {
  private fn: () => A
  private subs: FUse<A>[]

  constructor(fn: () => A) {
    this.subs = [];
    this.fn = fn;
  }

  sub(fn: FUse<A>) {
    this.subs.push(fn);
  }

  trigger() {
    let val = this.fn();
    this.subs.forEach(_ => _(val));
  }
}

const posToTranslateBase = (pos: nt.Pos, xFactor: number, yFactor: number) => [
  (pos[0] - 1) * xFactor,
  (8 - pos[1]) * yFactor
];

export function ffPosToTranslateAbs(bounds: ClientRect) {
  let xFactor = bounds.width / 8,
  yFactor = bounds.height / 8;

  return (pos: nt.Pos) =>
    posToTranslateBase(pos, xFactor, yFactor);
}
