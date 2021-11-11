import React, { useEffect } from "react";
import ProductComponent from "./ProductComponent";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/services/products";
import ProductPageSkeleton from "./ProductPageSkeleton";

const ProductContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);
  return (
    <>
      {isLoading ? <ProductPageSkeleton /> : <ProductComponent data={data} />}
    </>
  );
};

export default ProductContainer;
