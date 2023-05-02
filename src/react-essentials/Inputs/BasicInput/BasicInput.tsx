import { SetStateAction } from "react";
import "./BasicInput.css";

type BasicInputProp = {
  bStyle?: React.CSSProperties;
  listStates: Array<number | SetStateAction<any> | null>;
  placeholder?: string;
};

export const BasicInputs = ({
  bStyle,
  listStates,
  placeholder = "Input Value...",
}: BasicInputProp) => {
  return (
    <input
      style={bStyle}
      className="input"
      placeholder={placeholder}
      value={listStates[0]}
      onChange={(element) => listStates[1](element.target.value)}
    />
  );
};
