import "./Demo.css";
import { UseOnClickOutside } from "./react-essentials/Hooks/UseOnClickOutside";
import { UseDeleteListItem } from "./react-essentials/Hooks/UseDeleteListItem";
import { useLayoutEffect, useRef, useState } from "react";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicList } from "./react-essentials/Lists/BasicList/BasicList";
import { BasicInputs } from "./react-essentials/Inputs/BasicInput/BasicInput";
import { Nav } from "./demo/Nav/Nav";
import Fox from "./fox.webp";
import gsap from "gsap";

export const Demo = () => {
  const aButtonRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [listObjects, setListObjects] = useState<Record<number, string>>({
    1: "bob",
    2: "charles",
    3: "doggy",
    4: "mark",
  });
  const [locked, setLocked] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [input, setInput] = useState<string | null>(null);

  // PASSCODE TO DEV PAGE :)
  const passCode = "123react";

  useLayoutEffect(() => {
    gsap.fromTo(
      demoRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
    );
  }, []);

  const lockedDemo = () => {
    return (
      <>
        <img src={Fox} alt="development" className="uc-img" />
        <div className="container" style={{ position: "relative" }}>
          <span className="big-text dev-text">In Development.</span>
          <span className="mini-text drt">
            Foxxy is working very hard, come back later when he's done!
          </span>
          <div className="input-container" ref={inputRef}>
            <BasicInputs
              listStates={[password, setPassword]}
              bStyle={{
                padding: "12px 24px 12px 12px",
                marginTop: "48px",
                borderRadius: "12px",
                border: "0px",
              }}
              placeholder="Enter Passcode"
              type="password"
            />
            <BasicButton
              onClick={handleSubmit}
              value="Submit"
              bStyle={{
                position: "absolute",
                right: 8,
                bottom: 8,
                zIndex: 1,
                fontSize: "12px",
                padding: "4px 12px",
                borderRadius: "8px",
                backgroundColor: "rgb(255, 122, 122)",
                border: "0",
                fontWeight: 600,
                color: "white",
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const handleSubmit = () => {
    const errorTimeline = gsap.timeline();
    if (passCode === password) setLocked(false);
    else {
      errorTimeline.fromTo(
        inputRef.current,
        {
          x: 20,
        },
        { x: 0, ease: "elastic.out(1, 0.1)", duration: 1 }
      );
    }
  };

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
    if (input) {
      setListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey = parseInt(
          Object.keys(copyList)[Object.keys(copyList).length - 1]
        );
        copyList[lastKey ? lastKey + 1 : 1] = input;
        setInput("");
        return copyList;
      });
    }
  };

  const handleListA = (
    event: any,
    list: Record<number, string>,
    manageList?: any
  ) => {
    UseDeleteListItem(event, list, manageList);
  };

  return (
    <>
      <Nav options={{ docs: "Docs" }} />
      <div className="demo-container" ref={demoRef}>
        {locked && lockedDemo()}
        {!locked && (
          <>
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
            <BasicInputs
              listStates={[input, setInput]}
              bStyle={{ padding: "12px 24px 12px 6px" }}
              placeholder="Add to this list..."
            />
          </>
        )}
      </div>
    </>
  );
};
