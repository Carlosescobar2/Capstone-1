import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useState, useEffect} from 'react'




import Login from "./Components/login_components/login";
import Register from "./Components/login_components/Register";
import Reset from "./Components/login_components/Reset";
import Dashboard from "./Components/login_components/Dashboard";


function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
    
  );
}
export default App;
