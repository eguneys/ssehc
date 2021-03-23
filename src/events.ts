import { Sub, Mem } from './util';

export default function events<A>(element: Element, sub: Sub<Mem<DOMRect>>) {
  
  if ('ResizeObserver' in window) {
    const observer = new(window as any)['ResizeObserver'](() => {
      sub.val.clear();
      sub.trigger();
    });
    observer.observe(element);
  }
  
}
