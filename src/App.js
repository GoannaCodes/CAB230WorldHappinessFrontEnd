import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./pages/Home";
import {Records} from "./pages/Records";
import Factors from "./pages/Factors";
import {Register} from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/rankings" component={Records}/>
          <Route exact path="/factors" component={Factors}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/logout" component={Logout}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
