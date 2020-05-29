import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import CircularProgress from "@material-ui/core/CircularProgress";
import BookExtractor from "../../../utils/bookInfoExtractor";
import "./bookCardComponent.css";

export default function BookCard({ book }: any) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  useEffect(() => {
    setIsImageLoading(true);
  }, [book]);
  const extractor = new BookExtractor(book);
  return (
    <MDBCol>
      <MDBCard className="card">
        {isImageLoading && extractor.imageLink && (
          <div className="align-center">
            <CircularProgress />
          </div>
        )}
        <MDBCardImage
          onLoad={() => {
            setIsImageLoading(false);
          }}
          className="img-fluid card-img"
          src={extractor.imageLink}
          hidden={isImageLoading || !extractor.imageLink}
          top
        />

        <MDBCardBody>
          <MDBCardTitle>{book.volumeInfo.title}</MDBCardTitle>
          <MDBCardText className="content-text">
            {extractor.description}
          </MDBCardText>
          <div className="align-center">
            <MDBBtn href="#">Review</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
