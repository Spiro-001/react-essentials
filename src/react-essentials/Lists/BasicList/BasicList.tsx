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
  const [action, setAction] = useState<Record<string, boolean>>({
    delete: false,
    new: false,
  });

  const bListRef = useRef<Record<string, HTMLSpanElement | null>>({});
  const bListDivRef = useRef<HTMLDivElement | null>(null);
  const noListRef = useRef<HTMLDivElement | null>(null);
  const listLength = useRef<number>(
    parseInt(
      Object.keys(listObjectsProp)[Object.keys(listObjectsProp).length - 1]
    )
  ); // LAST KEY ORDER

  const defaultStyle = {
    minHeight: "300px",
    minWidth: "200px",
  };

  const defaultStyleNoItems = {
    minHeight: "300px",
    minWidth: "200px",
  };

  const lClick = async (element: React.MouseEvent<HTMLSpanElement>) => {
    if (!action.delete) {
      // prevent overlap
      setGsapTimeline(
        gsap.to(element.target, {
          ...aSetting,
          onComplete: () => {
            onClick(
              element,
              setListObjectsProp ? listObjectsProp : listObjects,
              setListObjectsProp ? setListObjectsProp : setListObjects
            );
            setAction((prevAction) => {
              return { ...prevAction, delete: false };
            });
          },
        })
      );
      setAction((prevAction) => {
        return { ...prevAction, delete: true };
      });
    }
  };

  useEffect(() => {
    gsapTimeLine?.revert();

    for (const key in bListRef.current) {
      if (bListRef.current[key] === null) {
        delete bListRef.current[key];
      }
    }

    const bListKeys = Object.keys(bListRef.current);
    const lastIndex = bListKeys?.pop();
    const newObjectListLength = Object.keys(
      setListObjectsProp ? listObjectsProp : listObjects
    ).length;

    const noItemFadeIn = gsap.to(noListRef.current, {
      opacity: 0,
      height: 0,
      padding: "0px 24px",
      duration: 0.3,
    });

    const newItemFadeIn = gsap
      .to(bListRef.current[lastIndex ? parseInt(lastIndex) : 1], {
        opacity: 0,
        height: 0,
        padding: "0px 24px",
        duration: 0.3,
      })
      .pause();

    if (listLength.current < newObjectListLength) {
      // item added
      listLength.current += 1;
      newItemFadeIn.progress(1).reverse();
    } else if (listLength.current > newObjectListLength) {
      // item removed
      listLength.current -= 1;
    }
    if (newObjectListLength === 0) {
      noItemFadeIn.progress(1);
      noItemFadeIn.reverse();
    }

    console.log(lastIndex, listLength.current, bListKeys, bListRef.current);
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
