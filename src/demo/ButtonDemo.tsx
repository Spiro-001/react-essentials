import { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { BasicButton } from "../react-essentials/Buttons/SimpleButtons/BasicButton";
import "./ButtonDemo.css";

export const ButtonsDemo = () => {
  const codeSnippet = `
  const [countClicks, setCountClicks] = useState<number>(0);

  const handleOnClick = () => {
    setCountClicks((prevCount) => prevCount + 1);
  };

  return (
    <div className="buttons-demo">
      <div className="container-demo">
        <div className="container-demo">{countClicks}</div>
        <BasicButton onClick={handleOnClick} value="Click Me!" />
      </div>
    </div>
  );
};
  `;

  const [countClicks, setCountClicks] = useState<number>(0);

  const handleOnClick = () => {
    setCountClicks((prevCount) => prevCount + 1);
  };

  return (
    <div className="demo">
      <div className="container-demo bwgap">
        <div className="container-demo code">
          <CodeBlock
            text={codeSnippet}
            language={"tsx"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={dracula}
          />
        </div>
        <div className="container-demo column">
          <div className="container-demo">{countClicks}</div>
          <BasicButton onClick={handleOnClick} value="Click Me!" />
        </div>
      </div>
    </div>
  );
};
