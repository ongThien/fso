import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("the new blog form should calls the event handler it received as props with the right details when a new blog is created.", async () => {
  const createBlog = vi.fn();
  const { container } = render(<BlogForm createBlog={createBlog} />);
  // screen.debug(container);
  const titleInput = screen.queryByPlaceholderText("blog's title...");
  const authorInput = screen.queryByPlaceholderText("blog's author...");
  const urlInput = screen.queryByPlaceholderText("blog's url...");
  const createBtn = container.querySelector(".createBtn");
  const user = userEvent.setup();

  const userInputTitle =
    "testing with testing-library, vitest and a lot of other stuffs @_@";
  const userInputAuthor = "fso";
  const userInputUrl =
    "https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16";

  await user.type(titleInput, userInputTitle);
  await user.type(authorInput, userInputAuthor);
  await user.type(urlInput, userInputUrl);
  await user.click(createBtn);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(userInputTitle);
  expect(createBlog.mock.calls[0][0].author).toBe(userInputAuthor);
  expect(createBlog.mock.calls[0][0].url).toBe(userInputUrl);
  // console.log(createBlog.mock.calls);
});
