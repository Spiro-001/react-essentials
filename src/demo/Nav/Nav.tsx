import { useHistory } from "react-router-dom";
import "./Nav.css";

type NavProps = {
  options?: Record<string, string>;
};

export const Nav = ({ options = {} }: NavProps) => {
  const history = useHistory();

  return (
    <div className="nav">
      <span className="logo red" onClick={(element) => history.push("/")}>
        react-essentials
      </span>
      <div className="nav-items">
        {Object.keys(options).map((key) => {
          return (
            <span
              className="nav-item"
              key={key}
              onClick={(element) => history.push(`${key}`)}
            >
              {options[key]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
