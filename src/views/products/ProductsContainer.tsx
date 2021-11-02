import ProductsComponent from "./ProductsComponent";
import { useGetProductsQuery } from "../../redux/services/products";
import { useEffect } from "react";
const ProductsContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, error, isLoading } = useGetProductsQuery(200);
  return <ProductsComponent data={data} error={error} isLoading={isLoading} />;
};

export default ProductsContainer;
