import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./form.css";

export function SubmitButton({ isSubmitting, ...props }: any) {
  return (
    <React.Fragment>
      <MDBRow className="form-submit-row">
        <MDBCol md="12">
          <MDBBtn
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            {...props}
          >
            submit
          </MDBBtn>
        </MDBCol>
        <MDBCol md="12">{isSubmitting && <CircularProgress />}</MDBCol>
      </MDBRow>
      <div style={{ height: 1 }}></div>
    </React.Fragment>
  );
}
