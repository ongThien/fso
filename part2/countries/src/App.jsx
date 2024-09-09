import { useEffect, useState } from "react";
import FindCountries from "./components/FindCountries";
import Countries from "./components/Countries";
import countryService from "./services/countryService";
import Country from "./components/Country";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

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
  };

  const handleShowCountry = (countryName) => {
    countryService
      .getCountryByName(countryName)
      .then((country) => setCountry(country))
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
        <Country country={country} />
      )}
    </>
  );
}

export default App;
