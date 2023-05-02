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
    "value",
    "true",
    "text on the button",
    "null",
    `
        const buttonText = "Click Me!"
      `,
  ],
  [
    "noAnim",
    "true",
    "enable animation",
    "true",
    `
        true or false
      `,
  ],
  [
    "children",
    "true",
    "this enables the ability to wrap children elements, use this similarly to value",
    "null",
    `
        <BasicButton>Click Me!</BasicButton>
      `,
  ],
];

export const tableHeadersB = [
  "Prop name",
  "Optional",
  "Description",
  "Default value",
  "Example values",
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
    "value",
    "true",
    "text on the button",
    "null",
    `
        const buttonText = "Click Me!"
    `,
  ],
  [
    "anim",
    "true",
    "custom animation using gsap",
    "{ keyframes: [{ y: 1, durataion: 0.1 }, { y: 0, duration: 0.1 }] }",
    `
        { y: 20, duration: 2 }
    `,
  ],
  [
    "children",
    "true",
    "this enables the ability to wrap children elements, use this similarly to value",
    "null",
    `
        <AdvancedButton>Click Me!</AdvancedButton>
    `,
  ],
  [
    "ref",
    "true",
    "foward ref object",
    "null",
    "<AdvancedButton ref={buttonRef} />",
  ],
];
