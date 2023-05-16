import "../Demo.css";
import { CodeBlock, dracula } from "react-code-blocks";
import { BasicInputs } from "../../react-essentials/Inputs/BasicInput/BasicInput";
import React, { MouseEvent, useState } from "react";
import { Nav } from "../Nav/Nav";
import { Table } from "../Table/Table";
import { tableBodyA, tableBodyB, tableHeadersA } from "./TableInfo";
import { AdvanceInputs } from "../../react-essentials/Inputs/AdvancedInput/AdvanceInput";
import { SideNav } from "../Nav/SideNav";

export const InputDemo = () => {
  const codeSnippetBL = `
  const inputStyle = {
    padding: "6px 12px 6px 6px",
    borderRadius: "6px",
    border: "1px solid black",
  };
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className="container-demo bwgap">
      <div className="container-demo inner">
        <div className="container-demo column content">
          <div className="container-demo content b-text"></div>
            <BasicInputs
              bStyle={listStyle}
              listStates={[inputValue, setInputValue]}
            />
        </div>
      </div>
    </div>
  );
  `;

  const codeSnippetAL = `
  const handleInputClick = (event: MouseEvent) => {};
  const inputStyle = {
    padding: "6px 12px 6px 6px",
    borderRadius: "6px",
    border: "1px solid black",
  };
  const [inputValueA, setInputValueA] = useState<string>("");

  return (
    <div className="container-demo bwgap">
      <div className="container-demo inner">
        <div className="container-demo column content">
          <div className="container-demo content b-text"></div>
            <AdvanceInputs
              bStyle={listStyle}
              listStates={[inputValue, setInputValue]}
              onClick={handleInputClick}
            />
        </div>
      </div>
    </div>
  );
  `;

  const handleInputClick = (event: MouseEvent) => {};
  const inputStyle = {
    padding: "6px 12px 6px 6px",
    borderRadius: "6px",
    border: "1px solid black",
  };
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueA, setInputValueA] = useState<string>("");

  const displayValue = () => {
    if (inputValue.length === 0) return "Input value is empty!";
    else if (inputValue.length <= 110) return inputValue;
    else return "Maximum string length reached!";
  };

  const bInput = () => {
    return (
      <div className="container-demo bwgap">
        <div className="container-demo code">
          <CodeBlock
            text={codeSnippetBL}
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
          <div
            className="container-demo column content"
            style={{ maxWidth: "80%" }}
          >
            <div
              className="container-demo content b-text"
              style={{ whiteSpace: "normal", wordBreak: "break-all" }}
            >
              {displayValue()}
            </div>
            <BasicInputs
              bStyle={inputStyle}
              listStates={[inputValue, setInputValue]}
            />
          </div>
        </div>
      </div>
    );
  };

  const aInput = () => {
    return (
      <div className="container-demo bwgap">
        <div className="container-demo code">
          <CodeBlock
            text={codeSnippetAL}
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
          <div
            className="container-demo column content"
            style={{ maxWidth: "80%" }}
          >
            <div
              className="container-demo content b-text"
              style={{ whiteSpace: "normal", wordBreak: "break-all" }}
            >
              {displayValue()}
            </div>
            <AdvanceInputs
              bStyle={inputStyle}
              listStates={[inputValueA, setInputValueA]}
              onClick={handleInputClick}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Nav options={{ "/": "Home", "/docs": "Docs" }} />
      <div className="background-b">
        <SideNav
          options={{
            demo1: "Basic Input",
            demo2: "Advanced Input",
          }}
        />
        <div className="demo-holder">
          <div className="demo" id="demo1">
            {bInput()}
            <div className="documentation">
              <Table headers={tableHeadersA} body={tableBodyA} />
            </div>
          </div>
          <div className="demo" id="demo2">
            {aInput()}
            <div className="documentation">
              <Table headers={tableHeadersA} body={tableBodyB} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
