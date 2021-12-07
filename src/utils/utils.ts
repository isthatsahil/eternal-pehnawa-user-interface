export const applyFilter = (data: any, filter: any) => {
  let result = {
    ...data,
    data: data?.data
      ?.filter(
        (product: any) =>
          product.price.raw < filter.price &&
          (filter.searchTerm === "" ||
            product.name
              .toLowerCase()
              .includes(filter.searchTerm.toLowerCase()))
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
  if (filter.artisan !== "all") {
    console.log(filter.artisan);
    result.data = result.data.filter((product: any) => {
      return (
        product.attributes.filter(
          (attribute: any) => attribute.name === "artisan"
        )[0].value === filter.artisan
      );
    });
  }
  return result;
};
