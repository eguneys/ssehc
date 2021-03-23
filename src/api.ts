import { Sub, Mem } from './util';
import Ctrl from './ctrl';

export default class Api {
  
  ctrl: Ctrl

  constructor(ctrl: Ctrl) {
    this.ctrl = ctrl;
  }

  fen(fen: string) {
    this.ctrl.fen(fen);
  }
}
