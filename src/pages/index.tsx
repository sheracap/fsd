import React, { lazy } from "react";

import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";

const Main = lazy(() => import("./main"));

export const history = createBrowserHistory();

export const Routing = () => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </>
  );
};
