import SareeContainer from "../views/products/sarees/SareeContainer";
import AboutContainer from "../views/about/AboutContainer";
import HomeContainer from "../views/home/HomeContainer";
import ProductsContainer from "../views/products/ProductsContainer";
import SuitContainer from "../views/products/suits/SuitContainer";
import HomeDecorContainer from "../views/products/homeDecor/HomeDecorContainer";

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
    path: "/saree",
    component: SareeContainer,
  },
  {
    path: "/suit",
    component: SuitContainer,
  },
  {
    path: "/home-decor",
    component: HomeDecorContainer,
  },
  {
    path: "/products",
    component: ProductsContainer,
  },
];

export default routes;
