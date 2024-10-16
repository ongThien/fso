const Footer = () => {
  const style = {
    marginTop: 24,
  };

  return (
    <div style={style}>
      Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
      See{" "}
      <a href="https://github.com/ongThien/fso/tree/main/part7/routed-anecdotes">
        https://github.com/ongThien/fso/tree/main/part7/routed-anecdotes
      </a>{" "}
      for the source code.
    </div>
  );
};

export default Footer;
