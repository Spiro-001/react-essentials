import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void, MouseEvent: 'mousedown' | 'mouseup' = 'mousedown'): void {
    useEffect(
      () => {
        const listener = (event: Event) => {
          if (!ref.current || ref.current.contains(event?.target as Node)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
  }