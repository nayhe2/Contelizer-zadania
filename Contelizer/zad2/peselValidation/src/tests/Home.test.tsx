import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/Home";

describe("Home component - PESEL validation", () => {
  test("should show success alert for valid PESEL", () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "44051401359" } }); // poprawny PESEL

    const button = screen.getByRole("button", { name: /check PESEL/i });
    fireEvent.click(button);

    expect(screen.getByText(/PESEL is valid/i)).toBeInTheDocument();
  });

  test("should show success alert for valid PESEL", () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "22031647890 " } }); // poprawny PESEL

    const button = screen.getByRole("button", { name: /check PESEL/i });
    fireEvent.click(button);

    expect(screen.getByText(/PESEL is valid/i)).toBeInTheDocument();
  });

  test("should show error alert for invalid PESEL (too short) ", () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "4405140135" } });

    const button = screen.getByRole("button", { name: /check PESEL/i });
    fireEvent.click(button);

    expect(screen.getByText(/PESEL is invalid/i)).toBeInTheDocument();
  });

  test("should show error alert for invalid PESEL (month cannot be 00)", () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "99001312345" } });

    const button = screen.getByRole("button", { name: /check PESEL/i });
    fireEvent.click(button);

    expect(screen.getByText(/PESEL is invalid/i)).toBeInTheDocument();
  });

  test("should show error alert for invalid PESEL (wrong control digit)", () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "44051401358" } });

    const button = screen.getByRole("button", { name: /check PESEL/i });
    fireEvent.click(button);

    expect(screen.getByText(/PESEL is invalid/i)).toBeInTheDocument();
  });

  test("should not accept non-numeric characters", () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "44a051401359" } });

    expect(input).toHaveValue("44051401359"); // bez litery
  });
});
