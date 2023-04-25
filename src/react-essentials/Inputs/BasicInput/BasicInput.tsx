import { SetStateAction } from "react";
import "./BasicInput.css";

type BasicInputProp = {
  bStyle?: Record<string, string>;
  onClick(): void;
  listStates: Array<number | SetStateAction<any> | null>;
  children?: React.ReactNode;
};

export const BasicInputs = ({
  bStyle,
  onClick,
  listStates,
  children,
}: BasicInputProp) => {
  return (
    <input
      className="input"
      placeholder="Input Value..."
      value={listStates[0]}
      onChange={(element) => listStates[1](element.target.value)}
    />
  );
};
