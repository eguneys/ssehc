import { Sub } from './util';
import { Config } from './config';
import { nt, f, db, p } from 'nefs';

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

  trigger() {
    this.sSituation.trigger();
    this.sLastMove.trigger();
  }
  
}
