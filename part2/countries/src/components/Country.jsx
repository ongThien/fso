const Country = ({ country, weather }) => {
  const name = country.name.common;
  const capital = country.capital[0];
  const area = country.area;
  const languages = Object.values(country.languages);
  const flagURL = country.flags.png;

  const temperature = weather.main.temp;
  const feels_like = weather.main.feels_like;
  const weatherIconURL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const windSpeed = weather.wind.speed;

  return (
    <>
      <h2>{name}</h2>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h4>languages:</h4>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flagURL} />
      <h3>Weather in {capital}</h3>
      <p>
        temperature {temperature} Celsius (feels like {feels_like} Celsius)
      </p>
      <img src={weatherIconURL} />
      <p>wind {windSpeed} m/s</p>
    </>
  );
};

export default Country;
