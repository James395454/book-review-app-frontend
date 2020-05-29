import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import "./footerComponent.css";

function FooterPage() {
  return (
    <MDBFooter className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left footer-container">
        <MDBRow>
          <MDBCol md="1" />
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Contact us</h5>
            <div className="social-col">
              <a href="http://www.facebook.com">
                <MDBIcon
                  fab
                  icon="facebook-square"
                  size="2x"
                  className="blue-text"
                />
              </a>
            </div>
            <div className="social-col">
              <a href="https://www.instagram.com">
                <MDBIcon fab icon="instagram" size="2x" />
              </a>
            </div>
            <div className="social-col">
              <a href="https://twitter.com">
                <MDBIcon
                  fab
                  icon="twitter-square"
                  size="2x"
                  className="blue-text"
                />
              </a>
            </div>
          </MDBCol>
          <MDBCol md="3" />
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="http://localhost:3000/"> bookreview.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;
