import "./SideNav.css";

type SideNavProps = {
  options?: Record<any, string>;
};

export const SideNav = ({ options = {} }: SideNavProps) => {
  const handleScrollTo = (key: string) => {
    const element = document.getElementById(key);
    if (key === "1") element?.scrollIntoView({ block: "end" });
    else element?.scrollIntoView({ block: "start" });
  };
  return (
    <div className="side-nav">
      <div className="s-nav-items">
        {Object.keys(options).map((key) => {
          return (
            <span className="s-nav-item" onClick={(e) => handleScrollTo(key)}>
              {options[key]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
