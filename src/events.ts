import { Sub } from './util';

export default function events<A>(element: Element, sub: Sub<A>) {
  
  if ('ResizeObserver' in window) {
    const observer = new(window as any)['ResizeObserver'](() => sub.trigger());
    observer.observe(element);
  }
  
}
