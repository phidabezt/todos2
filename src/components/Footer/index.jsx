import React from "react";
import classes from "./Footer.module.scss";

function Footer(props) {
  const { number } = props;

  // const footerText =
  //   todosLength === 0
  //     ? "You don't have any todo"
  //     : todosLength === 1
  //     ? "You have 1 todo left"
  //     : `You have ${todosLength} todos left`;

  // chỉnh h1 (chỉ có 1, 2 tag trong html)

  return (
    <>
      <p className={classes.footer}>number of todo: {number}</p>
    </>
  );
}

export default Footer;
