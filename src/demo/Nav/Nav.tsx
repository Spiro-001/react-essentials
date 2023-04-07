import "./Nav.css";
import { SideNav } from "./SideNav";

type NavProps = {
  options?: Record<number, string>;
};

export const Nav = ({ options = {} }: NavProps) => {
  return (
    <div className="nav">
      <span className="logo">{`react-essentials`}</span>
      <div className="nav-items">
        {Object.keys(options).map((key) => {
          return <span className="nav-item">{options[parseInt(key)]}</span>;
        })}
      </div>
    </div>
  );
};
