import React, { useEffect } from "react";
import HeaderComponent from "./header/headerComponent";
import { addBook } from "../../redux/actions/bookAction";
import { connect } from "react-redux";

function HomeComponent() {
  return (
    <React.Fragment>
      <HeaderComponent />
    </React.Fragment>
  );
}

export default HomeComponent;
