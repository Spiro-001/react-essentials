import gsap from "gsap";
import React, { MouseEvent, useRef } from "react";
import "./BasicButton.css";

type BasicButtonProps = {
  bStyle?: React.CSSProperties;
  onClick(element: MouseEvent<HTMLDivElement>): void;
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
  const buttonRef = useRef<HTMLDivElement>(null);
  const bClick = (element: MouseEvent<HTMLDivElement>) => {
    if (!noAnim) {
      const bTimeLine = gsap.timeline();
      bTimeLine.to(buttonRef.current, {
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
    return onClick(element);
  };

  return (
    <div
      style={bStyle}
      onClick={bClick}
      className="basic-button"
      ref={buttonRef}
    >
      {value ? value : children}
    </div>
  );
};
