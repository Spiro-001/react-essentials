import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import "./BasicList.css";

type BasicListProp = {
  bStyle?: Record<string, string>;
  onClick(
    event: any,
    list: Record<number, string>,
    manageList: React.Dispatch<React.SetStateAction<Record<number, string>>>
  ): void;
  ifEmpty?: any;
  listObjectsProp?: Record<number, string>;
  children?: React.ReactNode;
};

type listElementProp = {
  idx: number;
  order: string;
};

export const BasicList = ({
  bStyle,
  onClick,
  listObjectsProp = {},
  ifEmpty = "This list is empty.",
  children,
}: BasicListProp) => {
  const [listObjects, setListObjects] =
    useState<Record<number, string>>(listObjectsProp);

  const bListRef = useRef<Record<string, HTMLSpanElement | null>>({});
  const noListRef = useRef<HTMLDivElement | null>(null);
  const listObjectRef = useRef<Record<number, string>>(listObjects);

  const defaultStyle = {
    minHeight: "300px",
    minWidth: "200px",
  };

  const defaultStyleNoItems = {
    minHeight: "300px",
    minWidth: "200px",
  };

  const lClick = (element: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(element.target, {
      opacity: 0,
      height: 0,
      padding: "0px 24px",
      duration: 0.3,
    });
    onClick(element, listObjects, setListObjects);
  };

  useEffect(() => {
    if (Object.keys(listObjects).length === 0) {
      const tl = gsap.to(noListRef.current, {
        opacity: 0,
        height: 0,
        padding: "0px 24px",
        duration: 0.3,
        display: "none",
      });
      tl.progress(1);
      tl.reverse();
    }
  }, [listObjects]);

  const listElement = (idx: number, order: string) => {
    console.log(listObjects);
    return (
      <span
        onClick={lClick}
        className="list-item"
        key={idx}
        id={order}
        ref={(ref) => (bListRef.current[order] = ref)}
      >
        {listObjects[parseInt(order)]}
      </span>
    );
  };

  if (Object.keys(listObjects).length !== 0 || children) {
    return (
      <div style={bStyle ? bStyle : defaultStyle} className="basic-list">
        {children
          ? children
          : Object.keys(listObjectRef.current).map((order, idx) => {
              return listElement(idx, order);
            })}
      </div>
    );
  }
  return (
    <div style={bStyle ? bStyle : defaultStyleNoItems} className="basic-list">
      <span className="list-item" ref={noListRef}>
        {ifEmpty}
      </span>
    </div>
  );
};
