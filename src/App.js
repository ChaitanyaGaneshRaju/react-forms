import "./App.css";
import Form from "./Components/Form/Form";
import { Router, Route, Switch } from "react-router-dom";
import Display from "./Components/Display/Display";
import history from "./Components/Form/history";
// import { useEffect } from "react";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

function App(props) {                                                           
  return (
    <div className="App">
      <Router>
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
