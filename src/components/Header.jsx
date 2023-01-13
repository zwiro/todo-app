import "../scss/Header.scss";
import sunIcon from "/src/assets/icon-sun.svg";
import moonIcon from "/src/assets/icon-moon.svg";

export default function Header(props) {
  return (
    <header className="header">
      <div className="header__elements">
        <h1 className="header__title">TODO</h1>
        <img
          className="header__img"
          src={props.darkMode ? sunIcon : moonIcon}
          alt=""
          onClick={() => props.setTheme()}
        />
      </div>
    </header>
  );
}
