export const tableHeadersA = [
  "Prop name",
  "Optional",
  "Description",
  "Default value",
  "Example values",
];

export const tableBodyA = [
  [
    "toggleContainerStyle",
    "true",
    "custom toggle container style",
    "{}",
    `  
    const toggleContainerStyle={{
      height: "50px",
      width: "100px",
      borderRadius: "500px",
    }}
    `,
  ],
  [
    "toggleButtonStyle?",
    "true",
    "custom button on toggle style",
    "{}",
    `
    toggleButtonStyle={{ height: "40px", width: "40px" }}
    `,
  ],
  [
    "toggleState?",
    "false",
    "useState for the toggle state",
    "{}",
    `
    const [toggleState, setToggleState] = useState<boolean>(true);
    `,
  ],
  [
    "setToggleState",
    "false",
    "useState for the toggle state",
    "null",
    `
    const [toggleState, setToggleState] = useState<boolean>(true);
    `,
  ],
];

export const tableBodyB = [
  [
    "toggleContainerStyle",
    "true",
    "custom toggle container style",
    "{}",
    `  
    const toggleContainerStyle={{
      height: "50px",
      width: "100px",
      borderRadius: "500px",
    }}
    `,
  ],
  [
    "toggleButtonStyle?",
    "true",
    "custom button on toggle style",
    "{}",
    `
    toggleButtonStyle={{ height: "40px", width: "40px" }}
    `,
  ],
  [
    "toggleButtonAnimation",
    "true",
    "custom animation using gsap tweens",
    "{}",
    `
    toggleButtonAnimation={[
      { backgroundColor: "#545454" },
      {
        backgroundColor: "white",
        duration: 0.3,
        ease: "power4.inOut",
      },
    ]}
    `,
  ],
  [
    "toggleContainerAnimation",
    "true",
    "custom animation using gsap tweens",
    "{}",
    `
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
    `,
  ],
  [
    "toggleState?",
    "false",
    "useState for the toggle state",
    "{}",
    `
    const [toggleState, setToggleState] = useState<boolean>(true);
    `,
  ],
  [
    "setToggleState",
    "false",
    "useState for the toggle state",
    "null",
    `
    const [toggleState, setToggleState] = useState<boolean>(true);
    `,
  ],
];
