import initialState from "./initialState";
import { ReduxAction } from "../../interfaces/redux";
import { SET_AUTHENTICATION_TYPE } from "../actions/actionTypes";

export default function authenticationReducer(
  state = initialState.authenticated,
  action: ReduxAction
) {
  switch (action.type) {
    case SET_AUTHENTICATION_TYPE:
      return action.payload;
    default:
      return state;
  }
}
