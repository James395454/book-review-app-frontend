import React from "react";

import "./suggestionComponent.css";

function Suggestion(books: Array<any>, onItemClick: any) {
  return books.length === 0 ? (
    <div className="align-center">No results were found!</div>
  ) : (
    <ul className="books-list">
      {books.map((item) => (
        <li
          className="books-list-item"
          key={item.id}
          onMouseDown={() => {
            onItemClick(item);
          }}
        >
          {item.image && <img className="suggestion-image" src={item.image} />}
          <span className="suggestion-text">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default Suggestion;
