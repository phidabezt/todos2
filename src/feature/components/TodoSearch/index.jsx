import React from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import classes from "./TodoSearch.module.scss";

function TodoSearch(props) {
  const { setSearchTerm } = props;
  const delayedSearch = _.debounce(
    (nextValue) => setSearchTerm(nextValue),
    450
  );
  return (
    <Formik initialValues={{ name: "" }} enableReinitialize>
      {(formikProps) => (
        <Form className={classes.search}>
          <Field
            type="text"
            name="name"
            id={classes.search__input}
            onChange={(e) => {
              formikProps.handleChange(e);
              delayedSearch(e.target.value);
            }}
            placeholder="Search a todo ..."
          />
          <div className={classes.search__icon}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default TodoSearch;
