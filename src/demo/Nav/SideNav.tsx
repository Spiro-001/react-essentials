import "./SideNav.css";

type SideNavProps = {
  options?: Record<any, string>;
};

export const SideNav = ({ options = {} }: SideNavProps) => {
  const handleScrollTo = (key: string) => {
    const element = document.getElementById(key);
    let scrollTo = element?.getBoundingClientRect().top;
    console.log(scrollTo);
    if (!scrollTo) scrollTo = 0;
    if (scrollTo >= 116 || scrollTo <= 0) {
      if (key === "1") window.scrollTo({ top: 0 });
      else window.scroll({ top: scrollTo - 116 });
    }
  };
  return (
    <div className="side-nav">
      <div className="s-nav-items">
        {Object.keys(options).map((key) => {
          return (
            <span
              className="s-nav-item"
              key={key}
              onClick={(e) => handleScrollTo(key)}
            >
              {options[key]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
