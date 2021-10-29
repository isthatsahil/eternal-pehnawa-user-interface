import AboutContainer from "../views/about/AboutContainer";
import HomeContainer from "../views/home/HomeContainer";
import ProductsContainer from "../views/products/ProductsContainer";

const routes = [
  {
    path: "/",
    component: HomeContainer,
    exact: true,
  },
  {
    path: "/about",
    component: AboutContainer,
  },
  {
    path: "/products",
    component: ProductsContainer,
  },
];

export default routes;
