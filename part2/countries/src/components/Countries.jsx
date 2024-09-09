const Countries = ({ countries, showCountry }) => {
  console.log(countries);
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
            <button onClick={() => showCountry(c.name.common)}>show</button>
          </p>
        ))}
      </>
    );
  }
  
  return showCountry(countries[0].name.common);
};

export default Countries;
