import axios from "axios";
import { UserAuthenication, UserCreation } from "../interfaces/user";
import { removeToken } from "./tokenService";
import * as endpoints from "./urlService";

export async function signup(data: UserCreation) {
  const result = await axios.post(endpoints.USERS_ENDPOINT, data, {
    headers: { contentType: "application/json" },
  });
  return result;
}

export async function signin(data: UserAuthenication) {
  const result = await axios.post(endpoints.AUTH_ENDPOINT, data, {
    headers: { contentType: "application/json" },
    withCredentials: true,
  });
  return result;
}

export function logout() {
  removeToken();
}
