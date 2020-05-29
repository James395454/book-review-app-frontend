import React, { useState, useEffect, useRef } from "react";
import { MDBInput, MDBInputGroup, MDBIcon } from "mdbreact";
import SearchIcon from "@material-ui/icons/Search";

import "./searchComponent.css";

function SearchComponent({
  listOfSuggestions,
  handleSearchTextChange,
  Suggestion,
}: any) {
  const [blurred, setBlurred] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    setBlurred(text === "" ? true : false);
  }, [listOfSuggestions]);

  useEffect(() => {
    if (text === "") setBlurred(true);
  }, [text]);

  function handleBlur() {
    setBlurred(true);
  }

  function handleFocus(e: any) {
    if (text !== "") setBlurred(false);
  }

  function onChange(e: any) {
    const text = e.target.value;
    setText(text);
    handleSearchTextChange(e);
  }

  return (
    <React.Fragment>
      <MDBInputGroup
        inputs={
          <>
            <MDBInput
              onChange={onChange}
              noTag
              type="text"
              onBlur={handleBlur}
              onFocus={handleFocus}
              hint="Search books"
              className="input-container search-input"
            />
          </>
        }
      >
        <MDBIcon icon="search" className="search-icon" />
      </MDBInputGroup>
      <div hidden={blurred} className="suggestions-container app-bg-color">
        {Suggestion}
      </div>
    </React.Fragment>
  );
}

export default SearchComponent;
