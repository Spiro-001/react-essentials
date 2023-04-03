import { useState } from "react";
import "./BasicList.css";

type BasicListProp = {
  bStyle?: Record<string, string>;
  onClick(
    event: any,
    manageList: React.Dispatch<React.SetStateAction<Record<number, string>>>,
    list: Record<number, string>
  ): void;
  listObjectsProp?: Record<number, string>;
  children?: React.ReactNode;
};

export const BasicList = ({
  bStyle,
  onClick,
  listObjectsProp = {},
  children,
}: BasicListProp) => {
  const [listObjects, setListObjects] =
    useState<Record<number, string>>(listObjectsProp);

  const lClick = (element: React.MouseEvent<HTMLDivElement>) => {
    return onClick(element, setListObjects, listObjects);
  };

  return (
    <div style={bStyle} className="basic-list">
      {children
        ? children
        : Object.keys(listObjects).map((order) => {
            return (
              <span onClick={lClick} className="list-item">
                {listObjects[parseInt(order)]}
              </span>
            );
          })}
    </div>
  );
};
