import "./App.css";
import Form from "./Components/Form/Form";
import { Router, Route, Switch } from "react-router-dom";
import Display from "./Components/Display/Display";
import history from "./Components/Form/history";

function App() {                                                           
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Form />
          </Route>
          <Route path="/display">
            <Display />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
