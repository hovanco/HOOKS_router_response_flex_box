import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/ABOUT/About";
import Dashboard from "./components/DASHBOARD/Dashboard";
import Home from "./components/HOME/Home";
import Notfound from "./components/NOTFOUND/Notfound";
import "./App.scss";
import { flatMap } from "lodash";

// history.replace: from page3 to page1,
// history.goBack: come back 1 page <==> history.go(-1),
// history.goForward(): go to 1 page <==> history.go(1)

function App() {
  // custom link

  const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => {
          var active = match ? "active abc" : "";
          return (
            <li className={`my-li ${active}`}>
              <Link to={to} className="my-link">
                {label}
              </Link>
            </li>
          );
        }}
      />
    );
  };
  return (
    <Router>
      <div className="d-flex">
        <ul className="center-li">
          <li>
            <Link label="Home" to="/home" activeOnlyWhenExact={true}>
              Home
            </Link>
          </li>
          <li>
            <Link label="About" to="/" activeOnlyWhenExact={true}>
              About
            </Link>
          </li>
          <li>
            <Link label="Dashboard" to="/dashboard" activeOnlyWhenExact={true}>
              Dashboard
            </Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/" component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
