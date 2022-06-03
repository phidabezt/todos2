import React from "react";
import classes from "./Header.module.scss";

function Header() {
  return (
    <>
      <h1 className={`${classes["header"]}`}>TODOS APP</h1>
    </>
  );
}

export default Header;
