import React from "react";
import { ServerError } from "../../../../interfaces/serverError";
import CustomTextField from "./field/fieldComponent";
import { MDBRow, MDBCol } from "mdbreact";

import "../form.css";

export function StandardTextField({ text, name, ...props }: any) {
  return (
    <MDBRow>
      <MDBCol md="12">
        <CustomTextField
          name={name}
          label={text || name}
          placeholder={text || name}
          {...props}
        ></CustomTextField>
      </MDBCol>
    </MDBRow>
  );
}

export function TextFieldWithServerValidation({
  name,
  serverError,
  setServerError,
  handleChange,
  ...props
}: any) {
  return (
    <MDBRow>
      <MDBCol md="12">
        <CustomTextField
          name={name}
          label={name}
          placeholder={name}
          onChange={(e: React.ChangeEvent) => {
            if (serverError && setServerError) {
              const newError: ServerError = { ...serverError };
              delete newError[name];
              setServerError(newError);
            }
            handleChange(e);
          }}
          {...(serverError &&
            serverError[name] && {
              helperText: serverError[name],
              error: !!serverError[name],
            })}
          {...props}
        ></CustomTextField>
      </MDBCol>
    </MDBRow>
  );
}
