import { UseOnClickOutside } from "./react-essentials/Hooks/UseOnClickOutside";
import { UseDeleteListItem } from "./react-essentials/Hooks/UseDeleteListItem";
import { useRef, useState } from "react";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicList } from "./react-essentials/Lists/BasicList/BasicList";
import "./Demo.css";
import { BasicInputs } from "./react-essentials/Inputs/BasicInput/BasicInput";

export const Demo = () => {
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

  const handleInputB = () => {};

  const [input, setInput] = useState<number | null>(null);

  return (
    <div className="demo-container">
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
      <BasicInputs listStates={[input, setInput]} />
    </div>
  );
};
