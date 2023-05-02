import { UseOnClickOutside } from "./react-essentials/Hooks/UseOnClickOutside";
import { UseDeleteListItem } from "./react-essentials/Hooks/UseDeleteListItem";
import { useLayoutEffect, useRef, useState } from "react";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicList } from "./react-essentials/Lists/BasicList/BasicList";
import { BasicInputs } from "./react-essentials/Inputs/BasicInput/BasicInput";
import Fox from "./fox.webp";
import "./Demo.css";
import { Nav } from "./demo/Nav/Nav";
import gsap from "gsap";

export const Demo = () => {
  const aButtonRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

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

  // <BasicButton onClick={handleClickB} value="Add new item to list" />
  // <AdvanceButton
  //   onClick={handleClickA}
  //   value="Delete last item from list"
  //   ref={aButtonRef}
  // />
  // <BasicList
  //   onClick={handleListA}
  //   listObjectsProp={listObjects}
  //   setListObjectsProp={setListObjects}
  // />
  // <BasicInputs listStates={[input, setInput]} />

  useLayoutEffect(() => {
    gsap.fromTo(
      demoRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
    );
  });

  return (
    <>
      <Nav options={{ docs: "Docs" }} />
      <div className="demo-container" ref={demoRef}>
        <img src={Fox} alt="development" className="uc-img" />
        <div className="container">
          <span className="big-text dev-text">In Development.</span>
          <span className="mini-text drt">
            Foxxy is working very hard, come back later when he's done!
          </span>
        </div>
      </div>
    </>
  );
};
