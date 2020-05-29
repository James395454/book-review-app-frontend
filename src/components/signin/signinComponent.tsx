import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../../services/authService";

import { UserAuthenication } from "../../interfaces/user";
import { setAuthentication } from "../../redux/actions/authenticationAction";
import { Form, Formik } from "formik";
import {
  TextFieldWithServerValidation,
  StandardTextField,
} from "../shared/form/textFields/textField";
import { SubmitButton } from "../shared/form/button";
import SimpleDialogComponent from "../shared/dialogs/simpleDialogComponent";
import * as yup from "yup";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import "./signinComponent.css";

function SignupComponent({ setAuthentication, history }: any) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogHeaderText] = useState("Login status");
  const [dialogContentText, setDialogContentText] = useState("");
  console.log(history);
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  function getStatusErrorMessage(statusCode: number) {
    switch (statusCode) {
      case 401:
        return "Username or password incorrect, please re-enter data.";
      default:
        return "Server error, please try again.";
    }
  }

  async function submitForm(data: UserAuthenication, { setSubmitting }: any) {
    try {
      setDialogOpen(false);
      setSubmitting(true);
      const success = await sendData(data);
      setSubmitting(false);
      if (!success) {
        setDialogOpen(true);
      } else {
        setAuthentication(true);
        if (history.length > 2) history.goBack();
        else history.push("/");
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async function sendData(data: UserAuthenication) {
    try {
      const result = await signin(data);
      return !!result;
    } catch (err) {
      if (!err.response) {
        setDialogContentText("An unknown error occured, please try again");
        return false;
      }
      const statusCode: number = err.response.status;
      console.log(statusCode);
      const errorMessage = getStatusErrorMessage(statusCode);
      setDialogContentText(errorMessage);
      return false;
    }
  }
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="12">
          <Formik
            validateOnChange={true}
            initialValues={{ email: "", password: "" }}
            onSubmit={submitForm}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, handleChange }) => (
              <Form className="form-container align-center">
                <h3>Sign in</h3>
                <TextFieldWithServerValidation
                  icon="envelope"
                  name="email"
                  handleChange={handleChange}
                />
                <StandardTextField
                  name="password"
                  type="password"
                  icon="lock"
                />
                <SubmitButton isSubmitting={isSubmitting} />
              </Form>
            )}
          </Formik>
        </MDBCol>
      </MDBRow>
      <SimpleDialogComponent
        open={isDialogOpen}
        headerText={dialogHeaderText}
        contentText={dialogContentText}
        isError={true}
      />
    </MDBContainer>
  );
}

const mapDispatchToProps = { setAuthentication };

export default connect(null, mapDispatchToProps)(withRouter(SignupComponent));
