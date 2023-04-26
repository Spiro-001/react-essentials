import "./Home.css";
import { ReactComponent as ReactLogo } from "./logo-react-svgrepo-com.svg";
import { Nav } from "../Nav/Nav";
import { useHistory } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const Home = () => {
  const homeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  useLayoutEffect(() => {
    const loadInTimeline = gsap.timeline();
    loadInTimeline.to(containerRef.current, {
      y: 10,
      opacity: 0,
      reversed: true,
      duration: 1,
    });
    loadInTimeline.play();
  });

  return (
    <div className="home" ref={homeRef}>
      <div className="container" ref={containerRef}>
        <ReactLogo className="react-logo" />
        <div className="row">
          <span className="big-text b-text red">react-essentials</span>
          <span className="mini-text">by Yong Kim</span>
        </div>
        <div className="row">
          <span
            className="small-text round-b link b"
            onClick={(element) => history.push("/demo")}
          >
            Demo
          </span>
          <span
            className="small-text round-b link b"
            onClick={(element) => history.push("/docs")}
          >
            Documentation
          </span>
          <a
            className="small-text round-b link b"
            href="https://github.com/Spiro-001/react-essentials"
            target="__blank"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
};
