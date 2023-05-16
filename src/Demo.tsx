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
import { BasicToggle } from "./react-essentials/Toggles/BasicToggle/BasicToggle";
import { AdvanceToggle } from "./react-essentials/Toggles/AdvanceToggle/AdvanceToggle";

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

  const [toggleState, setToggleState] = useState<boolean>(true);
  const [bToggleState, bSetToggleState] = useState<boolean>(false);

  return (
    <>
      <Nav options={{ docs: "Docs" }} />
      <div className="demo-container" ref={demoRef}>
        {locked && lockedDemo()}
        {!locked && (
          <>
            <BasicToggle
              toggleButtonStyle={{ height: "40px", width: "40px" }}
              toggleContainerStyle={{
                height: "50px",
                width: "100px",
                borderRadius: "500px",
              }}
              toggleState={toggleState}
              setToggleState={setToggleState}
            />
            <AdvanceToggle
              toggleButtonStyle={{
                height: "40px",
                width: "40px",
                backgroundColor: "#545454",
              }}
              toggleContainerStyle={{
                height: "50px",
                width: "100px",
                borderRadius: "500px",
                backgroundColor: "transparent",
                boxShadow: "none",
                boxSizing: "border-box",
              }}
              toggleButtonAnimation={[
                { backgroundColor: "#545454" },
                {
                  backgroundColor: "white",
                  duration: 0.3,
                  ease: "power4.inOut",
                },
              ]}
              toggleContainerAnimation={[
                {
                  backgroundColor: "transparent",
                  border: "2px solid #545454",
                },
                {
                  backgroundColor: "#006AFF",
                  duration: 0.3,
                  border: "2px solid #006AFF",
                  ease: "power4.inOut",
                },
              ]}
              toggleState={bToggleState}
              setToggleState={bSetToggleState}
            />
          </>
        )}
      </div>
    </>
  );
};
