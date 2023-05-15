import { useRef, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { AdvanceButton } from "../../react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicButton } from "../../react-essentials/Buttons/SimpleButtons/BasicButton";
import { BasicInputs } from "../../react-essentials/Inputs/BasicInput/BasicInput";
import { BasicList } from "../../react-essentials/Lists/BasicList/BasicList";
import { Nav } from "../Nav/Nav";
import { SideNav } from "../Nav/SideNav";
import { Table } from "../Table/Table";
import { tableBodyA, tableBodyB, tableHeadersA } from "./TableInfo";

export const ListDemo = () => {
  const aButtonRef = useRef<HTMLDivElement>(null);
  const [listObjects, setListObjects] = useState<Record<number, string>>({
    1: "Doug",
    2: "Charles",
    3: "Ryan",
    4: "Mark",
  });
  const [input, setInput] = useState<string | null>("");

  var containerStyle: React.CSSProperties = {
    gap: 0,
    height: "fit-content",
    justifyContent: "space-between",
    alignItems: "space-between",
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
    padding: "12px",
    boxSizing: "border-box",
    borderRadius: "8px",
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

  const codeSnippetBL = `
  const aButtonRef = useRef<HTMLDivElement>(null);
  const [listObjects, setListObjects] = useState<Record<number, string>>({
    1: "Doug",
    2: "Charles",
    3: "Ryan",
    4: "Mark",
  });
  const [input, setInput] = useState<string | null>("");

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

  return (
    <>
      <div className="container-demo inner">
        <div className="container" style={containerStyle}>
          <BasicList
            onClick={handleClickA}
            listObjectsProp={listObjects}
            setListObjectsProp={setListObjects}
          />
          <div className="container" style={buttonContainerStyle}>
            <BasicButton
              onClick={handleClickB}
              value="Add new item to list"
            />
            <AdvanceButton
              onClick={handleClickA}
              value="Delete last item from list"
              ref={aButtonRef}
            />
          </div>
        </div>
      </div>
      <div className="container" style={buttonContainerStyle}>
        <BasicButton
          onClick={handleClickB}
          value="Add new item to list"
        />
        <AdvanceButton
          onClick={handleClickA}
          value="Delete last item from list"
          ref={aButtonRef}
        />
      </div>
    </>
  )
  `;

  const codeSnippetAL = `
  const handleInputClick = (event: MouseEvent) => {};
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
        <div className="container-demo inner" style={{ gap: "0px 12px" }}>
          <div className="container" style={containerStyle}>
            <BasicList
              onClick={handleClickA}
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
          </div>
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
            <BasicInputs
              listStates={[input, setInput]}
              bStyle={{
                padding: "12px 24px 12px 12px",
                borderRadius: "8px",
                border: "1px solid black",
              }}
              placeholder="Add to this list..."
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
            ></div>
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
            1: "Basic List",
            2: "Advanced List",
          }}
        />
        <div className="demo-holder">
          <div className="demo" id="1">
            {bInput()}
            <div className="documentation">
              <Table headers={tableHeadersA} body={tableBodyA} />
            </div>
          </div>
          <div className="demo" id="2">
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
