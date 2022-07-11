import React, { useContext } from 'react'
import classes from './Header.module.scss'
import { ThemeContext } from '../../theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={classes.header}>
      <h1>TODOS APP</h1>
      <div className={classes.theme__btn__container}>
        <input onClick={() => toggleTheme()} type="checkbox" id="theme__btn" />
        <label for="theme__btn">
          <FontAwesomeIcon
            icon={faMoon}
            className={classes['theme__btn--moon']}
          />
          <FontAwesomeIcon
            icon={faSun}
            className={classes['theme__btn--sun']}
          />
          <span class={classes['theme__btn--ball']}></span>
        </label>
      </div>
    </div>
  )
}

export default Header
