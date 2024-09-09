import { useEffect, useState } from "react";
import FindCountries from "./components/FindCountries";
import RenderCountries from "./components/RenderCountries";
import countryService from "./services/countryService";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);

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
  };

  if (allCountries.length === 0) {
    return <p>Fetching countries...</p>;
  }

  return (
    <>
      <FindCountries findCountries={handleFindCountries} />

      <RenderCountries countries={countries} />
    </>
  );
}

export default App;
