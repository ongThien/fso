const Country = ({ name, capital, area, languages, flags }) => {
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
      <img src={flags.png} alt={flags.alt} />
    </>
  );
}

export default Country;