import { render, screen, userEvent, waitFor } from "@testing-library/react-native";

import { ReviewFormDetail } from "../../components/ReviewForm";

const user = userEvent.setup();
const handleSubmit = jest.fn();

describe("Review Form", () => {
  beforeEach(() => {
    handleSubmit.mockClear();
    render(<ReviewFormDetail onSubmit={handleSubmit} />);
  });

  describe("Rating field", () => {
    beforeEach(() => {
      handleSubmit.mockClear();
      render(<ReviewFormDetail onSubmit={handleSubmit} />);
    });

    it("shows error when the value is less than 0", async () => {
      const { repoOwnerField, repoNameField, ratingField, submitBtn } = getFields();
      await user.type(repoOwnerField, "dawdasda");
      await user.type(repoNameField, "Sdawdad");
      await user.type(ratingField, "-1");
      await user.press(submitBtn);

      expect(screen.getByRole("text", { name: /rating must not be lower than 0/i })).toBeOnTheScreen();
    });

    it("show error when the value is more than 100", async () => {
      const { repoOwnerField, repoNameField, ratingField, submitBtn } = getFields();
      await user.type(repoOwnerField, "dawdasda");
      await user.type(repoNameField, "Sdawdad");
      await user.type(ratingField, "101");
      await user.press(submitBtn);

      expect(screen.getByRole("text", { name: /rating must not be higher than 100/i })).toBeOnTheScreen();
    });
  });

  it("has all the required fields", async () => {
    const { submitBtn } = getFields();
    await user.press(submitBtn);
    expect(screen.getByRole("text", { name: /repository's owner username is required/i })).toBeOnTheScreen();
    expect(screen.getByRole("text", { name: /repository name is required/i })).toBeOnTheScreen();
    expect(screen.getByRole("text", { name: /rating is required/i })).toBeOnTheScreen();

  });

  it("onSubmit is called when all required fields passed validation", async () => {
    const { repoOwnerField, repoNameField, ratingField, submitBtn } = getFields();
    await user.type(repoOwnerField, "ongThien");
    await user.type(repoNameField, "fso");
    await user.type(ratingField, "1");
    await user.press(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
      // Get the first argument passed to onSubmit
      const firstArgument = handleSubmit.mock.calls[0][0];

      // Assert that the first argument is the form values
      expect(firstArgument).toEqual({
        ownerName: "ongThien",
        repositoryName: "fso",
        rating: "1",
        text: "",
      });

    });
  });
});

function getRepoOwnerName() {
  return screen.getByPlaceholderText(/repository owner/i);
}

function getRepoName() {
  return screen.getByPlaceholderText(/repository name/i);
}

function getRating() {
  return screen.getByPlaceholderText(/rating/i);
}

function getFields() {

  const repoOwnerField = getRepoOwnerName();
  const repoNameField = getRepoName();
  const ratingField = getRating();
  const submitBtn = screen.getByRole("text", { name: /create review/i });

  return {
    repoOwnerField, repoNameField, ratingField, submitBtn,
  };
}
