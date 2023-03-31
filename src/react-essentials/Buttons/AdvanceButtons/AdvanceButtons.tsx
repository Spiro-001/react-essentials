import React, { forwardRef, MouseEvent } from "react";
import "./BasicButton.css";

type AdvanceButtonProps = {
  bStyle?: Record<string, string>;
  onClick(): void;
  value?: string;
  aSettings?: Record<string, any>;
  children?: React.ReactNode;
};

export const AdvanceButton = forwardRef<HTMLDivElement, AdvanceButtonProps>(
  function AdvanceButton(
    { bStyle, onClick, value, aSettings, children }: AdvanceButtonProps,
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
