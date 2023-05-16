import React, { MouseEvent, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import $ from "jquery";
import "./BasicToggle.css";

type BasicToggleProp = {
  toggleContainerStyle?: React.CSSProperties;
  toggleButtonStyle?: React.CSSProperties;
  toggleState: boolean;
  setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BasicToggle = ({
  toggleContainerStyle,
  toggleButtonStyle,
  toggleState,
  setToggleState,
}: BasicToggleProp) => {
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
    const swipeToggle = gsap.fromTo(
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
    const toggleContainerSwipe = gsap.fromTo(
      toggleContainerRef.current,
      {
        backgroundColor: "rgb(223, 223, 223)",
        boxShadow: "inset 0 0 10px #e2e2e2",
      },
      {
        background: "#53d769",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power4.inOut",
      }
    );
    console.log(toggleState);
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
    const swipeToggle = gsap.fromTo(
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
    const toggleContainerSwipe = gsap.fromTo(
      toggleContainerRef.current,
      {
        backgroundColor: "rgb(223, 223, 223)",
        boxShadow: "inset 0 0 10px #e2e2e2",
      },
      {
        background: "#53d769",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power4.inOut",
      }
    );
    console.log(toggleState);
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
