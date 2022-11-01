import { sparrestApi } from "../sparrest-api/SparrestApi.js"

export const createApiAd = (ad) => {
  sparrestApi.post(sparrestApi.endpoints.ads, {
    // Al final conseguí parsear el string a un objeto.
    name:ad.name,
    price:ad.price,
    description:ad.description,
    photo:ad.photo,
    compvent:ad.sale

  })
}
