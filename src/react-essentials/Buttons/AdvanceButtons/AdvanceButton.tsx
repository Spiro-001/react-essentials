import gsap from "gsap";
import React, { forwardRef, MouseEvent, useRef } from "react";
import "./AdvanceButton.css";

type AdvanceButtonProps = {
  bStyle?: React.CSSProperties;
  onClick(element: MouseEvent<HTMLDivElement>): void;
  value?: string;
  anim?: GSAPTweenVars;
  children?: React.ReactNode;
};

export const AdvanceButton = forwardRef<HTMLDivElement, AdvanceButtonProps>(
  function AdvanceButton(
    {
      bStyle,
      onClick,
      value,
      anim = {
        keyframes: [
          { y: 1, duration: 0.1 },
          { y: 0, duration: 0.1 },
        ],
      },
      children,
    }: AdvanceButtonProps,
    ref
  ) {
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const bClick = (element: MouseEvent<HTMLDivElement>) => {
      if (typeof ref !== "function" && ref) {
        const buttonTimeline = gsap.timeline();
        buttonTimeline.to(ref.current, anim);
      }
      onClick(element);
    };

    return (
      <div style={bStyle} onClick={bClick} className="advance-button" ref={ref}>
        {value ? value : children}
      </div>
    );
  }
);
