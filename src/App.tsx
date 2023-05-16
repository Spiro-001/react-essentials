import "./App.css";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { Demo } from "./Demo";
import { ButtonsDemo } from "./demo/ButtonDemo/ButtonDemo";
import { Docs } from "./demo/Docs/Docs";
import { Home } from "./demo/Home/Home";
import { InputDemo } from "./demo/InputDemo/Input";
import { ListDemo } from "./demo/ListDemo/List";
import { ToggleDemo } from "./demo/ToggleDemo/Toggle";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/demo"}>
            <Demo />
          </Route>
          <Route exact path={"/docs/buttons"}>
            <ButtonsDemo />
          </Route>
          <Route exact path={"/docs/inputs"}>
            <InputDemo />
          </Route>
          <Route exact path={"/docs/lists"}>
            <ListDemo />
          </Route>
          <Route exact path={"/docs/toggles"}>
            <ToggleDemo />
          </Route>
          <Route exact path={"/docs"}>
            <Docs />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
