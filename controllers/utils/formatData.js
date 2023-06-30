async function getCategorylist(dataUrl) {
  const listCategories = dataUrl.available_filters.filter(
    (item) => item.id === "category"
  );
  const listCategories2 = dataUrl.filters.filter(
    (item) => item.id === "category"
  );

  const listCategoriesFinal = listCategories.length
    ? listCategories
    : listCategories2;

  const idCategoryMostResults = listCategoriesFinal[0].values[0].id;

  const categories = `https://api.mercadolibre.com/categories/${idCategoryMostResults}`;

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
    };
    return [...acc, item];
  }, []);
  return items;
}

export async function formatData(data) {
  const categories = await getCategorylist(data);
  const items = getItems(data.results);

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

export function getFormatFromId(dataItem, dataDescription) {
  const itemDataFormated = getItems([dataItem])[0];
  const item = {
    author: {
      name: "Martín Ludueña",
      lastname: "Ludueña",
    },
    item: {
      ...itemDataFormated,
      sold_quantity: dataItem.sold_quantity,
      description: dataDescription.plain_text,
    },
  };
  return item;
}
