import React, { forwardRef, MouseEvent } from "react";
import defaultButtonClick from "./mouseclick.mp3";
import "./BasicButton.css";

type BasicButtonProps = {
  bStyle?: Record<string, string>;
  onClick(): void;
  value?: string;
  aSettings?: Record<string, any>;
  children?: React.ReactNode;
};

export const BasicButton = forwardRef<HTMLDivElement, BasicButtonProps>(
  function BasicButton(
    { bStyle, onClick, value, aSettings, children }: BasicButtonProps,
    ref
  ) {
    const bClickAnim = (element: MouseEvent<HTMLDivElement>) => {
      return onClick();
    };

    return (
      <div
        style={bStyle}
        onClick={bClickAnim}
        ref={ref}
        className="basic-button"
      >
        {value ? value : children}
      </div>
    );
  }
);
