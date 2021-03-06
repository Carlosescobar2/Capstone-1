import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";




import Login from "./Components/login_components/login";
import Register from "./Components/login_components/Register";
import Reset from "./Components/login_components/Reset";
import Dashboard from "./Components/login_components/Dashboard";
import CreateWand from "./Components/pages/CreateWand";
import Certification from "./Components/pages/Certification"



function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/CreateWand" component={CreateWand} />
          <Route exact path= "/Certification" component={Certification} />
        </Switch>
      </Router>
    </div>
    
  );
}
export default App;
