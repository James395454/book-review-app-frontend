import { SET_SELECTED_BOOK } from "./actionTypes";

export function addBook(book: any) {
  return { type: "ADD_BOOK", payload: book };
}

export function setSelectedBook(book: any) {
  return { type: SET_SELECTED_BOOK, payload: book };
}
