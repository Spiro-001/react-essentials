import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Demo } from "./Demo";
import { ButtonsDemo } from "./demo/ButtonDemo/ButtonDemo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}></Route>
          <Route exact path={"/buttons"}>
            <ButtonsDemo />
          </Route>
          <Route exact path={"/demo"}>
            <Demo />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
