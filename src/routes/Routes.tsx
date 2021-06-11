import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../components/App";
import { BoardBuilder } from "../components/BoardBuilder";
import { Page404 } from "../components/utility-components/Page404";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/placeships" component={BoardBuilder}></Route>
        <Route path="/" component={Page404}></Route>
      </Switch>
    </Router>
  );
};
