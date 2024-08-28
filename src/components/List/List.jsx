import { useTranslation } from "react-i18next";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OneZodiac from "../OneZodiac/OneZodiac";
import { getOneHoroscope } from "../../helpers/functions";

const List = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState("");
  const [oneZodiac, setOneZodiac] = useState({
    name: "",
    period: "",
    pictureUrl: "",
  });
  const { t, i18n } = useTranslation();
  const signs = t("signs", { returnObjects: true });

  const openDescription = () => {
    document.body.style.overflow = "hidden";
    setIsDescriptionOpen(true);
  };

  const closeDescription = () => {
    document.body.style.overflow = "auto";
    setIsDescriptionOpen(false);
  };

  const handleClick = (name) => {
    const zodiac = signs.find((sign) => sign.sign === name);
    if (zodiac) {
      setOneZodiac({
        name: zodiac.name,
        period: zodiac.period,
        pictureUrl: zodiac.pictureUrl,
      });
    }
    setSelectedSign(name);
    openDescription();
  };

  useEffect(() => {
    getOneHoroscope(selectedSign, i18n.language).then((result) => {
      setHoroscope(result.horoscope);
    });
    const zodiac = signs.find((sign) => sign.sign === selectedSign);
    if (zodiac) {
      setOneZodiac({
        name: zodiac.name,
        period: zodiac.period,
        pictureUrl: zodiac.pictureUrl,
      });
    }
  }, [i18n.language, selectedSign]);

  return (
    <div className={`${style.list} container`}>
      {signs.map((item) => (
        <div key={item.sign} className={style.one_card}>
          <img src={item.pictureUrl} alt="" />
          <div className={style.one_card_text}>
            <h4>{item.name}</h4>
            <p>{item.period}</p>
            <button
              onClick={() => {
                handleClick(item.sign);
                openDescription();
              }}
            >
              {t("horoscope")}
            </button>
          </div>
        </div>
      ))}
      {isDescriptionOpen && (
        <OneZodiac
          horoscope={horoscope}
          oneZodiac={oneZodiac}
          onClose={closeDescription}
        />
      )}
    </div>
  );
};

export default List;
