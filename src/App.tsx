import "./App.css";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { Demo } from "./Demo";
import { ButtonsDemo } from "./demo/ButtonDemo/ButtonDemo";
import { Docs } from "./demo/Docs/Docs";
import { Home } from "./demo/Home/Home";
import { Input } from "./demo/InputDemo/Input";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/buttons"}>
            <ButtonsDemo />
          </Route>
          <Route exact path={"/inputs"}>
            <Input />
          </Route>
          <Route exact path={"/demo"}>
            <Demo />
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
