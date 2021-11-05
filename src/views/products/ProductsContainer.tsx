import ProductsComponent from "./ProductsComponent";
import { useGetProductsQuery } from "../../redux/services/products";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { applyFilter } from "../../utils/utils";

const ProductsContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let { data, error, isLoading } = useGetProductsQuery(200);
  const filter = useSelector((state: any) => state.filter);
  data = applyFilter(data, filter);

  return <ProductsComponent data={data} error={error} isLoading={isLoading} />;
};

export default ProductsContainer;
