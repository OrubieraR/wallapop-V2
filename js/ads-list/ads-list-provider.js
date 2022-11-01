import { sparrestApi } from "../sparrest-api/SparrestApi.js";

export async function getAds(){
    // Añadir ?_expand=user para relacionar al recurso padre (parent).
    // const endpoint = `${sparrestApi.endpoints.ads}?_expand=user:1`;
    const endpoint = `${sparrestApi.endpoints.ads}`;

    const ads = await sparrestApi.get(endpoint);

    return ads;
}