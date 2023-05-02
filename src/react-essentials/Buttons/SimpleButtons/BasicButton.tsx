import gsap from "gsap";
import React, { forwardRef, MouseEvent } from "react";
import "./BasicButton.css";

type BasicButtonProps = {
  bStyle?: React.CSSProperties;
  onClick(): void;
  value?: string;
  noAnim?: boolean;
  children?: React.ReactNode;
};

export const BasicButton = ({
  bStyle,
  onClick,
  value,
  noAnim = false,
  children,
}: BasicButtonProps) => {
  const bClick = (element: MouseEvent<HTMLDivElement>) => {
    if (!noAnim) {
      const bTimeLine = gsap.timeline();
      bTimeLine.to(element.target, {
        keyframes: [
          {
            translateY: 1,
            duration: 0.1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          },
          {
            translateY: 0,
            duration: 0.1,
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          },
        ],
      });
    }
    return onClick();
  };

  return (
    <div style={bStyle} onClick={bClick} className="basic-button">
      {value ? value : children}
    </div>
  );
};
