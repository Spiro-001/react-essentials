import gsap from "gsap";
import Draggable from "gsap/Draggable";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./AdvanceList.css";

type AdvanceListProp = {
  defaultStyle?: React.CSSProperties;
  styleNoItems?: React.CSSProperties;
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
  draggable?: boolean;
  children?: React.ReactNode;
};

export const AdvanceList = forwardRef<HTMLDivElement, AdvanceListProp>(
  function AdvanceList(
    {
      defaultStyle = {},
      styleNoItems = {
        minHeight: "300px",
        minWidth: "200px",
      },
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
      draggable = false,
      children,
    }: AdvanceListProp,
    ref
  ) {
    const [listObjects, setListObjects] =
      useState<Record<number, string>>(listObjectsProp);
    const [gsapTimeLine, setGsapTimeline] = useState<GSAPTween | null>(null);
    const [action, setAction] = useState<Record<string, boolean>>({
      delete: false,
      new: false,
      deleteFromExternal: false,
    });

    const aListRef = useRef<Record<string, HTMLSpanElement | null>>({});
    const noListRef = useRef<HTMLDivElement | null>(null);
    const listLength = useRef<number>(
      parseInt(
        Object.keys(listObjectsProp)[Object.keys(listObjectsProp).length - 1]
      )
    );
    const itemRef = useRef<HTMLSpanElement | null>(null);
    const itemOverRef = useRef<HTMLSpanElement | null>(null);
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

      for (const key in aListRef.current) {
        if (aListRef.current[key] === null) {
          delete aListRef.current[key];
        }
      }

      const bListKeys = Object.keys(aListRef.current);
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
        .to(aListRef.current[lastIndex ? parseInt(lastIndex) : 1], {
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
        setAction((prevAction) => {
          return { ...prevAction, deleteFromExternal: true };
        });
        listLength.current -= 1;
      }

      if (newObjectListLength === 0) {
        noItemFadeIn.progress(1);
        noItemFadeIn.reverse();
      }
    }, [setListObjectsProp ? listObjectsProp : listObjects]);

    useLayoutEffect(() => {
      gsap.registerPlugin(Draggable);
      Object.keys(aListRef.current).forEach((listElementKey: string) => {
        Draggable.create(aListRef.current[listElementKey], {
          type: "y",
          bounds: { minY: -50, maxY: 200 },
          dragResistance: 0.2,
          onDrag: (element) => handleItemDrag(element),
          onDragEnd: (element) => handleItemDrop(element),
        });
      });
    });

    const handleItemDrag = (event: PointerEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const { target } = event;
      itemRef.current = target as HTMLSpanElement;
      Object.keys(aListRef.current).forEach((listElementKey) => {
        let positionItem = 31; //PADDING CHANGE LATER
        console.log(aListRef.current[listElementKey]?.clientHeight);
      });
      console.log(event.y);
    };

    const handleItemDrop = (event: PointerEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const { target } = event;
      if (itemRef.current && itemOverRef.current) {
        const copyList: Record<number, string> = structuredClone(listObjects);
        let fromValue = parseInt(itemRef.current?.id);
        let toValue = parseInt(itemOverRef.current?.id);
        setListObjects((prevList) => {
          copyList[fromValue] = prevList[toValue];
          copyList[toValue] = prevList[fromValue];
          return copyList;
        });
        if (setListObjectsProp) setListObjectsProp(copyList);
      }
    };

    const listElement = (idx: number, order: string) => {
      return (
        <span
          onClick={lClick}
          className="list-item"
          key={idx}
          id={order}
          ref={(ref) => {
            aListRef.current[order] = ref;
          }}
          draggable={draggable}
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
        <>
          <div style={defaultStyle} className="advance-list" ref={ref}>
            {children
              ? children
              : Object.keys(listObjectsProp).map((order, idx) => {
                  return listElement(idx, order);
                })}
            {action.deleteFromExternal && (
              <span
                onClick={lClick}
                className="list-item"
                key={"deadNode"}
                id={"deadNode"}
                ref={(deletedNodeRef) => {
                  const removeItemFadeIn = gsap.to(deletedNodeRef, {
                    opacity: 0,
                    height: 0,
                    padding: "0px 24px",
                    duration: 0.3,
                    onComplete: () => {
                      setAction((prevAction) => {
                        return { ...prevAction, deleteFromExternal: false };
                      });
                    },
                  });
                }}
              ></span>
            )}
          </div>
        </>
      );
    }
    return (
      <div style={styleNoItems} className="basic-list">
        <span className="list-item" ref={noListRef}>
          {ifEmpty}
        </span>
      </div>
    );
  }
);
