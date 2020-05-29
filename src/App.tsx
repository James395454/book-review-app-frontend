import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { setAuthentication } from "./redux/actions/authenticationAction";
import { connect } from "react-redux";
import HomeComponent from "./components/home/homeComponent";
import NavbarComponent from "./components/navbar/navbarComponent";
import SignupComponent from "./components/signup/signupComponent";
import SigninComponent from "./components/signin/signinComponent";
import ReviewComponent from "./components/review/reviewComponent";
import FooterPage from "./components/footer/footerComponent";
import Cookies from "js-cookie";

import "./App.css";

function App({ setAuthentication }: any) {
  useEffect(() => {
    console.log("in app");
    const token = Cookies.get("token");
    setAuthentication(!!token);
  }, []);
  return (
    <div className="App">
      <NavbarComponent />
      <div id="content-wrap" className="app-bg-color">
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/signup" component={SignupComponent} />
          <Route path="/signin" component={SigninComponent} />
          ReviewComponent
          <Route path="/review/:isbn" component={ReviewComponent} />
        </Switch>
      </div>
      <FooterPage />
    </div>
  );
}
const mapDispatchToProps = { setAuthentication };

export default connect(null, mapDispatchToProps)(App);
