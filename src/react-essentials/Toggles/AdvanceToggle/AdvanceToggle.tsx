import React, { MouseEvent, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import $ from "jquery";
import "./AdvanceToggle.css";

type AdvanceToggleProp = {
  toggleContainerStyle?: React.CSSProperties;
  toggleButtonStyle?: React.CSSProperties;
  toggleButtonAnimation?: Array<GSAPTweenVars>;
  toggleContainerAnimation?: Array<GSAPTweenVars>;
  toggleState: boolean;
  setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdvanceToggle = ({
  toggleContainerStyle,
  toggleButtonStyle,
  toggleState,
  setToggleState,
  toggleButtonAnimation,
  toggleContainerAnimation,
}: AdvanceToggleProp) => {
  const toggleContainerRef = useRef<HTMLDivElement>(null);
  const toggleCircleRef = useRef<HTMLSpanElement>(null);
  const handleToggleClick = (event: MouseEvent) => {
    const { target } = event;
    let paddingOffsets =
      ($(toggleContainerRef.current as HTMLDivElement).innerWidth() ?? 0) -
      ($(toggleContainerRef.current as HTMLDivElement).width() ?? 0);
    let moveAmount =
      (toggleContainerRef.current?.clientWidth ?? 0) -
      (target as HTMLDivElement).clientWidth -
      paddingOffsets;

    let swipeToggle;
    if (toggleButtonAnimation) {
      swipeToggle = gsap.fromTo(
        target,
        { x: 0, ...toggleButtonAnimation[0] },
        {
          x: moveAmount,
          ...toggleButtonAnimation[1],
        }
      );
    } else {
      swipeToggle = gsap.fromTo(
        target,
        {
          x: 0,
        },
        {
          x: moveAmount,
          duration: 0.3,
          ease: "power4.inOut",
        }
      );
    }
    let toggleContainerSwipe;
    if (toggleContainerAnimation) {
      toggleContainerSwipe = gsap.fromTo(
        toggleContainerRef.current,
        toggleContainerAnimation[0],
        toggleContainerAnimation[1]
      );
    } else {
      toggleContainerSwipe = gsap.fromTo(
        toggleContainerRef.current,
        {
          backgroundColor: "rgb(223, 223, 223)",
          boxShadow: "inset 0 0 10px #e2e2e2",
        },
        {
          backgroundColor: "#53d769",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power4.inOut",
        }
      );
    }

    if (!toggleState) {
      swipeToggle.play();
      toggleContainerSwipe.play().then(() => {
        setToggleState((prevState) => !prevState);
      });
    } else {
      swipeToggle.reverse(0);
      toggleContainerSwipe.reverse(0).then(() => {
        setToggleState((prevState) => !prevState);
      });
    }
  };

  useLayoutEffect(() => {
    let paddingOffsets =
      ($(toggleContainerRef.current as HTMLDivElement).innerWidth() ?? 0) -
      ($(toggleContainerRef.current as HTMLDivElement).width() ?? 0);
    let moveAmount =
      (toggleContainerRef.current?.clientWidth ?? 0) -
      (toggleCircleRef.current as HTMLDivElement).clientWidth -
      paddingOffsets;
    let swipeToggle;
    if (toggleButtonAnimation) {
      swipeToggle = gsap.fromTo(
        toggleCircleRef.current,
        { x: 0, ...toggleButtonAnimation[0] },
        {
          x: moveAmount,
          ...toggleButtonAnimation[1],
        }
      );
    } else {
      swipeToggle = gsap.fromTo(
        toggleCircleRef.current,
        {
          x: 0,
        },
        {
          x: moveAmount,
          duration: 0.3,
          ease: "power4.inOut",
        }
      );
    }
    let toggleContainerSwipe;
    if (toggleContainerAnimation) {
      toggleContainerSwipe = gsap.fromTo(
        toggleContainerRef.current,
        toggleContainerAnimation[0],
        toggleContainerAnimation[1]
      );
    } else {
      toggleContainerSwipe = gsap.fromTo(
        toggleContainerRef.current,
        {
          backgroundColor: "rgb(223, 223, 223)",
          boxShadow: "inset 0 0 10px #e2e2e2",
        },
        {
          backgroundColor: "#53d769",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power4.inOut",
        }
      );
    }
    if (toggleState) {
      swipeToggle.play();
      toggleContainerSwipe.play().then(() => {
        setToggleState((prevState) => !prevState);
      });
    } else {
      swipeToggle.pause();
      toggleContainerSwipe.pause();
    }
  }, []);

  return (
    <div
      className="toggle-container"
      ref={toggleContainerRef}
      style={toggleContainerStyle}
    >
      <span
        style={toggleButtonStyle}
        ref={toggleCircleRef}
        className="toggle-circle"
        onClick={(event) => handleToggleClick(event)}
      ></span>
    </div>
  );
};
