export const getInterfaceLanguage = async () => {
  console.log(process.env.REACT_APP_BOT_TOKEN);
  const response = await fetch(
    `https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/getUpdates`
  );
  const { result } = await response.json();
  console.log(result);

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
