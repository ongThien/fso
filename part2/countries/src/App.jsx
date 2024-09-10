import { useEffect, useState } from "react";
import FindCountries from "./components/FindCountries";
import Countries from "./components/Countries";
import Country from "./components/Country";
import countryService from "./services/countryService";
import weatherService from "./services/weatherService";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((returnedCountries) => setAllCountries(returnedCountries))
      .catch((err) => console.log(err));
  }, []);

  const handleFindCountries = (e) => {
    const search = e.target.value.toLowerCase();
    if (search) {
      setCountries(
        allCountries.filter((c) => {
          return c.name.common.toLowerCase().includes(search);
        })
      );
    } else {
      setCountries([]);
    }

    setCountry(null);
    setWeather(null);
  };

  const handleShowCountry = (countryName, capital) => {
    countryService
      .getCountryByName(countryName)
      .then((country) => setCountry(country))
      .catch((err) => console.log(err));

    weatherService
      .getWeatherByCityName(capital)
      .then((w) => setWeather(w))
      .catch((err) => console.log(err));
  };

  if (!allCountries) {
    return <p>Fetching countries...</p>;
  }

  return (
    <>
      <FindCountries findCountries={handleFindCountries} />
      {!country ? (
        <Countries countries={countries} showCountry={handleShowCountry} />
      ) : (
        <Country country={country} weather={weather} />
      )}
    </>
  );
}

export default App;
