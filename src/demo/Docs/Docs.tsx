import "./Docs.css";
import { Nav } from "../Nav/Nav";
import { useHistory } from "react-router-dom";

export const Docs = () => {
  const components: Record<string, string> = {
    Buttons: "Basic Button and Advanced Button",
    Inputs: "Basic Input and Advanced Input and Search Bar",
    Lists: "Basic List and Advanced List",
    Menus: "Basic Menu and Advanced Menu",
    Forms: "Basic Forms and Advanced Forms",
    Appointments: "Basic Appointments and Advanced Forms",
    Graphs: "Line Graph and Bar Graph",
  };
  const history = useHistory();

  return (
    <>
      <Nav options={{ demo: "Demo" }} />
      <div className="docs">
        <div className="container">
          <div className="row-start">
            {Object.keys(components).map((key) => {
              return (
                <div className="column-start component">
                  <span
                    className="small-text b-text link bmgap"
                    onClick={(element) => history.push(`/${key.toLowerCase()}`)}
                  >
                    {key}
                  </span>
                  {components[key].split("and").map((component) => {
                    return <li className="description list">{component}</li>;
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
