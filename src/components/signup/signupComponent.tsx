import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { signup } from "../../services/authService";
import { ServerError } from "../../interfaces/serverError";
import { UserCreation } from "../../interfaces/user";
import { Form, Formik } from "formik";
import {
  StandardTextField,
  TextFieldWithServerValidation,
} from "../shared/form/textFields/textField";
import { SubmitButton } from "../shared/form/button";
import SimpleDialogComponent from "../shared/dialogs/simpleDialogComponent";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import * as yup from "yup";

import "./signupComponent.css";

function SignupComponent({ history }: any) {
  const [serverError, setServerError] = useState<ServerError>({});
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogHeaderText, setDialogHeaderText] = useState("");
  const [dialogContentText, setDialogContentText] = useState("");

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().required().min(2).max(30).label("First name"),
    lastName: yup.string().required().min(2).max(30).label("Last name"),
    password: yup.string().required().min(8),
  });

  function handleDialogClose() {
    history.push("/signin");
  }

  async function submitForm(data: UserCreation, { setSubmitting }: any) {
    try {
      setSubmitting(true);
      const success = await sendData(data);
      setSubmitting(false);
      if (success) {
        setDialogHeaderText("Registration Status");
        setDialogContentText(
          "Your account has been created successfully!, you can now login to the application."
        );
        setDialogOpen(true);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async function sendData(data: UserCreation) {
    try {
      const result = await signup(data);
      return !!result;
    } catch (err) {
      if (!err.response) return false;
      const attribute: string = err.response.data.attribute;
      const statusCode: number = err.response.status;
      console.log(attribute, statusCode);
      if (statusCode === 409) {
        setServerError({
          [attribute]: `${attribute} already exists, please select a different one!`,
        });
      }
      return false;
    }
  }
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="12">
          <Formik
            validateOnChange={true}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
            }}
            onSubmit={submitForm}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, handleChange }) => (
              <Form className="form-container align-center">
                <h3>Sign up</h3>
                <TextFieldWithServerValidation
                  name="email"
                  serverError={serverError}
                  setServerError={setServerError}
                  handleChange={handleChange}
                  icon="envelope"
                />
                <StandardTextField
                  icon="user"
                  name="firstName"
                  text="First name"
                />
                <StandardTextField
                  icon="user"
                  name="lastName"
                  text="Last name"
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
        onClose={handleDialogClose}
        open={isDialogOpen}
        headerText={dialogHeaderText}
        contentText={dialogContentText}
        closeButtonText="Sign in"
      />
    </MDBContainer>
  );
}

export default withRouter(SignupComponent);
