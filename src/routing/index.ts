import AboutContainer from "../views/about/AboutContainer";
import HomeContainer from "../views/home/HomeContainer";

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
];

export default routes;
