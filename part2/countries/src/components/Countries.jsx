const Countries = ({ countries, showCountry }) => {
  
  if (countries.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length <= 10 && countries.length > 1) {
    return (
      <>
        {countries.map((c) => (
          <p key={c.name.common}>
            {`${c.name.common} `}
            <button onClick={() => showCountry(c.name.common, c.capital[0])}>show</button>
          </p>
        ))}
      </>
    );
  }
  
  return showCountry(countries[0].name.common, countries[0].capital[0]);
};

export default Countries;
