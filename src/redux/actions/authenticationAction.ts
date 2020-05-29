import { SET_AUTHENTICATION_TYPE } from "./actionTypes";

export function setAuthentication(authenticated: boolean) {
  return { type: SET_AUTHENTICATION_TYPE, payload: authenticated };
}
