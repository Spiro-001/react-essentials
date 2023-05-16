import gsap from "gsap";
import { MouseEvent, useRef, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { AdvanceButton } from "../../react-essentials/Buttons/AdvanceButtons/AdvanceButton";
import { BasicButton } from "../../react-essentials/Buttons/SimpleButtons/BasicButton";
import { BasicInputs } from "../../react-essentials/Inputs/BasicInput/BasicInput";
import { AdvanceList } from "../../react-essentials/Lists/AdvanceList/AdvanceList";
import { BasicList } from "../../react-essentials/Lists/BasicList/BasicList";
import { Nav } from "../Nav/Nav";
import { SideNav } from "../Nav/SideNav";
import { Table } from "../Table/Table";
import { tableBodyA, tableBodyB, tableHeadersA } from "./TableInfo";

export const ListDemo = () => {
  const aButtonRef = useRef<HTMLDivElement>(null);
  const bButtonRef = useRef<HTMLDivElement>(null);
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

  const [input, setInput] = useState<string | null>("");
  const [cInput, cSetInput] = useState<string | null>("");

  var containerStyle: React.CSSProperties = {
    gap: 0,
    height: "fit-content",
    justifyContent: "space-between",
    alignItems: "space-between",
    borderRadius: "8px",
    padding: "12px 12px",
    backgroundColor: "rgba(200, 255, 238, 1)",
    width: "fit-content",
    boxSizing: "border-box",
  };

  var buttonContainerStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 207, 131, 1)",
    height: "fit-content",
    padding: "12px",
    boxSizing: "border-box",
    borderRadius: "8px",
  };

  const handleClickA = (event: MouseEvent) => {
    if (Object.keys(listObjects).length) {
      setListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey: any = Object.keys(copyList).pop();
        delete copyList[lastKey];
        return copyList;
      });
    } else {
      gsap.fromTo(
        event.currentTarget,
        {
          x: 10,
        },
        {
          x: 0,
          ease: "elastic.out(1, 0.1)",
          duration: 1,
        }
      );
    }
  };

  const handleClickB = (event: MouseEvent) => {
    if (input && Object.keys(listObjects).length < 5) {
      setListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey = parseInt(
          Object.keys(copyList)[Object.keys(copyList).length - 1]
        );
        copyList[lastKey ? lastKey + 1 : 1] = input;
        setInput("");
        return copyList;
      });
    } else {
      gsap.fromTo(
        event.currentTarget,
        {
          x: 10,
        },
        {
          x: 0,
          ease: "elastic.out(1, 0.1)",
          duration: 1,
        }
      );
    }
  };

  const aHandleClickA = (event: MouseEvent) => {
    if (Object.keys(aListObjects).length) {
      aSetListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey: any = Object.keys(copyList).pop();
        delete copyList[lastKey];
        return copyList;
      });
    } else {
      gsap.fromTo(
        event.currentTarget,
        {
          x: 10,
        },
        {
          x: 0,
          ease: "elastic.out(1, 0.1)",
          duration: 1,
        }
      );
    }
  };

  const aHandleClickB = (event: MouseEvent) => {
    if (cInput && Object.keys(listObjects).length < 5) {
      aSetListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey = parseInt(
          Object.keys(copyList)[Object.keys(copyList).length - 1]
        );
        copyList[lastKey ? lastKey + 1 : 1] = cInput;
        cSetInput("");
        return copyList;
      });
    } else {
      gsap.fromTo(
        event.currentTarget,
        {
          x: 10,
        },
        {
          x: 0,
          ease: "elastic.out(1, 0.1)",
          duration: 1,
        }
      );
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
    <div className="container-demo bwgap">
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
            backgroundColor: "inherit",
          }}
          listItemStyle={{
            width: "200px",
            outline: "0px",
            boxShadow:
              "0px 2px 2px rgba(154, 220, 200, 0.8), 0px 3px 2px rgba(113, 188, 166, 0.8)",
            borderRadius: "6px",
            backgroundColor: "white",
          }}
        />
      </div>
      <div className="container" style={buttonContainerStyle}>
        <BasicButton
          onClick={handleClickB}
          value="Add new item to list"
          bStyle={{
            width: "100%",
            textAlign: "center",
            border: "0",
            boxShadow:
              "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
          }}
        />
        <AdvanceButton
          bStyle={{
            width: "100%",
            textAlign: "center",
            border: "0",
            boxShadow:
              "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
          }}
          onClick={handleClickA}
          value="Delete last item from list"
          ref={aButtonRef}
        />
        <BasicInputs
          listStates={[input, setInput]}
          bStyle={{
            padding: "12px 24px 12px 12px",
            borderRadius: "8px",
            border: "0",
          }}
          placeholder="Add to this list..."
        />
      </div>
    </div>
  )
  `;

  const codeSnippetAL = `
  const aButtonRef = useRef<HTMLDivElement>(null);
  const [aListObjects, aSetListObjects] = useState<Record<number, string>>({
    1: "James Laur",
    2: "Malcolm Sultz",
    3: "Ricky White",
    4: "Mark Hale",
  });
  const [cInput, cSetInput] = useState<string | null>("");

  const aHandleClickA = () => {
    if (Object.keys(listObjects).length)
      setListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey: any = Object.keys(copyList).pop();
        delete copyList[lastKey];
        return copyList;
      });
  };

  const aHandleClickB = () => {
    if (cInput) {
      setListObjects((prevList) => {
        const copyList = structuredClone(prevList);
        let lastKey = parseInt(
          Object.keys(copyList)[Object.keys(copyList).length - 1]
        );
        copyList[lastKey ? lastKey + 1 : 1] = cInput;
        setInput("");
        return copyList;
      });
    }
  };

  return (
    <div className="container-demo bwgap">
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
          listItemStyle={{
            minWidth: "200px",
            padding: "12px 24px 12px 12px",
            borderRadius: "6px",
            outline: "1px dashed black",
            backgroundColor: "white",
          }}
          ref={aListRef}
        >
          {Object.keys(aListObjects).map((listItem) => {
            return (
              <div key={listItem} className="custom-list-item">
                <img
                  src={https://picsum.photos/200/300}
                  alt="lorem"
                  className="test-image"
                />
                {aListObjects[parseInt(listItem)]}
              </div>
            );
          })}
        </AdvanceList>
      </div>
      <div className="container" style={buttonContainerStyle}>
        <BasicButton
          onClick={aHandleClickB}
          value="Add new item to list"
          bStyle={{
            width: "100%",
            textAlign: "center",
            border: "0",
            boxShadow:
              "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
          }}
        />
        <AdvanceButton
          onClick={aHandleClickA}
          value="Delete last item from list"
          ref={bButtonRef}
          bStyle={{
            width: "100%",
            textAlign: "center",
            border: "0",
            boxShadow:
              "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
          }}
        />
        <BasicInputs
          listStates={[cInput, cSetInput]}
          bStyle={{
            padding: "12px 24px 12px 12px",
            borderRadius: "8px",
            border: "0",
          }}
          placeholder="Add to this list..."
        />
      </div>
    </div>
  );
  `;

  const bInput = () => {
    return (
      <div
        className="container-demo bwgap"
        style={{ alignItems: "flex-start" }}
      >
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
        <div
          className="container-demo inner"
          style={{
            gap: "0px 12px",
            minHeight: "600px",
            alignItems: "flex-end",
          }}
        >
          <div className="container" style={containerStyle}>
            <BasicList
              onClick={() => {}}
              listObjectsProp={listObjects}
              setListObjectsProp={setListObjects}
              defaultStyle={{
                padding: "24px 0px",
                borderRadius: "0px",
                minHeight: "400px",
                border: 0,
                backgroundColor: "inherit",
              }}
              listItemStyle={{
                width: "200px",
                outline: "0px",
                boxShadow:
                  "0px 2px 2px rgba(154, 220, 200, 0.8), 0px 3px 2px rgba(113, 188, 166, 0.8)",
                borderRadius: "6px",
                backgroundColor: "white",
                margin: "0px 0px 12px 0px",
              }}
            />
          </div>
          <div className="container" style={buttonContainerStyle}>
            <BasicButton
              onClick={(event) => handleClickB(event)}
              value="Add new item to list"
              bStyle={{
                width: "100%",
                textAlign: "center",
                border: "0",
                boxShadow:
                  "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
              }}
            />
            <AdvanceButton
              bStyle={{
                width: "100%",
                textAlign: "center",
                border: "0",
                boxShadow:
                  "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
              }}
              onClick={(event) => handleClickA(event)}
              value="Delete last item from list"
              ref={aButtonRef}
            />
            <BasicInputs
              listStates={[input, setInput]}
              bStyle={{
                padding: "12px 24px 12px 12px",
                borderRadius: "8px",
                border: "0",
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
      <div
        className="container-demo bwgap"
        style={{ alignItems: "flex-start" }}
      >
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
        <div
          className="container-demo inner"
          style={{
            gap: "0px 12px",
            minHeight: "600px",
            alignItems: "flex-end",
          }}
        >
          <div className="container" style={containerStyle}>
            <AdvanceList
              onClick={() => {}}
              listClick={() => {}}
              listObjectsProp={aListObjects}
              setListObjectsProp={aSetListObjects}
              draggable={true}
              defaultStyle={{
                padding: "24px 12px",
                borderRadius: "0px",
                border: 0,
                gap: "12px",
                minHeight: "450px",
              }}
              listItemStyle={{
                minWidth: "200px",
                padding: "12px 24px 12px 12px",
                borderRadius: "6px",
                outline: "1px solid black",
                backgroundColor: "white",
              }}
              ref={aListRef}
            >
              {Object.keys(aListObjects).map((listItem) => {
                return (
                  <div key={listItem} className="custom-list-item">
                    <img
                      src={`https://picsum.photos/seed/${1}/300/300`}
                      alt="lorem"
                      className="test-image"
                    />
                    {aListObjects[parseInt(listItem)]}
                  </div>
                );
              })}
            </AdvanceList>
          </div>
          <div className="container" style={buttonContainerStyle}>
            <BasicButton
              onClick={(event) => aHandleClickB(event)}
              value="Add new item to list"
              bStyle={{
                width: "100%",
                textAlign: "center",
                border: "0",
                boxShadow:
                  "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
              }}
            />
            <AdvanceButton
              onClick={(event) => aHandleClickA(event)}
              value="Delete last item from list"
              ref={bButtonRef}
              bStyle={{
                width: "100%",
                textAlign: "center",
                border: "0",
                boxShadow:
                  "0px 2px 2px rgba(221, 170, 88, 0.8), 0px 3px 2px rgba(202, 143, 50, 0.8)",
              }}
            />
            <BasicInputs
              listStates={[cInput, cSetInput]}
              bStyle={{
                padding: "12px 24px 12px 12px",
                borderRadius: "8px",
                border: "0",
              }}
              placeholder="Add to this list..."
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
            demo1: "Basic List",
            demo2: "Advanced List",
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
