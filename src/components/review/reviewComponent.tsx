import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSelectedBook } from "../../redux/actions/bookAction";
import { getGoogleApiBooksByIsbn } from "../../services/bookService";
import BookDetailedViewComponent from "../bookDetailedView/bookDetailedViewComponent";

function ReviewComponent({ selectedBook, setSelectedBook, ...props }: any) {
  const { isbn } = props.match.params;
  const [doneFetchingBook, setDoneFetchingBook] = useState(false);
  useEffect(() => {
    setDoneFetchingBook(false);
    getGoogleApiBooksByIsbn(isbn).then((data) => {
      setSelectedBook({ isbn, ...data });
      console.log({ isbn, ...data });
      setDoneFetchingBook(true);
    });
  }, [isbn]);
  console.log(doneFetchingBook);
  return (
    <div>
      {selectedBook && doneFetchingBook && <BookDetailedViewComponent />}
    </div>
  );
}

const mapDispatchToProps = { setSelectedBook };
const mapStateToProps = (state: any) => {
  const { selectedBook } = state;
  return { selectedBook };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewComponent);
