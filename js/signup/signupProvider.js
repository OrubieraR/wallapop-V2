import { sparrestApi } from "../sparrest-api/SparrestApi.js";

export const createApiUser = async (username, password) => {
  const body = {
    username: username,
    password: password
  }

  await sparrestApi.post(sparrestApi.endpoints.signup, body);

}

export const loginApiUser = async (username, password) => {
  const body = {
    username: username,
    password: password
  }

  const data = await sparrestApi.post(sparrestApi.endpoints.login, body);

  return data.accessToken;
  // return data.message;
}
