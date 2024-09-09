const FindCountries = ({ findCountries }) => {
  return (
    <p>
      find countries <input type="text" onChange={findCountries} />
    </p>
  );
}

export default FindCountries;