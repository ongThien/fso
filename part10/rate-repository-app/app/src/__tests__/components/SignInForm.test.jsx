import { render, screen, waitFor, userEvent } from "@testing-library/react-native";

import { SignInForm } from "../../components/SignIn";

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();

      // render the SignInForm component
      render(<SignInForm onSubmit={mockOnSubmit} />);
      const usernameTextBox = screen.getByPlaceholderText(/username/i);
      const passwordTextBox = screen.getByPlaceholderText(/password/i);
      const submitBtn = screen.getByRole("text", { name: /Sign in/i });

      // fill the text inputs and press the submit button
      await user.type(usernameTextBox, "kalle");
      await user.type(passwordTextBox, "password");
      await user.press(submitBtn);

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
});
