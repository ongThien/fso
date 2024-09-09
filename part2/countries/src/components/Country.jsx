const Country = ({ country }) => {
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
    </>
  );
};

export default Country;
