import ProductsComponent from "../ProductsComponent";
import { useGetProductCategoryQuery, useGetProductsQuery } from "../../../redux/services/products";
import { useSelector } from "react-redux";
import { applyFilter } from "../../../utils/utils";

const SareeContainer = () => {
  useGetProductsQuery(200);
  let { data, error, isLoading } = useGetProductCategoryQuery("saree");
  const filter = useSelector((state: any) => state.filter);
  data = applyFilter(data, filter);
  return <ProductsComponent data={data} error={error} isLoading={isLoading} />;
};

export default SareeContainer;
