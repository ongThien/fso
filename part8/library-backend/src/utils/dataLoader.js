const DataLoader = require("dataloader");
const User = require("../models/user");
const Book = require("../models/book");

const userLoader = new DataLoader(async (usernames) => {
  const users = await User.find({ username: { $in: usernames } });
  return users.map((username) =>
    users.find((user) => user.username === username)
  );
});

const bookCountLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } });
  // console.log("BOOKS", books);

  const bookCountMap = authorIds.reduce((map, authorId) => {
    map[authorId] = books.filter((book) => {
      // console.log("BOOK AUTHOR TO STRING", String(book.author));
      // console.log("AUTHORID", String(authorId));
      // console.log("IS EQUAL?", String(book.author) === String(authorId));
      return String(book.author) === String(authorId);
    }).length;
    return map;
  }, {});
  // console.log("BOOKCOUNTMAP", bookCountMap);
  // console.log(
  //   "AUTHORIDS MAP",
  //   authorIds.map((id) => bookCountMap[id] || 0)
  // );

  return authorIds.map((id) => bookCountMap[id] || 0);
});

module.exports = { userLoader, bookCountLoader };
