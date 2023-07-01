import { formatData, getFormatFromId } from "./utils/formatData.js";

export async function getItemsFromQuery(req, res) {
  const { q } = req.query;

  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=4`;
  const response = await fetch(url);
  const dataUrl = await response.json();

  const dataFormated = await formatData(dataUrl);

  res.json(dataFormated);
}

export async function getItemFromId(req, res) {
  const { id } = req.params;
  const urlItem = `https://api.mercadolibre.com/items/${id}`;
  const responseItem = await fetch(urlItem);
  const dataItem = await responseItem.json();

  const urlDescription = `https://api.mercadolibre.com/items/${id}/description`;
  const responseDescription = await fetch(urlDescription);
  const dataDescription = await responseDescription.json();


  if (dataItem.status === 404) {
    res.status(404).json({});
  }else{
    const item = await getFormatFromId(dataItem, dataDescription);
    res.json(item);
  }
}
