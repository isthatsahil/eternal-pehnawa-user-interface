import React, { useEffect, useState } from "react";
import ProductsComponent from "./ProductsComponent";
import { commerce } from "../../lib/commerce";

const ProductsContainer = () => {
  const [allProducts, setAllProducts] = useState({});
  const [sarees, setSarees] = useState({});
  const [suits, setSuits] = useState({});
  const [homeDecors, setHomeDecors] = useState({});

  useEffect(() => {
    commerce.products
      .list()
      .then((products: any) => setAllProducts(products))
      .catch((error: any) => {
        console.log({ error });
      });
    commerce.products
      .list({
        category_slug: ["saree"],
      })
      .then((response: any) => setSarees(response));
    commerce.products
      .list({
        category_slug: ["suit"],
      })
      .then((response: any) => setSuits(response));
    commerce.products
      .list({
        category_slug: ["saree", "black"],
      })
      .then((response: any) => setHomeDecors(response));
  }, []);

  console.log({homeDecors})

  return <ProductsComponent allProducts={allProducts} sarees={sarees} suits={suits} homeDecors={homeDecors} />;
};

export default ProductsContainer;
