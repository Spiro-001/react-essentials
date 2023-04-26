import { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { BasicButton } from "../../react-essentials/Buttons/SimpleButtons/BasicButton";
import { Nav } from "../Nav/Nav";
import "../Demo.css";
import { SideNav } from "../Nav/SideNav";

export const ButtonsDemo = () => {
  const codeSnippet = `
  const [countClicks, setCountClicks] = useState<number>(0);

  const handleOnClick = () => {
    setCountClicks((prevCount) => prevCount + 1);
  };

  const bStyle = {
    border: "0",
    backgroundColor: "rgb(0, 197, 0)",
    fontWeight: "600",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div className="demo">
      <div className="container-demo bwgap">
        <div className="container-demo column content">
          <div className="container-demo content">{countClicks}</div>
          <BasicButton
            bStyle={bStyle}
            onClick={handleOnClick}
            value="Click Me!"
          />
        </div>
      </div>
    </div>
  );
};
  `;

  const [countClicks, setCountClicks] = useState<number>(0);

  const handleOnClick = () => {
    setCountClicks((prevCount) => prevCount + 1);
  };

  const bStyle = {
    border: "0",
    backgroundColor: "rgb(0, 204, 0)",
    fontWeight: "600",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  };

  const aDemo = () => {
    return (
      <div className="container-demo bwgap">
        <div className="container-demo code">
          <CodeBlock
            text={codeSnippet}
            language={"tsx"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={dracula}
            customStyle={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div className="container-demo inner">
          <div className="container-demo column content">
            <div className="container-demo content b-text">{countClicks}</div>
            <BasicButton
              bStyle={bStyle}
              onClick={handleOnClick}
              value="Click Me!"
            />
          </div>
        </div>
      </div>
    );
  };

  const bDemo = () => {
    return (
      <div className="container-demo bwgap">
        <div className="container-demo code">
          <CodeBlock
            text={codeSnippet}
            language={"tsx"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={dracula}
            customStyle={{
              height: "100%",
              width: "100%",
              scrollBarWidth: "thin",
            }}
          />
        </div>
        <div className="container-demo inner">
          <div className="container-demo column content">
            <div className="container-demo content b-text">{countClicks}</div>
            <BasicButton
              bStyle={bStyle}
              onClick={handleOnClick}
              value="Click Me!"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Nav options={{ "/": "Home", docs: "Docs" }} />
      <div className="background-b">
        <SideNav
          options={{
            1: "Basic Button",
            2: "Advanced Button",
          }}
        />
        <div className="demo-holder">
          <div className="demo" id="1">
            {aDemo()}
          </div>
          <div className="demo" id="2">
            {bDemo()}
          </div>
        </div>
      </div>
    </>
  );
};
