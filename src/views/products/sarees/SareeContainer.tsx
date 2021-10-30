import ProductsComponent from "../ProductsComponent";
import { useGetProductCategoryQuery } from "../../../redux/services/products";

const SareeContainer = () => {
  const { data, error, isLoading } = useGetProductCategoryQuery("saree");
  return <ProductsComponent data={data} error={error} isLoading={isLoading} />;
};

export default SareeContainer;
