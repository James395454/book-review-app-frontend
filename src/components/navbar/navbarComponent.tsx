import React, { useState } from "react";
import { connect } from "react-redux";
import { setSelectedBook } from "../../redux/actions/bookAction";
import { withRouter } from "react-router-dom";
import { setAuthentication } from "../../redux/actions/authenticationAction";
import SearchComponent from "../shared/search/searchComponent";
import Suggestion from "../shared/Suggestion/suggestionComponent";
import { getDecodedToken } from "../../services/tokenService";
import { getGoogleApiBooks } from "../../services/bookService";
import { logout } from "../../services/authService";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
} from "mdbreact";
import "./navbarComponent.css";

function NavbarComponent({
  authenticated,
  setAuthentication,
  setSelectedBook,
  history,
}: any) {
  const [books, setBooks] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const token = getDecodedToken();
  if (!token) setAuthentication(false);

  function toggleCollapse() {
    setOpen(!isOpen);
  }

  function onItemClick(bookObject: any) {
    console.log("setting in navbar");
    setSelectedBook({ isbn: bookObject.isbn, ...bookObject.bookItem });
    history.push(`/review/${bookObject.isbn}`);
  }

  async function handleSearchTextChange(e: any) {
    try {
      const queryText = e.target.value;
      const items: any = await getGoogleApiBooks(queryText);
      console.log(items);
      if (items.length === 0) setBooks([]);
      else
        setBooks(
          items.map((item: any) => {
            const { industryIdentifiers } = item.volumeInfo;
            const { imageLinks } = item.volumeInfo;
            return {
              bookItem: item,
              isbn:
                industryIdentifiers.find((i: any) => i.type === "ISBN_13")
                  .identifier ||
                industryIdentifiers.find((i: any) => i.type === "ISBN_10")
                  .identifier,
              text: item.volumeInfo.title,
              image: imageLinks ? imageLinks.smallThumbnail : null,
            };
          })
        );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <MDBNavbar
      dark
      expand="md"
      className="navbar nav-container"
      scrolling
      fixed="top"
      transparent={false}
    >
      <MDBNavbarBrand className="nav-brand">Book-Reviewer</MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="basic-navbar-nav" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavLink to="/">Home</MDBNavLink>
        </MDBNavbarNav>
        <MDBNavbarNav>
          <form className="input-form">
            <SearchComponent
              handleSearchTextChange={handleSearchTextChange}
              listOfSuggestions={books}
              Suggestion={Suggestion(books, onItemClick)}
            />
          </form>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          {!authenticated ? (
            <React.Fragment>
              <MDBNavLink to="/signup">Sign up</MDBNavLink>
              <MDBNavLink to="/signin">Sign in</MDBNavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MDBNavLink to="/">Hello {token && token.firstName}</MDBNavLink>
              <MDBNavLink
                to="/"
                onClick={() => {
                  logout();
                  setAuthentication(false);
                }}
              >
                <span title="Logout">
                  <MDBIcon icon="sign-out-alt" size="lg" />
                </span>
              </MDBNavLink>
            </React.Fragment>
          )}
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}

const mapStateToProps = (state: any) => {
  const { authenticated } = state;
  return { authenticated };
};
const mapDispatchToProps = { setAuthentication, setSelectedBook };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarComponent));
