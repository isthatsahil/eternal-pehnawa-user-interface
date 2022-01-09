import ProductsComponent from "../ProductsComponent";
import {
  useGetProductCategoryQuery,
  useGetProductsQuery,
} from "../../../redux/services/products";
import { useSelector } from "react-redux";
import { applyFilter } from "../../../utils/utils";
import { useEffect } from "react";
const SareeContainer = () => {
  //useGetProductsQuery(200);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, error, isLoading } = useGetProductCategoryQuery("saree");
  const filter = useSelector((state: any) => state.filter);
  const filteredData = applyFilter(data, filter);
  return (
    <ProductsComponent
      data={filteredData}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default SareeContainer;
