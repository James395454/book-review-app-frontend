import { combineReducers } from "redux";
import authenticated from "./authenticationReducer";
import selectedBook from "./bookReducer";

const rootReducer = combineReducers({
  authenticated,
  selectedBook,
});

export default rootReducer;
