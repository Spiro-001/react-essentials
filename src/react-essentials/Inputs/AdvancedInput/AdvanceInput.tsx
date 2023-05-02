import { MouseEvent, SetStateAction } from "react";
import "./AdvanceInput.css";

type AdvanceInputProp = {
  bStyle?: React.CSSProperties;
  onClick(event: MouseEvent): void;
  listStates: Array<number | SetStateAction<any> | null>;
  placeholder?: string;
};

export const AdvanceInputs = ({
  bStyle,
  onClick,
  listStates,
  placeholder = "Input Value...",
}: AdvanceInputProp) => {
  return (
    <input
      style={bStyle}
      className="input"
      placeholder={placeholder}
      value={listStates[0]}
      onChange={(element) => listStates[1](element.target.value)}
      onClick={(element) => onClick(element)}
    />
  );
};
