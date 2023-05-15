import gsap from "gsap";
import Draggable from "gsap/Draggable";
import $ from "jquery";
import {
  Children,
  forwardRef,
  MutableRefObject,
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
  onClick?(): void;
  listClick?(element?: React.MouseEvent<HTMLSpanElement>): void;
  ifEmpty?: any;
  listObjectsProp: Record<number | string, string>;
  setListObjectsProp: React.Dispatch<
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
      listItemStyle = {
        backgroundColor: "white",
      },
      aSetting = {
        opacity: 0,
        height: 0,
        padding: "0px 24px",
        duration: 0.3,
      },
      onClick = () => {},
      listClick = () => {},
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

    const aListRef = useRef<Record<string, HTMLSpanElement>>({});
    const noListRef = useRef<HTMLDivElement | null>(null);
    const listLength = useRef<number>(
      parseInt(
        Object.keys(listObjectsProp)[Object.keys(listObjectsProp).length - 1]
      )
    );
    const listItemRef = useRef<Array<Record<string | number, any>>>([]);
    const itemRef = useRef<Record<string | number, any>>({});
    const dragCurrent = useRef<Record<string | number, any>>({
      onDragStart: false,
      onDrag: false,
      onDragEnd: false,
    });
    const lastItemRef = useRef<HTMLElement | null>(null);

    const lClick = (element?: React.MouseEvent<HTMLSpanElement>) => {
      listClick(element);
    };

    useEffect(() => {
      gsapTimeLine?.revert();

      for (const key in aListRef.current) {
        if (aListRef.current[key] === null) {
          delete aListRef.current[key];
        }
      }

      const bListKeys = Object.keys(listObjectsProp);
      const lastIndex = bListKeys?.pop();
      const newObjectListLength = Object.keys(listObjectsProp).length;

      if (noListRef.current) {
        const noItemFadeIn = gsap.to(noListRef.current, {
          opacity: 0,
          height: 0,
          padding: "0px 24px",
          duration: 0.3,
        });

        if (newObjectListLength === 0) {
          noItemFadeIn.progress(1);
          noItemFadeIn.reverse();
        }
      }

      if (aListRef.current[lastIndex ? parseInt(lastIndex) : 1]) {
        lastItemRef.current =
          aListRef.current[lastIndex ? parseInt(lastIndex) : 1];
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
      }
    }, [listObjectsProp]);

    useLayoutEffect(() => {
      gsap.registerPlugin(Draggable);
      if (draggable) {
        let minY: number = 0;
        let maxY: number;
        let maxX: number;
        let clientWidth: number;
        let paddingOffsets: number;
        if (typeof ref !== "function" && ref) {
          maxY = ref.current?.clientHeight ?? 0;
          maxX = ref.current?.clientWidth ?? 0;
          paddingOffsets = $(ref.current as HTMLDivElement).innerHeight() ?? 0;
          paddingOffsets -= $(ref.current as HTMLDivElement).height() ?? 0;
        }
        Object.keys(aListRef.current).forEach((listElementKey: string) => {
          if (aListRef.current[listElementKey]) {
            clientWidth = aListRef.current[listElementKey]?.clientWidth ?? 0;
            maxY -= aListRef.current[listElementKey]?.clientHeight ?? 0;
            gsap.fromTo(
              aListRef.current[listElementKey],
              { y: 0, x: 0 },
              {
                y: 0,
                x: 0,
              }
            );
            Draggable.create(aListRef.current[listElementKey], {
              type: "x,y",
              bounds: {
                minY: minY - 12,
                maxY: maxY - (paddingOffsets - 12),
                minX: -1,
                maxX: maxX - clientWidth + 1,
              },
              minimumMovement: 0,
              onDragStart: (event) => handleItemDragStart(event),
              onDrag: (event) => handleItemDrag(event),
              onDragEnd: (event) => handleItemDrop(event),
            });
            minY -= (aListRef.current[listElementKey]?.clientHeight ?? 0) + 12;
          }
        });
      }
    }, [listObjectsProp]);

    const handleItemDragStart = (event: PointerEvent) => {
      let { target } = event;
      let paddingOffsets = 0;
      if (
        ref &&
        typeof ref !== "function" &&
        ref.current &&
        !dragCurrent.current.onDragStart &&
        Object.keys(itemRef.current).length <= 1 &&
        ref.current.contains(target as HTMLElement)
      ) {
        Object.keys(aListRef.current).forEach((aListKey) => {
          if (aListRef.current[aListKey].contains(target as HTMLElement)) {
            target = aListRef.current[aListKey];
          }
        });
        dragCurrent.current.onDragStart = true;
        paddingOffsets =
          (($(ref.current as HTMLDivElement).innerHeight() ?? 0) -
            ($(ref.current as HTMLDivElement).height() ?? 0)) /
          2;
        itemRef.current = {
          initialPosition: (target as HTMLElement).offsetTop - paddingOffsets,
          savePoint: (target as HTMLElement).offsetTop - paddingOffsets,
          currentPosition: (target as HTMLElement).offsetTop - paddingOffsets,
          order: parseInt((target as HTMLElement).id),
          height: (target as HTMLElement).clientHeight,
          node: target,
          grabbedAt: event.y,
          boundingBox: (ref.current?.clientHeight ?? 0) - paddingOffsets * 2,
        };

        gsap.fromTo(
          itemRef.current.node,
          {
            scale: 1.0,
            boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
          },
          {
            scale: 1.1,
            boxShadow: "6px 6px 4px rgba(0,0,0,0.1)",
            duration: 0.3,
          }
        );
        Object.keys(listObjectsProp).forEach((node) => {
          let itemNode = aListRef.current[node];
          if (itemNode !== itemRef.current.node && itemNode) {
            Draggable.get(itemNode).disable();
            listItemRef.current.push({
              initialPosition: itemNode.offsetTop - paddingOffsets,
              currentPosition: itemNode.offsetTop - paddingOffsets,
              order: parseInt(itemNode.id),
              height: itemNode.clientHeight,
              node: itemNode,
              boundingBox:
                (ref.current?.clientHeight ?? 0) - paddingOffsets * 2,
              movedAmount: 0,
            });
          }
        });
        listItemRef.current.push(itemRef.current);
      }
    };

    const handleItemDrag = (event: PointerEvent) => {
      let amountMoved = itemRef.current.grabbedAt - event.y;
      itemRef.current.currentPosition =
        itemRef.current.initialPosition - amountMoved;
      listItemRef.current.forEach((item) => {
        if (
          itemRef.current.currentPosition > item.currentPosition &&
          itemRef.current.currentPosition <
            item.currentPosition + item.height - 20
        ) {
          [itemRef.current.order, item.order] = [
            item.order,
            itemRef.current.order,
          ];

          item.movedAmount += itemRef.current.savePoint - item.initialPosition;

          let tweenMoveItem = gsap.to(item.node, {
            y: item.movedAmount,
            duration: 0.3,
          });

          tweenMoveItem.play();

          item.currentPosition = itemRef.current.savePoint;
          itemRef.current.savePoint = item.initialPosition;
          item.initialPosition = item.currentPosition;
        }
      });
      if (itemRef.current.currentPosition < 0) {
        itemRef.current.order = 1;
        itemRef.current.currentPosition = 0;
      } else if (
        itemRef.current.currentPosition > itemRef.current.boundingBox
      ) {
        itemRef.current.order = listItemRef.current.length + 1;
        itemRef.current.currentPosition =
          itemRef.current.boundingBox - itemRef.current.height;
      }
    };

    const handleItemDrop = (event: PointerEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const { target } = event;
      if (
        !dragCurrent.current.onDragEnd &&
        Object.keys(itemRef.current).length !== 0 &&
        listItemRef.current.length !== 0
      ) {
        dragCurrent.current.onDragEnd = true;
        gsap.fromTo(
          itemRef.current.node,
          {
            scale: 1.1,
            boxShadow: "0px 6px 6px rgba(0,0,0,0.1)",
          },
          {
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
          }
        );
        gsap
          .to(itemRef.current.node, {
            top: itemRef.current.savePoint - itemRef.current.currentPosition,
            x: 0,
            position: "relative",
            duration: 0.2,
            ease: "power4.out",
          })
          .then(() => {
            dragCurrent.current.onDragEnd = false;
            dragCurrent.current.onDragStart = false;
            itemRef.current.currentPosition = itemRef.current.initialPosition;
            itemRef.current.savePoint = itemRef.current.initialPosition;
            var newList: Record<number | string, any> = {};
            listItemRef.current.forEach((item) => {
              gsap.set(item.node, { clearProps: "top" });
              newList[item.order] = parseInt(item.node.id);
            });
            setListObjectsProp((prevList) => {
              var copyList: Record<number | string, any> = {};
              Object.keys(newList).forEach((newListKey) => {
                copyList[newListKey] = prevList[newList[newListKey]];
                if (aListRef.current[newListKey]) {
                  gsap.set(aListRef.current[newListKey], {
                    clearProps: "top",
                  });
                }
              });
              return copyList;
            });
            aListRef.current = {};
            listItemRef.current = [];
            itemRef.current = {};
          });
      }
    };

    const listElement = (idx: number, order: string) => {
      return (
        <span
          style={listItemStyle}
          className="a-list-item"
          key={idx}
          id={order}
          ref={(ref) => {
            if (ref) aListRef.current[order] = ref;
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
          <div style={defaultStyle} className="advance-list" ref={ref}>
            {Object.keys(listObjectsProp).map((order, idx) => {
              return listElement(idx, order);
            })}
            {action.deleteFromExternal && (
              <span
                onClick={lClick}
                style={listItemStyle}
                className="a-list-item"
                key={"deadNode"}
                id={"deadNode"}
                ref={(deletedNodeRef) => {
                  if (deletedNodeRef) {
                    const removeItemFadeIn = gsap.fromTo(
                      deletedNodeRef,
                      {
                        height: lastItemRef.current?.clientHeight,
                      },
                      {
                        opacity: 0,
                        height: 0,
                        padding: "0px 24px",
                        duration: 0.3,
                        onComplete: () => {
                          setAction((prevAction) => {
                            return { ...prevAction, deleteFromExternal: false };
                          });
                        },
                      }
                    );
                  }
                }}
              ></span>
            )}
          </div>
        </>
      );
    }
    return (
      <div style={defaultStyle} className="advance-list">
        <span className="a-list-item" ref={noListRef} style={styleNoItems}>
          {ifEmpty}
        </span>
      </div>
    );
  }
);
