import React, { forwardRef, MouseEvent } from "react";
import "./BasicButton.css";

type BasicButtonProps = {
  bStyle?: Record<string, string>;
  onClick(): void;
  value?: string;
  children?: React.ReactNode;
};

export const BasicButton = ({
  bStyle,
  onClick,
  value,
  children,
}: BasicButtonProps) => {
  const bClickAnim = (element: MouseEvent<HTMLDivElement>) => {
    return onClick();
  };

  return (
    <div style={bStyle} onClick={bClickAnim} className="basic-button">
      {value ? value : children}
    </div>
  );
};
