export const applyFilter = (data: any, filter: any) => {
  const result = {
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
    result.data = result.data.filter((product: any) => {
      return (
        product.attributes.filter(
          (attribute: any) => attribute.name === "artisan"
        )[0].value === filter.artisan
      );
    });
  }
  if (filter.subCategory !== "" && filter.subCategory !== null) {
    result.data = result?.data?.filter((product: any) => {
      for (let i = 0; i < product?.categories?.length; i++) {
        if (product.categories[i].slug === filter.subCategory) {
          return true;
        }
      }
    });
  }
  return result;
};

export const setLocaltStorage = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key));
};
