import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import { UseOnClickOutside } from "./react-essentials/Hooks/UseOnClickOutside";
import { BasicList } from "./react-essentials/Lists/BasicList/BasicList";
import { UseDeleteListItem } from "./react-essentials/Hooks/UseDeleteListItem";
import "./App.css";
import { ButtonsDemo } from "./demo/ButtonDemo/ButtonDemo";

function App() {
  const aButtonRef = useRef<HTMLDivElement>(null);
  const [listObjects, setListObjects] = useState<Record<number, string>>({
    1: "bob",
    2: "charles",
    3: "doggy",
    4: "mark",
  });

  UseOnClickOutside(aButtonRef, () => {});

  const handleClickA = () => {
    if (Object.keys(listObjects).length)
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
      let lastKey = parseInt(
        Object.keys(copyList)[Object.keys(copyList).length - 1]
      );
      copyList[lastKey ? lastKey + 1 : 1] = "wew";
      return copyList;
    });
  };

  const handleListA = (
    event: any,
    list: Record<number, string>,
    manageList?: any
  ) => {
    UseDeleteListItem(event, list, manageList);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}></Route>
          <Route exact path={"/buttons"}>
            <ButtonsDemo />
          </Route>
          <Route exact path={"/demo"}>
            <BasicButton onClick={handleClickB} value="Add new item to list" />
            <AdvanceButton
              onClick={handleClickA}
              value="Delete last item from list"
              ref={aButtonRef}
            />
            <BasicList
              onClick={handleListA}
              listObjectsProp={listObjects}
              setListObjectsProp={setListObjects}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
