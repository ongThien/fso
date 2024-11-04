// helper fn used to eliminate saving the same book twice
export const updateBookCache = (cache, query, addedBook) => {
  const uniqByName = (booksArr) => {
    let booksSet = new Set();
    const filterFn = (book) =>
      booksSet.has(book.title) ? false : booksSet.add(book.title);
    return booksArr.filter(filterFn);
  };

  // To cover all scenarios, you can set default values for author and genre to ensure consistency with cached data.
  // If the cache doesn’t yet contain ALL_BOOKS with any specific variables,
  // this approach can avoid null responses.
  cache.updateQuery(
    {
      ...query,
      variables: query.variables || { author: null, genre: null }, // Set defaults
    },
    (data) => {
      const allBooks = data?.allBooks || [];
      return {
        allBooks: uniqByName(allBooks.concat(addedBook)),
      };
    }
  );
};
