import UIWrapper from "./views/wrapper/UIWrapper";
import { Switch, Route, useLocation } from "react-router-dom";
import routes from "./routing/index";
import { AnimatePresence } from "framer-motion";
import { useGetCartQuery } from "./redux/services/cart";
import { useGetAllCustomersQuery } from "./redux/services/customers";
const App = () => {
  const location = useLocation();
  const cartResponse = useGetCartQuery("");
  console.log({ incart: cartResponse });
  useGetAllCustomersQuery("");
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
