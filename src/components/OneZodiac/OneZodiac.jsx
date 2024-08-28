import { useTranslation } from "react-i18next";
import style from "./index.module.css";
import Header from "../Header/Header";
import { useSwipeable } from "react-swipeable";

const OneZodiac = ({ horoscope, oneZodiac, onClose }) => {
  const { t } = useTranslation();
  const handlers = useSwipeable({
    onSwipedRight: () => onClose(),
  });

  return (
    <div {...handlers} className={style.modal}>
      <div className="container">
        <button onClick={onClose} className={style.back}>
          {t("back")}
        </button>
        <div className={style.one_card}>
          <img src={oneZodiac.pictureUrl} alt="" />
          <div className={style.one_card_text}>
            <h3>{oneZodiac.name}</h3>
            <span>{oneZodiac.period}</span>

            <h5>{t("today")}</h5>
            <p>{horoscope}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneZodiac;
