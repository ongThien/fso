import { render, screen, waitFor, userEvent } from "@testing-library/react-native";

import { SignInFormDetail } from "../../components/SignInForm";

const mockOnSubmit = jest.fn();
describe('SignInForm', () => {
  it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
    // render the SignInForm component
    render(<SignInFormDetail onSubmit={mockOnSubmit} />);
    const usernameTextBox = screen.getByPlaceholderText(/username/i);
    const passwordTextBox = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole("text", { name: /Sign in/i });

    // fill the text inputs and press the submit button
    const user = userEvent.setup();
    await user.type(usernameTextBox, "kalle");
    await user.type(passwordTextBox, "password");
    await user.press(submitBtn);

    expect(screen.getByRole("text", { name: /Loading/i })).toBeOnTheScreen();

    await waitFor(() => {
      // expect the onSubmit function to have been called once and with a correct first argument
      expect(mockOnSubmit).toHaveBeenCalled();
      // Get the first argument passed to onSubmit
      const firstArgument = mockOnSubmit.mock.calls[0][0];

      // Assert that the first argument is the form values
      expect(firstArgument).toEqual({
        username: "kalle",
        password: "password",
      });

    });

  });
});
