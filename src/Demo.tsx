import "./Demo.css";
import { UseOnClickOutside } from "./react-essentials/Hooks/UseOnClickOutside";
import { UseDeleteListItem } from "./react-essentials/Hooks/UseDeleteListItem";
import { useLayoutEffect, useRef, useState } from "react";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";
import { AdvanceButton } from "./react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicList } from "./react-essentials/Lists/BasicList/BasicList";
import { BasicInputs } from "./react-essentials/Inputs/BasicInput/BasicInput";
import { Nav } from "./demo/Nav/Nav";
import { AdvanceList } from "./react-essentials/Lists/AdvanceList/AdvanceList";
import Fox from "./fox.webp";
import gsap from "gsap";

export const Demo = () => {
  const aButtonRef = useRef<HTMLDivElement>(null);
  const bButtonRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const aListRef = useRef<HTMLDivElement>(null);

  const [listObjects, setListObjects] = useState<Record<number, string>>({
    1: "Doug",
    2: "Charles",
    3: "Ryan",
    4: "Mark",
  });

  const [aListObjects, aSetListObjects] = useState<Record<number, string>>({
    1: "James Laur",
    2: "Malcolm Sultz",
    3: "Ricky White",
    4: "Mark Hale",
  });

  const [locked, setLocked] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [input, setInput] = useState<string | null>("");

  // PASSCODE TO DEV PAGE :)
  const passCode = "123react";

  useLayoutEffect(() => {
    gsap.fromTo(
      demoRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
    );
  }, []);

  UseOnClickOutside(aButtonRef, () => {});

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

  const aHandleClickA = () => {
    if (Object.keys(aListObjects).length)
      aSetListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey: any = Object.keys(copyList).pop();
        delete copyList[lastKey];
        return copyList;
      });
  };

  const aHandleClickB = () => {
    if (input) {
      aSetListObjects((prevList) => {
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

  var containerStyle: React.CSSProperties = {
    gap: 0,
    height: "fit-content",
    justifyContent: "space-between",
    alignItems: "space-between",
    border: "1px solid red",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "12px 12px",
    backgroundColor: "white",
    width: "fit-content",
    boxSizing: "border-box",
  };
  var buttonContainerStyle: React.CSSProperties = {
    backgroundColor: "white",
    height: "fit-content",
    width: "100%",
    padding: "12px",
    boxSizing: "border-box",
  };

  return (
    <>
      <Nav options={{ docs: "Docs" }} />
      <div className="demo-container" ref={demoRef}>
        {locked && lockedDemo()}
        {!locked && (
          <>
            <div className="container" style={containerStyle}>
              <BasicList
                onClick={() => {}}
                listObjectsProp={listObjects}
                setListObjectsProp={setListObjects}
                defaultStyle={{
                  padding: "24px 0px",
                  borderRadius: "0px",
                  border: 0,
                  gap: "12px",
                  height: "100%",
                }}
                styleNoItems={{
                  width: "200px",
                  borderRadius: "6px",
                  backgroundColor: "white",
                }}
                listItemStyle={{
                  width: "200px",
                  borderRadius: "6px",
                  backgroundColor: "white",
                }}
              />
              <div className="container" style={buttonContainerStyle}>
                <BasicButton
                  onClick={handleClickB}
                  value="Add new item to list"
                  bStyle={{ width: "100%", textAlign: "center" }}
                />
                <AdvanceButton
                  onClick={handleClickA}
                  value="Delete last item from list"
                  ref={aButtonRef}
                />
              </div>
            </div>
            <div className="container" style={containerStyle}>
              <AdvanceList
                onClick={() => {}}
                listClick={() => {}}
                listObjectsProp={aListObjects}
                setListObjectsProp={aSetListObjects}
                draggable={true}
                defaultStyle={{
                  padding: "24px 0px",
                  borderRadius: "0px",
                  border: 0,
                  gap: "12px",
                  height: "fit-content",
                }}
                styleNoItems={{
                  minWidth: "200px",
                  borderRadius: "6px",
                  backgroundColor: "white",
                }}
                listItemStyle={{
                  minWidth: "200px",
                  padding: "12px 24px 12px 12px",
                  borderRadius: "6px",
                  backgroundColor: "white",
                }}
                ref={aListRef}
              >
                {Object.keys(aListObjects).map((listItem) => {
                  return (
                    <div key={listItem} className="custom-list-item">
                      <img
                        src={`https://picsum.photos/200/300`}
                        alt="lorem"
                        className="test-image"
                      />
                      {aListObjects[parseInt(listItem)]}
                    </div>
                  );
                })}
              </AdvanceList>
              <div className="container" style={buttonContainerStyle}>
                <BasicButton
                  onClick={aHandleClickB}
                  value="Add new item to list"
                  bStyle={{ width: "100%", textAlign: "center" }}
                />
                <AdvanceButton
                  onClick={aHandleClickA}
                  value="Delete last item from list"
                  ref={bButtonRef}
                />
              </div>
            </div>

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
