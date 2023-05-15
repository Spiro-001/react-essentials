import gsap from "gsap";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { UseDeleteListItem } from "../../Hooks/UseDeleteListItem";
import "./BasicList.css";

type BasicListProp = {
  defaultStyle?: React.CSSProperties;
  styleNoItems?: React.CSSProperties;
  listItemStyle?: React.CSSProperties;
  aSetting?: Record<string, string | number>;
  onClick?(): void;
  ifEmpty?: any;
  listObjectsProp: Record<number, string>;
  setListObjectsProp: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
  children?: React.ReactNode;
};

export const BasicList = ({
  defaultStyle = {
    minHeight: "300px",
    minWidth: "200px",
  },
  listItemStyle = {
    backgroundColor: "white",
  },
  styleNoItems = listItemStyle,
  aSetting = {
    opacity: 0,
    height: 0,
    margin: 0,
    gap: 0,
    padding: "0px 24px",
    duration: 0.3,
  },
  onClick = () => {},
  listObjectsProp = {},
  setListObjectsProp,
  ifEmpty = "This list is empty.",
  children,
}: BasicListProp) => {
  const [gsapTimeLine, setGsapTimeline] = useState<GSAPTween | null>(null);
  const [action, setAction] = useState<Record<string, boolean>>({
    delete: false,
    new: false,
    deleteFromExternal: false,
  });

  const bListRef = useRef<Record<string, HTMLSpanElement | null>>({});
  const bListDivRef = useRef<HTMLDivElement | null>(null);
  const noListRef = useRef<HTMLDivElement | null>(null);
  const listLength = useRef<number>(
    parseInt(
      Object.keys(listObjectsProp)[Object.keys(listObjectsProp).length - 1]
    )
  );
  const lClick = async (element: React.MouseEvent<HTMLSpanElement>) => {
    if (!action.delete) {
      // prevent overlap
      setGsapTimeline(
        gsap.to(element.target, {
          ...aSetting,
          onComplete: () => {
            onClick();
            UseDeleteListItem(element, listObjectsProp, setListObjectsProp);
            setAction((prevAction) => {
              return {
                ...prevAction,
                delete: false,
                deleteFromExternal: false,
              };
            });
            listLength.current -= 1;
          },
        })
      );
      setAction((prevAction) => {
        return { ...prevAction, delete: true, deleteFromExternal: false };
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
    const newObjectListLength = Object.keys(listObjectsProp).length;

    if (noListRef.current) {
      const noItemFadeIn = gsap.to(noListRef.current, {
        ...aSetting,
      });

      if (newObjectListLength === 0) {
        noItemFadeIn.progress(1);
        noItemFadeIn.reverse();
      }
    }

    if (bListRef.current[lastIndex ? parseInt(lastIndex) : 1]) {
      const newItemFadeIn = gsap
        .to(bListRef.current[lastIndex ? parseInt(lastIndex) : 1], {
          ...aSetting,
        })
        .pause();
      if (listLength.current < newObjectListLength) {
        // item added
        listLength.current += 1;
        newItemFadeIn.progress(1).reverse();
      } else if (listLength.current > newObjectListLength) {
        // item removed
        setAction((prevAction) => {
          return { ...prevAction, deleteFromExternal: true };
        });
        listLength.current -= 1;
      }
    }
  }, [listObjectsProp]);

  const listElement = (idx: number, order: string) => {
    return (
      <span
        onClick={lClick}
        style={listItemStyle}
        className="list-item"
        key={idx}
        id={order}
        ref={(ref) => {
          bListRef.current[order] = ref;
        }}
      >
        {children && Children.toArray(children)[idx]}
        {!children && listObjectsProp[parseInt(order)]}
      </span>
    );
  };

  if (
    Object.keys(listObjectsProp).length !== 0 ||
    Children.count(children) !== 0
  ) {
    return (
      <>
        <div
          style={defaultStyle}
          className="basic-list"
          ref={bListDivRef}
          onClick={onClick}
        >
          {Object.keys(listObjectsProp).map((order, idx) => {
            return listElement(idx, order);
          })}
          {action.deleteFromExternal && (
            <span
              onClick={lClick}
              style={listItemStyle}
              className="list-item"
              key={"deadNode"}
              id={"deadNode"}
              ref={(deletedNodeRef) => {
                if (deletedNodeRef) {
                  const removeItemFadeIn = gsap.to(deletedNodeRef, {
                    ...aSetting,
                    onComplete: () => {
                      setAction((prevAction) => {
                        return { ...prevAction, deleteFromExternal: false };
                      });
                    },
                  });
                }
              }}
            ></span>
          )}
        </div>
      </>
    );
  }
  return (
    <div style={defaultStyle} className="basic-list" onClick={onClick}>
      <span className="list-item" ref={noListRef} style={styleNoItems}>
        {ifEmpty}
      </span>
    </div>
  );
};
