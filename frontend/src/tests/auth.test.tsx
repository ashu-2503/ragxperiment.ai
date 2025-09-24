import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../modules/auth/signup";
import api from "../config/connection"

jest.mock("./api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("Signup Component", () => {
  const mockOnSignup = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits form and calls onSignup on success", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { message: "User signed up successfully" } });

    render(<Signup onSignup={mockOnSignup} />);

    await userEvent.type(screen.getByLabelText(/Name/i), "John");
    await userEvent.type(screen.getByLabelText(/Email/i), "john@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "secret123");

    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // assert API called with expected payload
    expect(mockedApi.post).toHaveBeenCalledWith("/auth/signup", {
      name: "John",
      email: "john@example.com",
      password: "secret123",
    });

    // wait for side-effect
    await screen.findByText(/signed up successfully/i).catch(() => {});
    expect(mockOnSignup).toHaveBeenCalled();
  });

  it("shows error message if signup fails", async () => {
    mockedApi.post.mockRejectedValueOnce({ response: { data: { detail: "Email already exists" } } });

    render(<Signup onSignup={mockOnSignup} />);

    await userEvent.type(screen.getByLabelText(/Name/i), "Jane");
    await userEvent.type(screen.getByLabelText(/Email/i), "jane@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "password");

    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // findByText waits and returns when the element appears
    const errEl = await screen.findByText(/Email already exists/i);
    expect(errEl).toBeInTheDocument();
  });
});
