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

export const BasicList = ({
  bStyle,
  onClick,
  listObjectsProp = {},
  ifEmpty = "This list is empty.",
  children,
}: BasicListProp) => {
  const [listObjects, setListObjects] =
    useState<Record<number, string>>(listObjectsProp);
  const [forceReload, setForceReload] = useState<number>(0);

  const bListRef = useRef<Record<string, HTMLSpanElement | null>>({});
  const noListRef = useRef<HTMLDivElement | null>(null);
  const listObjectRef = useRef<Record<number, string>>(listObjects);

  const lClick = (element: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(element.target, {
      opacity: 0,
      height: 0,
      padding: "0px 24px",
      duration: 1,
      onComplete: () => {
        onClick(element, listObjects, setListObjects);
      },
    });
  };

  useEffect(() => {
    listObjectRef.current = listObjects;
    console.log(listObjectRef.current, listObjects);
    if (Object.keys(listObjects).length === 0) {
      const tl = gsap.to(noListRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.2,
        padding: 0,
      });
      tl.progress(1);
      tl.reverse();
    }
  }, [listObjects, forceReload]);

  if (Object.keys(listObjectRef.current).length !== 0 || children) {
    return (
      <div style={bStyle} className="basic-list">
        {children
          ? children
          : Object.keys(listObjectRef.current).map((order, idx) => {
              if (
                Object.keys(listObjects).length <
                Object.keys(listObjectRef.current).length
              ) {
                // setForceReload((prev) => prev + 1);
              }
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
            })}
      </div>
    );
  }
  return (
    <div style={bStyle} className="basic-list">
      <span className="list-item" ref={noListRef}>
        {ifEmpty}
      </span>
    </div>
  );
};
