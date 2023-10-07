import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SunIcon from '../assets/icon-sun.svg'
import MoonIcon from '../assets/icon-moon.svg'

export default function Header() {
  const { theme, toggleDarkMode } = useContext(ThemeContext);

  function handleToggle() {
    toggleDarkMode()
  }

  const theme_icon ={
    filter: theme === 'dark-theme' ?  'brightness(100%)' :
    'invert(72%) sepia(6%) saturate(3985%) hue-rotate(168deg) brightness(89%) contrast(86%)',
    cursor: 'pointer',
}
  return (
      <header style={{ boxShadow: 'var(--shadow)'}}>
        <h1>Hello World 🌎</h1>
        <div>
        <img src={theme === 'dark-theme' ? 
          SunIcon : 
          MoonIcon
        } 
          alt="theme icon"
          width={30}
          style={theme_icon}
          onClick={handleToggle}
          />
        </div>
      </header>
  )
}
