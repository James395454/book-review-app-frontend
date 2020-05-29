import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

function HeaderComponent() {
  return (
    <MDBContainer fluid>
      <MDBRow className="align-center">
        <MDBCol>
          <h1>Welcome to Book Reviewer</h1>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default HeaderComponent;
