import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Demo } from "./Demo";
import { ButtonsDemo } from "./demo/ButtonDemo/ButtonDemo";
import { Docs } from "./demo/Docs/Docs";
import { Home } from "./demo/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/buttons"}>
            <ButtonsDemo />
          </Route>
          <Route exact path={"/demo"}>
            <Demo />
          </Route>
          <Route exact path={"/docs"}>
            <Docs />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
