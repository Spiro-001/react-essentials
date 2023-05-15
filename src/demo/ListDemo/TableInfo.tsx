export const tableHeadersA = [
  "Prop name",
  "Optional",
  "Description",
  "Default value",
  "Example values",
];

export const tableBodyA = [
  [
    "defaultStyle",
    "true",
    "custom list styling",
    `  
    const defaultStyle = {
      minWidth: "200px"
    }
    `,
    `  
    const defaultStyle = {
      minWidth: "200px"
    }
    `,
  ],
  [
    "listItemStyle",
    "true",
    "custom list item styling",
    `  
    const listItemStyle = {
      backgroundColor: "white"
    }
    `,
    `  
    const listItemStyle = {
      backgroundColor: "white"
    }
    `,
  ],
  [
    "styleNoItems",
    "true",
    "custom list item when no items left styling",
    `  
    const defaultStyle = listItemStyle
    `,
    `  
    const defaultStyle = listItemStyle
    `,
  ],
  [
    "aSetting",
    "true",
    "gsap setting for when item appears or is removed",
    `  
      aSetting = {
      opacity: 0,
      height: 0,
      padding: "0px 24px",
      duration: 0.3,
      }
    `,
    `
      aSetting = {
        opacity: 0,
        height: 0,
        padding: "0px 24px",
        duration: 0.3,
      }
    `,
  ],
  [
    "onClick",
    "true",
    "onclick function",
    "() => {}",
    `
      const handleClick = () => { console.log("hello!") }
    `,
  ],
  [
    "ifEmpty",
    "true",
    "displays when the list is empty",
    "The list is empty.",
    `
      No more items!
    `,
  ],
  [
    "listObjectProp",
    "true",
    "useState for the items carried in the list, ONLY ONE CAN BE USED EITHER CHILDREN OR USESTATE NOT BOTH",
    "{}",
    `
      const [list, setList] = useState()
      <BasicList listObjectProp={list} />
    `,
  ],
  [
    "setListObjectProp",
    "true",
    "useState for the items carried in the list, ONLY ONE CAN BE USED EITHER CHILDREN OR USESTATE NOT BOTH",
    "{}",
    `
      const [list, setList] = useState()
      <BasicList setListObjectProp={setList} />
    `,
  ],
  [
    "children",
    "true",
    "displays when the list is empty",
    "The list is empty.",
    `
      No more items!
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
