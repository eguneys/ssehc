import { nt } from 'nefs';
import { h, VNode } from 'hhh';
import Ctrl from './ctrl';
import { Sub, FUse, ffPosToTranslateAbs } from './util';

export function fTranslateAbs(elm: HTMLElement, pos: nt.Pos) {
  elm.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
}

export default function(ctrl: Ctrl, sbounds: Sub<any>) {

  let { situation: { board, turn }, lastMove } = ctrl;

  let vPieces: Array<VNode> = [];
  let ePieces: Array<FUse<any>> = [];

  board.forEach((piece: nt.Piece, pos: nt.Pos) => {
    let colorS = nt.longColor[piece.color],
    roleS = nt.longRole[piece.role];
    let vpiece = h(`piece.${colorS}.${roleS}`);

    ePieces.push((fPosToTranslate) => {
      fTranslateAbs(vpiece.elm as HTMLElement, fPosToTranslate(pos)) });

    vPieces.push(vpiece);
  });

  let vLastMoves: Array<VNode> = [],
  eLastMoves: Array<FUse<any>> = [];

  lastMove.forEach((pos: nt.Pos) => {
    let vLastMove = h('square.last-move');
    vLastMoves.push(vLastMove);
    eLastMoves.push((fPosToTranslate) => {
      fTranslateAbs(vLastMove.elm as HTMLElement, fPosToTranslate(pos))});
  });

  let vboard = h('md-board', [
    ...vLastMoves,
    ...vPieces
  ]);

  sbounds.sub((bounds: ClientRect) => {
    let fPosToTranslate = ffPosToTranslateAbs(bounds);
    ePieces.forEach(_ => _(fPosToTranslate));
    eLastMoves.forEach((_: FUse<any>) => _(fPosToTranslate));
  });
                 
  return h('md-wrap', [
    vboard,
    h('coords.ranks.' + nt.longColor[turn],
      nt.ranks.map((_: string) => h('coord', _))),
    h('coords.files.' + nt.longColor[turn],
      nt.files.map((_: string) => h('coord', _))),
  ]);
}
