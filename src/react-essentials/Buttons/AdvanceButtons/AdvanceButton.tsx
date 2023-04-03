import React, { forwardRef, MouseEvent } from "react";
import "./AdvanceButton.css";

type AdvanceButtonProps = {
  bStyle?: Record<string, string>;
  onClick(): void;
  value?: string;
  children?: React.ReactNode;
};

export const AdvanceButton = forwardRef<HTMLDivElement, AdvanceButtonProps>(
  function AdvanceButton(
    { bStyle, onClick, value, children }: AdvanceButtonProps,
    ref
  ) {
    const bClickAnim = (element: MouseEvent<HTMLDivElement>) => {
      onClick();
    };

    return (
      <div
        style={bStyle}
        onClick={bClickAnim}
        className="basic-button"
        ref={ref}
      >
        {value ? value : children}
      </div>
    );
  }
);
