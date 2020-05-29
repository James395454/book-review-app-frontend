import initialState from "./initialState";
import { SET_SELECTED_BOOK } from "../actions/actionTypes";
import { ReduxAction } from "../../interfaces/redux";

export default function bookReducer(
  state = initialState.selectedBook,
  action: ReduxAction
) {
  switch (action.type) {
    case SET_SELECTED_BOOK:
      return action.payload;
    default:
      return state;
  }
}
