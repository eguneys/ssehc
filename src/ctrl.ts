import { Config } from './config';
import { nt, f, db, p } from 'nefs';

export default class Ctrl {

  situation: nt.Situation
  lastMove: Array<nt.Pos>

  constructor(opts: Config) {
    this.lastMove = [];
    this.situation = f.situation(opts.fen ? opts.fen : nt.initialFen) as nt.Situation;
    if (opts.lastMove) {
      this.lastMove.push(db.poss.pget(p.fByKey(opts.lastMove[0] as nt.FileKey),
                                      p.rByKey(opts.lastMove[1] as nt.RankKey)));
      this.lastMove.push(db.poss.pget(p.fByKey(opts.lastMove[2] as nt.FileKey), 
                                      p.rByKey(opts.lastMove[3] as nt.RankKey)));
    }
  }
  
}
