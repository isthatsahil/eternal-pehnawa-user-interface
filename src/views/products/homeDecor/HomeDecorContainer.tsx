import ProductsComponent from "../ProductsComponent";
import { useGetProductCategoryQuery } from "../../../redux/services/products";

const HomeDecorContainer = () => {
  const { data, error, isLoading } = useGetProductCategoryQuery("home-decor");
  return <ProductsComponent data={data} error={error} isLoading={isLoading} />;
};

export default HomeDecorContainer;
