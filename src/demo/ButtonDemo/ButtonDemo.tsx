import "../Demo.css";
import { useRef, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { BasicButton } from "../../react-essentials/Buttons/SimpleButtons/BasicButton";
import { Nav } from "../Nav/Nav";
import { SideNav } from "../Nav/SideNav";
import { Table } from "../Table/Table";
import {
  tableBodyA,
  tableBodyB,
  tableHeadersA,
  tableHeadersB,
} from "./TableInfo";
import { AdvanceButton } from "../../react-essentials/Buttons/AdvanceButtons/AdvanceButton";

export const ButtonsDemo = () => {
  const codeSnippetB = `
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

  const codeSnippetA = `
  const [toggleClick, setToggleClick] = useState<boolean>(false);
  const advancedButtonRef = useRef<HTMLDivElement | null>(null);

  const handleOnClickA = () => {
    setToggleClick((boolean) => (boolean ? false : true));
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
          <div className="container-demo content">{toggleClick.toString()}</div>
            <AdvanceButton
              bStyle={bStyle}
              ref={advancedButtonRef}
              onClick={handleOnClickA}
              value="Click Me!"
            />
        </div>
      </div>
    </div>
    );
  };
  `;

  const [countClicks, setCountClicks] = useState<number>(0);
  const [toggleClick, setToggleClick] = useState<boolean>(false);
  const advancedButtonRef = useRef<HTMLDivElement | null>(null);

  const handleOnClick = () => {
    setCountClicks((prevCount) => prevCount + 1);
  };

  const handleOnClickA = () => {
    setToggleClick((boolean) => (boolean ? false : true));
  };

  const bStyle = {
    border: "0",
    backgroundColor: "rgb(0, 204, 0)",
    fontWeight: "600",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  };

  const bDemo = () => {
    return (
      <div className="container-demo bwgap">
        <div className="container-demo code">
          <CodeBlock
            text={codeSnippetB}
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

  const aDemo = () => {
    return (
      <div className="container-demo bwgap">
        <div className="container-demo code">
          <CodeBlock
            text={codeSnippetA}
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
            <div className="container-demo content b-text">
              {toggleClick.toString()}
            </div>
            <AdvanceButton
              bStyle={bStyle}
              ref={advancedButtonRef}
              onClick={handleOnClickA}
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
            {bDemo()}
            <div className="documentation">
              <Table headers={tableHeadersA} body={tableBodyA} />
            </div>
          </div>
          <div className="demo" id="2">
            {aDemo()}
            <div className="documentation">
              <Table headers={tableHeadersB} body={tableBodyB} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
