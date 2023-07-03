async function getCategorylist(dataUrl, categoryId = null) {
  let categoryIdFinal;

  if (categoryId) {
    categoryIdFinal = categoryId;
  } else {
    const listCategories = dataUrl.available_filters.filter(
      (item) => item.id === "category"
    );
    const listCategories2 = dataUrl.filters.filter(
      (item) => item.id === "category"
    );

    const listCategoriesFinal = listCategories.length
      ? listCategories
      : listCategories2;

    const idCategoryMostResults =
      categoryId ?? listCategoriesFinal[0].values[0].id;
    categoryIdFinal = idCategoryMostResults;
  }

  const categories = `https://api.mercadolibre.com/categories/${categoryIdFinal}`;

  const responseCategory = await fetch(categories);
  const dataCategory = await responseCategory.json();

  const dataCategoryList = dataCategory.path_from_root.map((item) => item.name);
  return dataCategoryList;
}

function getItems(data) {
  const items = data.reduce((acc, curr) => {
    const item = {
      id: curr.id,
      title: curr.title,
      price: {
        currency: curr.currency_id,
        amount: curr.price,
        decimals: 2,
      },
      picture: curr.thumbnail,
      condition: curr.condition,
      free_shipping: curr.shipping.free_shipping,
      city: curr.seller_address.state.name
    };
    return [...acc, item];
  }, []);
  return items;
}

const dataWhithoutResults = {
  author: {
    name: "Martín Ludueña",
    lastname: "Ludueña",
  },
  categories: [],
  items: [],
};

export async function formatData(data) {
  if (!data.results.length) return dataWhithoutResults;

  const categories = await getCategorylist(data);
  const items = await getItems(data.results);

  const dataFormated = {
    author: {
      name: "Martín Ludueña",
      lastname: "Ludueña",
    },
    categories,
    items,
  };
  return dataFormated;
}

export async function getFormatFromId(dataItem, dataDescription) {
  const itemDataFormated = getItems([dataItem])[0];
  const categoryId = dataItem.category_id;

  const categories = await getCategorylist(null, categoryId);
  const item = {
    author: {
      name: "Martín Ludueña",
      lastname: "Ludueña",
    },
    item: {
      ...itemDataFormated,
      categories,
      sold_quantity: dataItem.sold_quantity,
      description: dataDescription.plain_text ?? "Producto sin descripción",
    },
  };
  return item;
}
