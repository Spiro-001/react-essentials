import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./BasicList.css";

type BasicListProp = {
  bStyle?: Record<string, string>;
  aSetting?: Record<string, string | number>;
  onClick(
    event: any,
    list: Record<number, string>,
    manageList: React.Dispatch<React.SetStateAction<Record<number, string>>>
  ): void;
  ifEmpty?: any;
  listObjectsProp?: Record<number, string>;
  setListObjectsProp?: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
  children?: React.ReactNode;
};

type listElementProp = {
  idx: number;
  order: string;
};

export const BasicList = ({
  bStyle,
  aSetting = {
    opacity: 0,
    height: 0,
    padding: "0px 24px",
    duration: 0.3,
  },
  onClick,
  listObjectsProp = {},
  setListObjectsProp,
  ifEmpty = "This list is empty.",
  children,
}: BasicListProp) => {
  const [listObjects, setListObjects] =
    useState<Record<number, string>>(listObjectsProp);
  const [gsapTimeLine, setGsapTimeline] = useState<GSAPTween | null>(null);
  const [action, setAction] = useState<boolean>(false);

  const bListRef = useRef<Record<string, HTMLSpanElement | null>>({});
  const bListDivRef = useRef<HTMLDivElement | null>(null);
  const noListRef = useRef<HTMLDivElement | null>(null);
  const listLength = useRef<number | null>(Object.keys(listObjectsProp).length);

  const defaultStyle = {
    minHeight: "300px",
    minWidth: "200px",
  };

  const defaultStyleNoItems = {
    minHeight: "300px",
    minWidth: "200px",
  };

  const lClick = (element: React.MouseEvent<HTMLSpanElement>) => {
    setGsapTimeline(
      gsap.to(element.target, {
        ...aSetting,
        onComplete: () => {
          onClick(
            element,
            setListObjectsProp ? listObjectsProp : listObjects,
            setListObjectsProp ? setListObjectsProp : setListObjects
          );
          setAction(true);
        },
      })
    );
  };

  useEffect(() => {
    console.log(listLength.current);
    for (const key in bListRef.current) {
      if (!bListRef.current[key] && listLength.current) {
        listLength.current -= 1;
        delete bListRef.current[key];
      }
    }
    gsapTimeLine?.revert();
    let lastIndex = Object.keys(bListRef.current).pop();
    if (
      lastIndex &&
      listLength.current &&
      !action &&
      parseInt(lastIndex) > listLength.current
    ) {
      listLength.current += 1;
      let newElement = bListRef.current[listLength.current];
      const tl = gsap.to(newElement, {
        opacity: 0,
        height: 0,
        padding: "0px 24px",
        duration: 0.3,
      });
      tl.progress(1);
      tl.reverse();
    } else if (
      Object.keys(bListRef.current).length === 1 &&
      listLength.current === 0
    ) {
      let firstElement = Object.keys(bListRef.current)[0];
      const tl = gsap.to(bListRef.current[firstElement], {
        opacity: 0,
        height: 0,
        padding: "0px 24px",
        duration: 0.3,
      });
      tl.progress(1);
      tl.reverse();
      listLength.current += 1;
    }

    if (
      Object.keys(setListObjectsProp ? listObjectsProp : listObjects).length ===
      0
    ) {
      const tl = gsap.to(noListRef.current, {
        opacity: 0,
        height: 0,
        padding: "0px 24px",
        duration: 0.3,
      });
      tl.progress(1);
      tl.reverse();
    }

    setAction(false);
  }, [setListObjectsProp ? listObjectsProp : listObjects]);

  const listElement = (idx: number, order: string) => {
    return (
      <span
        onClick={lClick}
        className="list-item"
        key={idx}
        id={order}
        ref={(ref) => {
          bListRef.current[order] = ref;
        }}
      >
        {listObjectsProp[parseInt(order)]}
      </span>
    );
  };

  if (
    Object.keys(setListObjectsProp ? listObjectsProp : listObjects).length !==
      0 ||
    children
  ) {
    return (
      <div
        style={bStyle ? bStyle : defaultStyle}
        className="basic-list"
        ref={bListDivRef}
      >
        {children
          ? children
          : Object.keys(listObjectsProp).map((order, idx) => {
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
