const Country = ({ country, weather }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <>
      <h2>{name.common}</h2>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <h3>Weather in {capital}</h3>
      <p>
        temperature {weather.main.temp} Celsius (feels like{" "}
        {weather.main.feels_like} Celsius)
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`${weather.weather[0].description}`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Country;
