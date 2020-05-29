export default class BookExtractor {
  book: any = {};
  description: string = "";
  imageLink: string = "";

  constructor(book: any) {
    this.book = book;
    this.extractImage();
    this.extractDescription();
  }

  extractImage() {
    if (!this.book.volumeInfo.imageLinks) return null;
    const {
      extraLarge,
      large,
      medium,
      small,
      thumbnail,
      smallThumbnail,
    } = this.book.volumeInfo.imageLinks;

    this.imageLink =
      extraLarge || large || medium || small || thumbnail || smallThumbnail;
  }

  extractDescription() {
    this.description = this.book.volumeInfo.description
      ? this.book.volumeInfo.description
          .replace(/<\/?[^>]+(>|$)/g, "")
          .replace("'", "")
          .replace(/&quot;/g, "")
      : "";
  }
}
