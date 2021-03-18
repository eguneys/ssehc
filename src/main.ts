import { init } from 'hhh';
import view from './view';
import Ctrl from './ctrl';
import { Sub } from './util';
import { Config } from './config';
import events from './events';

export default function app(element: Element, opts: Config = {}) {
  let reconcile = init();

  let _ctrl = new Ctrl(opts);

  let sbounds = new Sub(() => element.getBoundingClientRect());

  let vnode = view(_ctrl, sbounds);
  let $app = reconcile(vnode);

  sbounds.trigger();
  element.appendChild($app);
  events(element, sbounds);
}



