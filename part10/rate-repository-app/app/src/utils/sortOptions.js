const sortOptions = [
  {
    label: "Latest repositories",
    value: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    },
  },
  {
    label: "Highest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    },
  },
  {
    label: "Lowest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    },
  }
];

export default sortOptions;
