import style from "./index.module.css";
import logo from "../../assets/logo.jpg";
import { useEffect } from "react";
import { getInterfaceLanguage } from "../../helpers/functions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleLanguageToggle = (event) => {
    const isChecked = event.target.checked;
    changeLanguage(isChecked ? "ru" : "en");
  };

  useEffect(() => {
    getInterfaceLanguage().then((interfaceLanguage) => {
      changeLanguage(interfaceLanguage === "ru" ? "ru" : "en");
    });
  }, []);
  return (
    <div className={`${style.header} container`}>
      <img onClick={() => navigate("/")} src={logo} alt="" />

      <div className={style.switch}>
        <input
          id="language-toggle"
          type="checkbox"
          className={`${style.check_toggle} ${style.check_toggle_round_flat}`}
          onChange={handleLanguageToggle}
          checked={i18n.language === "ru"}
        />
        <label htmlFor="language-toggle"></label>
        <span className={style.on}>EN</span>
        <span className={style.off}>RU</span>
      </div>
    </div>
  );
};

export default Header;
