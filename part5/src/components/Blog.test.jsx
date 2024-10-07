import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const blog = {
    title: "testing react app",
    author: "fso",
    url: "http://localhost:4000",
    likes: 0,
  };

  const { container } = render(<Blog blog={blog} />);

  // console.log("CONTAINER: ", container);

  // screen.debug(container);

  const div = container.querySelector(".simpleBlog");
  expect(div).toHaveTextContent("testing react app");

  const url = screen.queryByText("http://localhost:4000");
  // console.log("URL", url);
  expect(url).toBeNull();

  const likes = screen.queryByText("likes");
  // console.log("LIKES", likes);
  expect(likes).toBeNull();
});

test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "testing react app",
    author: "fso",
    url: "http://localhost:4000",
    likes: 0,
  };

  const { container } = render(<Blog blog={blog} />);
  const user = userEvent.setup();

  const mockHandler = vi.fn();
  const btn = container.querySelector("button");
  btn.onclick = mockHandler;
  await user.click(btn);
  expect(mockHandler.mock.calls).toHaveLength(1);
  // screen.debug(container);
  const url = container.querySelector(".blogUrl");
  expect(url).toHaveTextContent("http://localhost:4000");

  const likes = container.querySelector(".updateBlogForm");
  expect(likes).toHaveTextContent("like 0");

});

test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "testing react app",
    author: "fso",
    url: "http://localhost:4000",
    likes: 0,
  };

  const updateBlog = vi.fn();
  const { container } = render(<Blog blog={blog} updateBlog={updateBlog} />);
  const user = userEvent.setup();
  const btn = container.querySelector("button");
  await user.click(btn); // click view to show details

  // query form and like btn
  const likes = container.querySelector(".updateBlogForm");
  const likeBtn = likes.querySelector("button");

  await user.click(likeBtn);
  expect(updateBlog.mock.calls).toHaveLength(1);
  expect(updateBlog.mock.calls[0][0].likes).toBe(1);

  await user.click(likeBtn);
  // console.log(updateBlog.mock.calls);
  expect(updateBlog.mock.calls).toHaveLength(2);
  expect(updateBlog.mock.calls[1][0].likes).toBe(2);
});
