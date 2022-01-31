import UIWrapper from "./views/wrapper/UIWrapper";
import { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import routes from "./routing/index";
import { AnimatePresence } from "framer-motion";
import { useGetCartQuery } from "./redux/services/cart";
import { useGetAllCustomersQuery } from "./redux/services/customers";
import { useGetAllCategoriesQuery } from "./redux/services/products";
import { commerce } from "./lib/commerce";
import axios from "axios";
const App = () => {
  const location = useLocation();
  useGetAllCustomersQuery("");
  useGetAllCategoriesQuery("");

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
