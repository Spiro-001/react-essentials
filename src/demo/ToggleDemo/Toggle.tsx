import { CodeBlock, dracula } from "react-code-blocks";
import { BasicInputs } from "../../react-essentials/Inputs/BasicInput/BasicInput";
import { Nav } from "../Nav/Nav";
import { Table } from "../Table/Table";
import { tableBodyA, tableBodyB, tableHeadersA } from "./TableInfo";
import { AdvanceInputs } from "../../react-essentials/Inputs/AdvancedInput/AdvanceInput";
import { SideNav } from "../Nav/SideNav";
import React, { MouseEvent, useState } from "react";
import "../Demo.css";
import { BasicToggle } from "../../react-essentials/Toggles/BasicToggle/BasicToggle";
import { AdvanceToggle } from "../../react-essentials/Toggles/AdvanceToggle/AdvanceToggle";

export const ToggleDemo = () => {
  const codeSnippetBL = `
  const [toggleState, setToggleState] = useState<boolean>(true);

  return (
    <div className="container-demo column content" >
      <BasicToggle
        toggleState={toggleState}
        setToggleState={setToggleState}
      />
    </div>
  );
  `;

  const codeSnippetAL = `
  const [bToggleState, bSetToggleState] = useState<boolean>(false);

  return (
    <div className="container-demo column content">
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
    </div>
  );
  `;

  const [toggleState, setToggleState] = useState<boolean>(true);
  const [bToggleState, bSetToggleState] = useState<boolean>(false);

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
            <BasicToggle
              toggleState={toggleState}
              setToggleState={setToggleState}
            />
            <span className="small-text">{toggleState.toString()}</span>
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
            <span className="small-text">{bToggleState.toString()}</span>
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
