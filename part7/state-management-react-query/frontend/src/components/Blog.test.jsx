import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog", () => {
  const blog = {
    title: "Testing the testing",
    url: "http://example.com",
    author: "Ted Tester",
    likes: 10,
  };

  test("renders only title and author by default", () => {
    render(<Blog blog={blog} handleVote={vi.fn()} handleDelete={vi.fn()} />);
    expect(screen.getByText(/Testing the testing/i)).toBeDefined();
    expect(screen.queryByText(/http:\/\/example.com/i)).toBeNull();
  });

  test("renders url and likes after clicking view", async () => {
    const user = userEvent.setup();
    render(<Blog blog={blog} handleVote={vi.fn()} handleDelete={vi.fn()} />);

    await user.click(screen.getByText("view"));
    expect(screen.getByText(/http:\/\/example.com/i)).toBeDefined();
    expect(screen.getByText(/likes 10/i)).toBeDefined();
  });

  test("clicking like twice calls event handler twice", async () => {
    const handleVote = vi.fn();
    const user = userEvent.setup();

    render(<Blog blog={blog} handleVote={handleVote} handleDelete={vi.fn()} />);
    await user.click(screen.getByText("view"));

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(handleVote).toHaveBeenCalledTimes(2);
  });
});
