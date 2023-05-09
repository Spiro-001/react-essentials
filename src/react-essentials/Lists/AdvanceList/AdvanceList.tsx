import gsap from "gsap";
import Draggable from "gsap/Draggable";
import $ from "jquery";
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
  listItemStyle?: React.CSSProperties;
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
      defaultStyle = {
        minWidth: "200px",
      },
      styleNoItems = {
        minHeight: "300px",
        minWidth: "200px",
      },
      listItemStyle = {},
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
    const itemPos = useRef<Array<number>>([]);
    const order = useRef<number | null>(null);
    const returnBack = useRef<boolean>(false);

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
      let minY: number = 0;
      let maxY: number;
      let padding: number;
      let paddingOffsets: number;
      if (typeof ref !== "function" && ref) {
        maxY = ref.current?.clientHeight ?? 0;
        paddingOffsets = $(ref.current as HTMLDivElement).innerHeight() ?? 0;
        paddingOffsets -= $(ref.current as HTMLDivElement).height() ?? 0;
      }
      Object.keys(aListRef.current).forEach((listElementKey: string) => {
        // maxY += minY;
        maxY -= aListRef.current[listElementKey]?.clientHeight ?? 0;
        Draggable.create(aListRef.current[listElementKey], {
          type: "y",
          bounds: { minY: minY, maxY: maxY - paddingOffsets },
          onDragStart: (event) => handleItemDragStart(event),
          onDrag: (event) => handleItemDrag(event),
          onDragEnd: (event) => handleItemDrop(event),
        });
        minY -= aListRef.current[listElementKey]?.clientHeight ?? 0;
      });
    });

    const handleItemDragStart = (event: PointerEvent) => {
      const { target } = event;
      itemRef.current = target as HTMLSpanElement;
      order.current = parseInt(itemRef.current?.id ?? "0");
      itemPos.current = [0];
      Object.keys(aListRef.current).forEach((itemElement, idx) => {
        itemPos.current.push(
          (isNaN(itemPos.current[idx - 1]) ? 0 : itemPos.current[idx]) +
            (aListRef.current[itemElement]?.clientHeight ?? 0)
        );
      });
    };

    let moveDirection = { direction: 0 };

    const handleItemDrag = (event: PointerEvent) => {
      event.stopPropagation();
      event.preventDefault();
      let hoveredItemPosition: number;

      if (ref && typeof ref !== "function") {
        hoveredItemPosition = event.screenY - (ref.current?.offsetHeight ?? 0);
        console.log(order.current, hoveredItemPosition);
      }

      console.log(itemPos.current);

      itemPos.current.forEach((pos, idx) => {
        if (hoveredItemPosition) {
          if (itemPos.current[idx + 1]) {
            if (
              hoveredItemPosition > pos &&
              hoveredItemPosition < itemPos.current[idx + 1]
            )
              order.current = idx + 1;
            else if (hoveredItemPosition < 0) order.current = 1;
            else if (
              hoveredItemPosition > itemPos.current[itemPos.current.length - 1]
            )
              order.current = itemPos.current.length - 1;
          }
        } else {
          returnBack.current = true;
        }
      });
    };

    const handleItemDrop = (event: PointerEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const { target } = event;
      if (itemRef.current && !returnBack.current) {
        const copyList: Record<number, string> = structuredClone(listObjects);
        let fromValue = parseInt(itemRef.current?.id) - 1;
        if (fromValue) {
          setListObjects((prevList) => {
            copyList[fromValue] = prevList[order.current ?? fromValue];
            copyList[order.current ?? fromValue] = prevList[fromValue];
            return copyList;
          });
          if (setListObjectsProp) setListObjectsProp(copyList);
        }
      }
      returnBack.current = false;
    };

    const listElement = (idx: number, order: string) => {
      return (
        <span
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
                style={listItemStyle}
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
