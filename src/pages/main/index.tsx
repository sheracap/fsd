import React, { FC } from "react";

import { MainScreen } from "#widgets/screens/main";
import { Route, Switch } from "react-router-dom";

import { Dashboard } from "./dashboard";

const Main: FC = () => {
  return (
    <MainScreen>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        {/*<Route path="/test" component={Monitoring} />*/}
      </Switch>
    </MainScreen>
  );
};

export default Main;
