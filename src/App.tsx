import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import "./App.css";
import { BasicButton } from "./react-essentials/Buttons/SimpleButtons/BasicButton";

function App() {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState<boolean>(false);

  const buttonClick = () => {
    setCounter((prev) => {
      return !prev;
    });
  };

  return (
    <div className="App">
      <BasicButton
        bStyle={{ backgroundColor: "red" }}
        onClick={buttonClick}
        value="Register"
        aSettings={{ rotation: 360, duration: 1 }}
        ref={buttonRef}
      />
    </div>
  );
}

export default App;
