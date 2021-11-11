import SareeContainer from "../views/products/sarees/SareeContainer";
import AboutContainer from "../views/about/AboutContainer";
import HomeContainer from "../views/home/HomeContainer";
import ProductsContainer from "../views/products/ProductsContainer";
import SuitContainer from "../views/products/suits/SuitContainer";
import HomeDecorContainer from "../views/products/homeDecor/HomeDecorContainer";
import Category from "@components/categories/Category";
import ProductContainer from "../views/product/ProductContainer";

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
    path: "/category",
    component: Category,
  },
  {
    path: "/all-products/category/saree",
    component: SareeContainer,
  },
  {
    path: "/all-products/category/suit",
    component: SuitContainer,
  },
  {
    path: "/all-products/category/home-decor",
    component: HomeDecorContainer,
  },
  {
    path: "/all-products/product/:id",
    component: ProductContainer
  },
  {
    path: "/all-products",
    component: ProductsContainer,
  },
  {
    path: "/product",
    component: ProductsContainer,
  },
];

export default routes;
