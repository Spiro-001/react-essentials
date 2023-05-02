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
      padding: "6px 12px 6px 6px",
      borderRadius: "6px",
      border: "1px solid black",
    };
    `,
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
      padding: "6px 12px 6px 6px",
      borderRadius: "6px",
      border: "1px solid black",
    };
    };`,
  ],
  [
    "onClick",
    "false",
    "onclick function",
    "null",
    `
      const handleInputClick = (event: MouseEvent) => {};
    `,
  ],
  [
    "listStates",
    "false",
    "store setStates in an array in the following order [value, setValue]",
    "null",
    `
      const [value, setValue] = useState(0)
      <AdvanceInputs listStates={[value, setValue]} />
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
