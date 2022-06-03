import React from "react";
import classes from "./Footer.module.scss";

function Footer(props) {
  const { todosLength } = props;

  const footerText =
    todosLength === 0
      ? "You don't have any todo"
      : todosLength === 1
      ? "You have 1 todo left"
      : `You have ${todosLength} todos left`;

  return (
    <>
      <h1 className={`${classes["footer"]}`}>{footerText}</h1>
    </>
  );
}

export default Footer;
