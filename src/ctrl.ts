import { Sub } from './util';
import { Config } from './config';
import { nt, f, db, p } from 'nefs';

export function parseUci(uci: string) {
  if (uci.length === 4) {
    let p1 = p.mPosKey(uci.substring(0, 2)),
    p2 = p.mPosKey(uci.substring(2, 4));
    if (p1 && p2) {
      return [p1, p2].map(_ => p.pByKey(_));
    }
  }
}

export default class Ctrl {

  sSituation: Sub<nt.Situation>
  sLastMove: Sub<Array<nt.Pos>>

  constructor(opts: Config) {
    this.sLastMove = new Sub<Array<nt.Pos>>([]);
    this.sSituation = new Sub<nt.Situation>(f.situation(opts.fen ? opts.fen : nt.initialFen) as nt.Situation);

    if (opts.lastMove) {
      let m1 = db.poss.pget(p.fByKey(opts.lastMove[0] as nt.FileKey),
                            p.rByKey(opts.lastMove[1] as nt.RankKey)),
      m2 = db.poss.pget(p.fByKey(opts.lastMove[2] as nt.FileKey),
                        p.rByKey(opts.lastMove[3] as nt.RankKey));
      this.sLastMove
        .apply(_ => {
          _.push(m1);
          _.push(m2);
        });
    }
  }

  fen(fen: string) {
    let s = f.situation(fen);
    if (s) {
      this.sSituation.trigger(s);
    }
  }

  lastMove(lastMove: string) {
    let _lastMove = parseUci(lastMove);

    if (_lastMove) {
      this.sLastMove.trigger(_lastMove);
    }
  }

  trigger() {
    this.sSituation.trigger();
    this.sLastMove.trigger();
  }
  
}
