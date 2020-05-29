import React, { useState, useEffect } from "react";
import { MDBCol, MDBRow, MDBBtn, MDBContainer } from "mdbreact";
import { connect } from "react-redux";
import BookExtractor from "../../utils/bookInfoExtractor";
import { CircularProgress } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import "./bookDetailedViewComponent.css";
import ReviewDialogComponent from "../shared/dialogs/reviewDialogComponent";
import SimpleDialogComponent from "../shared/dialogs/simpleDialogComponent";
import { submitReview } from "../../services/reviewService";

function BookDetailedViewComponent({ selectedBook }: any) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [afterSubmitDialogOpen, setAfterSubmitDialogOpen] = useState(false);
  const [afterSubmitDialogError, setafterSubmitDialogError] = useState(false);
  const [afterSubmitDialogText, setAfterSubmitDialogText] = useState("");
  const [rating, setRating] = useState(2.9);
  useEffect(() => {
    setIsImageLoading(true);
  }, [selectedBook]);
  const extractor = new BookExtractor(selectedBook);

  function onReviewClick() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  async function onSubmit(data: any, { setSubmitting }: any) {
    try {
      setSubmitting(true);
      await submitReview(data);

      setAfterSubmitDialogText("You're review has been submitted successfully");
    } catch (err) {
      setAfterSubmitDialogText(
        "There was an error submitting your review, please try again!"
      );
      setafterSubmitDialogError(true);
      console.log(err);
    } finally {
      setSubmitting(false);
      setDialogOpen(false);
      setAfterSubmitDialogOpen(true);
    }
  }

  return (
    <MDBContainer>
      <MDBRow className="detail-row">
        <MDBCol className="left-col" md="4">
          <MDBRow>
            <MDBCol>
              {isImageLoading && extractor.imageLink && (
                <div className="align-center">
                  <CircularProgress />
                </div>
              )}
            </MDBCol>
          </MDBRow>
          <MDBRow className="top20">
            <MDBCol>
              <img
                onLoad={() => {
                  setIsImageLoading(false);
                }}
                className="book-img"
                src={extractor.imageLink}
                hidden={isImageLoading || !extractor.imageLink}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">Rating</MDBCol>
            <MDBCol md="5">
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
              />
            </MDBCol>
            <MDBCol md="3">{rating}</MDBCol>
          </MDBRow>
          {selectedBook.volumeInfo.authors && (
            <MDBRow>
              <MDBCol md="4">Author</MDBCol>
              <MDBCol md="8">{selectedBook.volumeInfo.authors[0]}</MDBCol>
            </MDBRow>
          )}
          <MDBRow>
            <MDBCol md="4">Publisher</MDBCol>
            <MDBCol md="8">{selectedBook.volumeInfo.publisher}</MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">Page count</MDBCol>
            <MDBCol md="8">{selectedBook.volumeInfo.pageCount}</MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">Language</MDBCol>
            <MDBCol md="8">{selectedBook.volumeInfo.language}</MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">Reader link</MDBCol>
            <MDBCol md="8">
              <a href={selectedBook.accessInfo.webReaderLink}>Click here</a>
            </MDBCol>
          </MDBRow>
          <MDBRow className="top10">
            <MDBCol>
              <MDBBtn onClick={onReviewClick}>Review</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md="8">
          <MDBRow className="top20">
            <MDBCol>
              <MDBRow className="align-center">
                <MDBCol>
                  <h3>{selectedBook.volumeInfo.title}</h3>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <p className="content-text">{extractor.description}</p>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <ReviewDialogComponent
        open={dialogOpen}
        onSubmit={onSubmit}
        onClose={handleDialogClose}
      ></ReviewDialogComponent>
      <SimpleDialogComponent
        open={afterSubmitDialogOpen}
        isError={afterSubmitDialogError}
        contentText={afterSubmitDialogText}
        headerText="Review Submission Status"
      />
    </MDBContainer>
  );
}

const mapStateToProps = (state: any) => {
  const { selectedBook } = state;
  return { selectedBook };
};

export default connect(mapStateToProps, null)(BookDetailedViewComponent);
