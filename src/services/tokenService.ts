import * as Cookies from "js-cookie";
import JwtDecode from "jwt-decode";

export function removeToken() {
  Cookies.remove("token");
}

export function getToken() {
  return Cookies.get("token");
}

export function getDecodedToken(): any {
  const token = Cookies.get("token");
  return token ? JwtDecode(Cookies.get("token")!) : null;
}
