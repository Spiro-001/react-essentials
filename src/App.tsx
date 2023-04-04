import React, { useRef } from "react";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import "./App.css";
import { useOnClickOutside } from "./react-essentials/Hooks/onClickOutside";
import { BasicList } from "./react-essentials/Lists/BasicList/BasicList";
import { deleteListItem } from "./react-essentials/Hooks/deleteListItem";

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

  const handleListA = (
    event: any,
    list: Record<number, string>,
    manageList?: any
  ) => {
    deleteListItem(event, list, manageList);
  };

  return (
    <div className="App">
      <BasicButton onClick={handleClickB} value="Basic Button" />
      <AdvanceButton
        onClick={handleClickA}
        value="Advanced Button"
        ref={aButtonRef}
      />
      <BasicList
        onClick={handleListA}
        listObjectsProp={{ 1: "bob", 2: "charles", 3: "doggy", 4: "mark" }}
      />
    </div>
  );
}

export default App;
