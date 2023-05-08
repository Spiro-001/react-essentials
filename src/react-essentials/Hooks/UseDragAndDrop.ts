import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

export function UseDragAndDrop<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  MouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  const dragObject = () => {};
  handler();
}
