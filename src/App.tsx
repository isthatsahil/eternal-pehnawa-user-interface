import UIWrapper from "./views/wrapper/UIWrapper";
import { Switch, Route } from "react-router-dom";
import routes from "./routing/index";
const App = () => {
  return (
    <>
      <UIWrapper>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                path={route.path}
                key={index}
                exact={route.exact}
                render={() => <route.component />}
              />
            );
          })}
        </Switch>
      </UIWrapper>
    </>
  );
};

export default App;
