import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./TodoSearch.module.scss";

function TodoSearch(props) {
  const { setSearchTerm } = props;

  return (
    <div className={classes.search}>
      <input
        type="text"
        name="search-input"
        id={classes.search__input}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search a todo ..."
      />
      <div className={classes.search__icon}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
}

export default TodoSearch;
