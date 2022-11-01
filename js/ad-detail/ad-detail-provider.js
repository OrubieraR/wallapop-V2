import { sparrestApi } from "../sparrest-api/SparrestApi.js";

export const getAdById = async (adId) => {
  // const ad = await sparrestApi.get(`${sparrestApi.endpoints.ads}/${adId}?_expand=user`);
  const ad = await sparrestApi.get(`${sparrestApi.endpoints.ads}/${adId}`);

  return ad;
}

export const removeAdById = async (adId) => {
  await sparrestApi.delete(`${sparrestApi.endpoints.ads}/${adId}`);
}
