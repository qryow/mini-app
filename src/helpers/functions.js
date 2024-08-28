import { botToken } from "./const";

export const getInterfaceLanguage = async () => {
  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/getUpdates`
  );
  const { result } = await response.json();

  const language = result[result.length - 1].message.from.language_code || "ru";
  return language === "ru" ? "ru" : "en";
};

export const getOneHoroscope = async (sign, language) => {
  console.log(language);
  const data = {
    sign: sign,
    language: language === "ru" ? "original" : "translated",
    period: "today",
  };

  try {
    const response = await fetch("https://poker247tech.ru/get_horoscope/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {}
};
