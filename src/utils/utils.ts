export const applyFilter = (data: any, filter: any) => {
  return {
    ...data,
    data: data?.data
      ?.filter(
        (product: any) =>
          product.price.raw < filter.price &&
          (filter.searchTerm === "" ||
            product.name.toLowerCase().includes(filter.searchTerm.toLowerCase()))
      )
      .sort((first: any, second: any) => {
        if (filter.sort === "price-lowest") {
          if (first.price.raw > second.price.raw) return 1;
          if (first.price.raw < second.price.raw) return -1;
        } else if (filter.sort === "price-highest") {
          if (first.price.raw > second.price.raw) return -1;
          if (first.price.raw < second.price.raw) return 1;
        } else if (filter.sort === "name-atoz") {
          if (first.name > second.name) return 1;
          if (first.name < second.name) return -1;
        } else if (filter.sort === "name-ztoa") {
          if (first.name > second.name) return -1;
          if (first.name < second.name) return 1;
        } else return 0;
      }),
  };
};
