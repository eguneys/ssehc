import { vinit } from 'hhh';
import Api from './api';
import view from './view';
import Ctrl from './ctrl';
import { mem, Sub } from './util';
import { Config } from './config';
import events from './events';

export default function app(element: Element, opts: Config = {}): Api {
  let reconcile = vinit();

  let _ctrl = new Ctrl(opts);

  let vnode = view(_ctrl);
  let $app = reconcile(vnode);

  _ctrl.trigger();
  element.appendChild($app);
  return new Api(_ctrl);
}



