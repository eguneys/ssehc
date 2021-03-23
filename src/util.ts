import { nt } from 'nefs';

export type FUse<A> = (_: A) => void

export type Mem<A> = {
  (): A,
  clear: () => void
}

export function mem<A>(f: () => A): Mem<A> {
  let val: A | undefined = undefined;

  let res: any = (): A => {
    if (!val) {
      val = f();
    }
    return val;
  };

  res.clear = () => {
    val = undefined;
  };
  return res;
}

export class Sub<A> {
  val: A
  private subs: FUse<A>[]

  constructor(val: A) {
    this.val = val;
    this.subs = [];
  }

  apply(fn: (_: A) => void) {
    fn(this.val);
  }

  sub(fn: FUse<A>) {
    this.subs.push(fn);
  }

  isub(fn: FUse<A>) {
    this.subs.push(fn);
    fn(this.val);
  }

  trigger(val?: A) {
    this.val = val || this.val;

    this.subs.forEach(_ => _(this.val));
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
