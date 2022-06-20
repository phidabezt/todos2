import React from "react";
import classes from "./InputField.module.scss";

function InputField({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  return (
    <div className={`${classes["inputfield"]}`}>
      <div className={`${classes["inputfield__content"]}`}>
        <input type="text" {...field} {...props} />
        <button className={`${classes["inputfield__button"]}`} type="submit">
          {props["button-name"]}
        </button>
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className={`${classes["inputfield__error"]}`}>
          {errors[field.name]}
        </div>
      )}
    </div>
  );
}

export default InputField;
