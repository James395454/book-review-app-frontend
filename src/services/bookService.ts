import axios from "axios";

const VOLUMES_URL = "https://www.googleapis.com/books/v1/volumes";
const key = "AIzaSyB4BcAyRFlwMDP_7XC2-QO2Zhy4M-PLEpE";

let source = null;
let CancelToken = axios.CancelToken;
let cancel: any;

export async function getGoogleApiBooks(query: string) {
  if (cancel != undefined) {
    cancel();
  }
  if (query.length === 0) throw new Error("search query cannot be empty");
  const response = await axios.get(
    `${VOLUMES_URL}?q=${query}&maxResults=40&key=${key}`,
    {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    }
  );

  return response.data.items.filter((item: any) => {
    const identifier = item.volumeInfo.industryIdentifiers;
    console.log(identifier);
    return (
      identifier &&
      (identifier[0].type === "ISBN_13" || identifier[0].type === "ISBN_10")
    );
  });
}

export async function getGoogleApiBooksByIsbn(isbn: number) {
  const id = (await axios.get(`${VOLUMES_URL}?q=ISBN:${isbn}&key=${key}`)).data
    .items[0].id;

  return (await axios.get(`${VOLUMES_URL}/${id}?key=${key}`)).data;
}
