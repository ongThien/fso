import { render, screen, waitFor, userEvent } from "@testing-library/react-native";

import SignUpForm, { SignUpFormDetail } from "../../components/SignUpForm";
import { useNavigate } from "react-router-native";

// Mock navigate function
jest.mock("react-router-native", () => ({
  useNavigate: jest.fn(() => jest.fn()), // Return mock function for useNavigate
}));
const navigate = jest.fn();
useNavigate.mockReturnValue(navigate);

// Mock the createUser and signIn hooks
jest.mock("../../hooks/useCreateUser", () => jest.fn());
jest.mock("../../hooks/useSignIn", () => jest.fn());
const mockCreateUser = jest.fn().mockResolvedValue({
  data: {
    createUser: {
      id: "1",
      username: "testing",
    },
  },
});
require("../../hooks/useCreateUser").mockReturnValue(mockCreateUser);

const mockSignIn = jest.fn().mockResolvedValue({
  data: {
    authenticate: {
      accessToken: "dummyAccessToken",
    },
  },
});
const signInMock = jest.fn(async ({ username, password }) => {
  // Simulate successful sign-in and navigation
  await mockSignIn({ username, password });
  navigate("/"); // Simulate the navigate call inside signIn
});
require("../../hooks/useSignIn").mockReturnValue([signInMock, {}]);

// Mock Apollo's useMutation hook for both createUser and signIn
jest.mock("@apollo/client", () => ({
  useMutation: jest.fn().mockImplementation(() => [mockCreateUser, { loading: false, error: null }]),
}));

const user = userEvent.setup();

describe("SignUpForm", () => {
  describe("should show errors when", () => {
    beforeEach(() => {
      render(<SignUpForm />);
    });

    it("has 3 required fields", async () => {
      const { submitBtn } = getFields();
      await user.press(submitBtn);


      expect(screen.getByRole("text", { name: /username is required/i })).toBeOnTheScreen();
      expect(screen.getByRole("text", { name: /password is required/i })).toBeOnTheScreen();
      expect(screen.getByRole("text", { name: /password confirmation is required/i })).toBeOnTheScreen();

    });

    it("show error when confirmed password does not match password", async () => {
      const { usernameField, passwordField, confirmedPasswordField, submitBtn } = getFields();
      await user.type(usernameField, "username");
      await user.type(passwordField, "password");
      await user.type(confirmedPasswordField, "password123");
      await user.press(submitBtn);
      expect(screen.getByRole("text", { name: /does not match password/i })).toBeOnTheScreen();
    });
  });

  it("creates a user and navigates to the home screen on successful sign up and sign in", async () => {

    render(<SignUpForm />);

    const { usernameField, passwordField, confirmedPasswordField, submitBtn } = getFields();
    await user.type(usernameField, "testing");
    await user.type(passwordField, "password");
    await user.type(confirmedPasswordField, "password");
    await user.press(submitBtn);
    // console.log("FORM SUBMITTED");

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({ username: "testing", password: "password" });
      expect(mockSignIn).toHaveBeenCalledWith({ username: "testing", password: "password" });
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});

function getUsername() {
  return screen.getByPlaceholderText("Username");
}

function getPassword() {
  return screen.getByPlaceholderText("Password");
}

function getConfirmPassword() {
  return screen.getByPlaceholderText("Password confirmation");
}

function getFields() {

  const usernameField = getUsername();
  const passwordField = getPassword();
  const confirmedPasswordField = getConfirmPassword();
  const submitBtn = screen.getByRole("text", { name: /sign up/i });

  return {
    usernameField, passwordField, confirmedPasswordField, submitBtn,
  };
}
