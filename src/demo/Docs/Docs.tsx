import "./Docs.css";
import { Nav } from "../Nav/Nav";
import { useHistory } from "react-router-dom";
import gsap from "gsap";
import { MouseEvent, useRef } from "react";

export const Docs = () => {
  const history = useHistory();
  const componentRef = useRef<any>(null);
  const nextStage = useRef<boolean>(false);
  const components: Record<string, string> = {
    Buttons: "Basic Button and Advanced Button",
    Inputs: "Basic Input and Advanced Input and Search Bar",
    Lists: "Basic List and Advanced List",
    Toggles: "Basic Toggle and Advanced Toggle",
    Menus: "Basic Menu and Advanced Menu",
    Forms: "Basic Forms and Advanced Forms",
    Appointments: "Basic Appointments and Advanced Appointments",
    Graphs: "Line Graph and Bar Graph",
  };

  const hoverOverComponent = (element: MouseEvent) => {
    const { target } = element;
    componentRef.current = target;
    if (!nextStage.current && (target as HTMLDivElement).nodeName === "DIV") {
      const componentLiftTimeline = gsap.timeline();
      componentLiftTimeline.to(componentRef.current, {
        y: -20,
      });
      componentLiftTimeline.play();
    }
  };

  const hoverOffComponent = (element: MouseEvent) => {
    const { target } = element;
    if (!nextStage.current && (target as HTMLDivElement).nodeName === "DIV") {
      const componentLiftTimeline = gsap.timeline();
      componentLiftTimeline.to(componentRef.current, {
        y: 0,
      });
      componentLiftTimeline.play();
    }
  };

  const clickComponent = (key: string, element: MouseEvent) => {
    nextStage.current = true;
    const componentSwitchTimeline = gsap.timeline();
    componentSwitchTimeline.to(componentRef.current, {
      y: 0,
      duration: 0,
      onComplete: () => {
        history.push(`/docs/${key.toLowerCase()}`);
      },
    });
    componentSwitchTimeline.play();
  };

  return (
    <>
      <Nav options={{ demo: "Demo" }} />
      <div className="docs">
        <div className="container-start">
          <div className="row-start">
            {Object.keys(components).map((key, idx) => {
              return (
                <div
                  className="column-start component"
                  key={key}
                  ref={componentRef}
                  onMouseEnter={hoverOverComponent}
                  onMouseLeave={hoverOffComponent}
                  onClick={(element) => clickComponent(key, element)}
                >
                  <span
                    className="small-text b-text link bmgap"
                    key={key + idx}
                  >
                    {key}
                  </span>
                  {components[key].split("and").map((component) => {
                    return (
                      <li
                        className="description list"
                        key={key + idx + component}
                      >
                        {component}
                      </li>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
