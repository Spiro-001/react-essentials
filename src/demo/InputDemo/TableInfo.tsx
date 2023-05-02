export const tableHeadersA = [
  "Prop name",
  "Optional",
  "Description",
  "Default value",
  "Example values",
];

export const tableBodyA = [
  [
    "bStyle",
    "true",
    "custom button styling",
    "{}",
    `  
      const bStyle = {
      border: "0",
      backgroundColor: "rgb(0, 204, 0)",
      fontWeight: "600",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    };`,
  ],
  [
    "listStates",
    "false",
    "store setStates in an array in the following order [value, setValue]",
    "null",
    `
      const [value, setValue] = useState(0)
      <BasicInputs listStates={[value, setValue]} />
    `,
  ],
  [
    "placeholder",
    "true",
    "input placeholder",
    "Input Value...",
    `
      "Enter a value..."
    `,
  ],
];

export const tableBodyB = [
  [
    "bStyle",
    "true",
    "custom button styling",
    "{}",
    `  
      const bStyle = {
      border: "0",
      backgroundColor: "rgb(0, 204, 0)",
      fontWeight: "600",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    };`,
  ],
  [
    "onClick",
    "false",
    "onclick function",
    "null",
    `
      const handleOnClick = () => {
      setCountClicks((prevCount) => prevCount + 1);
    };`,
  ],
  [
    "listStates",
    "false",
    "store setStates in an array in the following order [value, setValue]",
    "null",
    `
      const [value, setValue] = useState(0)
      <BasicInputs listStates={[value, setValue]} />
    `,
  ],
  [
    "placeholder",
    "true",
    "input placeholder",
    "Input Value...",
    `
      "Enter a value..."
    `,
  ],
];
