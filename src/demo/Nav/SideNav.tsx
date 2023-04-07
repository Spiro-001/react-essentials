import "./Nav.css";

type SideNavProps = {
  options?: Record<number, string>;
};

export const SideNav = ({ options = {} }: SideNavProps) => {
  return (
    <div className="side-nav">
      <div className="s-nav-items">
        {Object.keys(options).map((key) => {
          return <span className="s-nav-item">{options[parseInt(key)]}</span>;
        })}
      </div>
    </div>
  );
};
