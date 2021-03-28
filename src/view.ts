import { h, vh, vmap, VHNode } from 'hhh';
import { nt } from 'nefs';
import Ctrl from './ctrl';
import { Mem, Sub, ffPosToTranslateAbs } from './util';

export function styleTransform(pos: [number, number]) {
  return (elm: Node) => {
    (elm as HTMLElement).style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
  };
}

export default function(ctrl: Ctrl) {

  let fPosToTranslate = (pos: nt.Pos) => pos as number[];

  let v$Pieces = vmap([] as Array<any>, (props, parentProps) =>
    vh('piece', props, {
      klassList: ({ piece }: { piece: nt.Piece }) => [nt.longColor[piece.color], 
                                 nt.longRole[piece.role]],
      element: ({ pos, fPosToTranslate }) =>
        styleTransform(fPosToTranslate(pos))
    }, [], parentProps), { fPosToTranslate });

  
  let v$LastMoves = vmap([] as Array<any>, (props, parentProps) =>
    vh('square.last-move', props,
       { element: ({ pos, fPosToTranslate }) =>
         styleTransform(fPosToTranslate(pos))
       }, [], parentProps), { fPosToTranslate });

  let v$board = h('md-board', [
    v$LastMoves,
    v$Pieces
  ]);

  let v$coRanks = vh('coords.ranks', {}, {
    klassList: ({turn}: {turn: nt.Color}) => [nt.longColor[turn]]
  }, nt.ranks.map((_: string) => h('coord', _))),
  v$coFiles = vh('coords.files', {}, {
      klassList: ({turn}: {turn: nt.Color}) => [nt.longColor[turn]]
  }, nt.files.map((_: string) => h('coord', _)));

  ctrl.sSituation.sub((situation: nt.Situation) => {

    let { board, turn } = situation;

    v$coRanks.update({turn});
    v$coFiles.update({turn});

    let pieceProps = 
      Array.from(board.entries())
        .map(([pos, piece]) => ({ pos, piece }));

    v$Pieces.update(pieceProps);
  });

  ctrl.sLastMove.sub((lastMove: Array<nt.Pos>) => {
    v$LastMoves.update(lastMove.map(pos => ({pos})));
  });

  const onResize = (bounds: ClientRect) => {
    let _fpt = ffPosToTranslateAbs(bounds);
    v$LastMoves.updateProp({fPosToTranslate: _fpt});
    v$Pieces.updateProp({fPosToTranslate: _fpt});
  };
                 
  return h('md-wrap', {
    resize: onResize
  }, [
    v$board,
    v$coRanks,
    v$coFiles
  ]);
}
