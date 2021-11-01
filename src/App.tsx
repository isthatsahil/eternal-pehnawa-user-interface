import UIWrapper from "./views/wrapper/UIWrapper";
import { Switch, Route, useLocation } from "react-router-dom";
import routes from "./routing/index";
import { AnimatePresence } from "framer-motion";
const App = () => {
  const location = useLocation();
  return (
    <>
      <UIWrapper>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
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
        </AnimatePresence>
      </UIWrapper>
    </>
  );
};

export default App;
