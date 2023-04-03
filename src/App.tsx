import { useRef } from "react";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import "./App.css";
import { useOnClickOutside } from "./react-essentials/Hooks/onClickOutside";

function App() {
  const aButtonRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(aButtonRef, () => {
    console.log("Clicked outside of Advance Button");
  });

  const handleClickA = () => {
    if (aButtonRef.current) aButtonRef.current.style.backgroundColor = "red";
  };

  const handleClickB = () => {
    console.log("Basic Button");
  };

  return (
    <div className="App">
      <BasicButton onClick={handleClickB} value="Basic Button" />
      <AdvanceButton
        onClick={handleClickA}
        value="Advanced Button"
        ref={aButtonRef}
      />
    </div>
  );
}

export default App;
