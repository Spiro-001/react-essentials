import React, { useEffect, useRef, useState } from "react";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import { useOnClickOutside } from "./react-essentials/Hooks/onClickOutside";
import { BasicList } from "./react-essentials/Lists/BasicList/BasicList";
import { deleteListItem } from "./react-essentials/Hooks/deleteListItem";
import "./App.css";

function App() {
  const aButtonRef = useRef<HTMLDivElement>(null);
  const [listObjects, setListObjects] = useState<Record<number, string>>({
    1: "bob",
    2: "charles",
    3: "doggy",
    4: "mark",
  });

  useOnClickOutside(aButtonRef, () => {});

  const handleClickA = () => {
    setListObjects((prevList) => {
      const copyList = structuredClone(prevList);
      let lastKey: any = Object.keys(copyList).pop();
      delete copyList[lastKey];
      return copyList;
    });
  };

  const handleClickB = () => {
    setListObjects((prevList) => {
      const copyList = structuredClone(prevList);
      let lastKey = Object.keys(copyList).length;
      copyList[lastKey + 1] = "wew";
      return copyList;
    });
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
      <BasicButton onClick={handleClickB} value="Add item to list" />
      <AdvanceButton
        onClick={handleClickA}
        value="Delete item from list"
        ref={aButtonRef}
      />
      <BasicList
        onClick={handleListA}
        listObjectsProp={listObjects}
        setListObjectsProp={setListObjects}
      />
    </div>
  );
}

export default App;
