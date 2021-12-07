import ProductsComponent from "../ProductsComponent";
import { useGetProductCategoryQuery, useGetProductsQuery } from "../../../redux/services/products";
import { useSelector } from "react-redux";
import { applyFilter } from "../../../utils/utils";

const HomeDecorContainer = () => {
  useGetProductsQuery(200);
  let { data, error, isLoading } = useGetProductCategoryQuery("home-decor");
  const filter = useSelector((state: any) => state.filter);
  data = applyFilter(data, filter);

  return <ProductsComponent data={data} error={error} isLoading={isLoading} />;
};

export default HomeDecorContainer;
