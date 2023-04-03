import { useState } from "react";

type BasicListProp = {
  bStyle?: Record<string, string>;
  onClick(): void;
  listObjectsProp: Record<number, string>;
  children?: React.ReactNode;
};

export const BasicList = ({
  bStyle,
  onClick,
  listObjectsProp,
  children,
}: BasicListProp) => {
  const [listObjects, setListObjects] =
    useState<Record<number, string>>(listObjectsProp);
  const lClick = (element: React.MouseEvent<HTMLDivElement>) => {
    return onClick();
  };
  return (
    <div style={bStyle} onClick={lClick} className="basic-list">
      {children
        ? children
        : Object.keys(listObjects).map((order) => {
            return <span>{listObjects[parseInt(order)]}</span>;
          })}
    </div>
  );
};
