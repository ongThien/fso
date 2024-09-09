import Country from "./Country";

const RenderCountries = ({ countries }) => {
  console.log(countries);
  if (countries.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length <= 10 && countries.length > 1) {
    return (
      <>
        {countries.map((c) => (
          <p key={c.name.common}>{c.name.common}</p>
        ))}
      </>
    );
  } else {
    const c = countries[0];
    return (
      <Country
        name={c.name.common}
        capital={c.capital}
        area={c.area}
        languages={Object.values(c.languages)}
        flags={c.flags}
      />
    );
  }
};

export default RenderCountries;
