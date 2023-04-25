import "./Home.css";
import ReactLogo from "./logo-react-svgrepo-com.svg";
import { Nav } from "../Nav/Nav";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();
  return (
    <div className="home">
      <Nav />
      <div className="container">
        <img src={ReactLogo} alt="react-logo" className="react-logo" />
        <div className="row">
          <span className="big-text b-text">react-essentials</span>
          <span className="mini-text">by Yong Kim</span>
        </div>
        <div className="row">
          <span
            className="small-text round-b link"
            onClick={(element) => history.push("/demo")}
          >
            Demo
          </span>
          <span
            className="small-text round-b link"
            onClick={(element) => history.push("/docs")}
          >
            Documentation
          </span>
        </div>
      </div>
    </div>
  );
};
