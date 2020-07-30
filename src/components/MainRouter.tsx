import React from "react";
import s from "./MainRouter.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AirCraftSelector from "./aircraftSelector/AirCraftSelector";
import RouteMaker from "./routeMaker/RouteMaker";

const MainRouter = () => {
  return (
    <div className={s.container}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <AirCraftSelector />;
            }}
          />
          <Route
            exact
            path="/make-a-route/:aircraft/:base"
            render={(props) => {
              return <RouteMaker {...props} />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default MainRouter;
