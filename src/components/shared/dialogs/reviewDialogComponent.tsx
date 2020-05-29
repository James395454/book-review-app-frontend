import React, { useState, useEffect } from "react";
import * as yup from "yup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SimpleDialogComponent from "./simpleDialogComponent";
import CustomRatingComponent from "../form/rating/CustomRatingComponent";
import { Formik, Form } from "formik";
import { SubmitButton } from "../form/button";
import { StandardTextField } from "../form/textFields/textField";
import { getDecodedToken } from "../../../services/tokenService";

import { MDBRow, MDBCol } from "mdbreact";

import "./reviewDialogComponent.css";

function ReviewDialogComponent({ selectedBook, open, onSubmit, onClose }: any) {
  const token = getDecodedToken();
  const validationSchema = yup.object({
    rating: yup.number().required(),
    text: yup.string().required(),
  });

  return (
    <SimpleDialogComponent
      headerText={
        token ? selectedBook.volumeInfo.title : "Review Submission Status"
      }
      open={open}
      onClose={onClose}
      closeButtonText="close"
      size="lg"
    >
      {token ? (
        <Formik
          validateOnChange={true}
          initialValues={{
            rating: 3,
            text: "",
            userEmail: token.email,
            isbn: selectedBook.isbn,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="align-center">
              <MDBRow>
                <MDBCol>
                  <h3>Review form</h3>
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: 20 }}>
                <MDBCol md="2">
                  <label>Rating</label>
                </MDBCol>
                <MDBCol md="10">
                  <CustomRatingComponent
                    name="rating"
                    onRatingChanged={(val: any) => {
                      const { value } = val;
                      if (value !== values["rating"]) {
                        console.log("setting ", value);
                        setFieldValue("rating", value);
                      }
                    }}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <StandardTextField
                    icon="pencil-alt"
                    name="text"
                    text="Enter review here"
                    type="textarea"
                    containerClass="full-width"
                    style={{ height: 100, width: "100%" }}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <SubmitButton isSubmitting={isSubmitting} />
                </MDBCol>
              </MDBRow>
            </Form>
          )}
        </Formik>
      ) : (
        <span>You are not signed in, please sign in to continue</span>
      )}
    </SimpleDialogComponent>
  );
}

ReviewDialogComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => {
  const { selectedBook } = state;
  return { selectedBook };
};

export default connect(mapStateToProps, null)(ReviewDialogComponent);
