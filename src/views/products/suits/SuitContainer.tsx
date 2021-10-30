import ProductsComponent from "../ProductsComponent";
import { useGetProductCategoryQuery } from "../../../redux/services/products";

const SuitContainer = () => {
  const { data, error, isLoading } = useGetProductCategoryQuery("suit");
  return <ProductsComponent data={data} error={error} isLoading={isLoading} />;
};

export default SuitContainer;
