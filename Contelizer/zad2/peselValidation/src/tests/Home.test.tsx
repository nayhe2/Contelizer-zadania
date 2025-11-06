import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/Home";

describe("Home component - PESEL validation", () => {
  test("should show success alert for valid PESEL", () => {
    window.alert = vi.fn(); // sprawia, że każde wywołanie window.alert("coś")
    // będzie zapisane w pamięci przez Vitest, bez faktycznego otwierania okna.

    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "44051401359" } }); // poprawny PESEL

    const button = screen.getByRole("button", { name: /sprawdz pesel/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("pesel zgodny")
    );
  });

  test("should show error alert for invalid PESEL (too short) ", () => {
    window.alert = vi.fn();

    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "4405140135" } });

    const button = screen.getByRole("button", { name: /sprawdz pesel/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("niepoprawny pesel")
    );
  });

  test("should show error alert for invalid PESEL (month cannot be 00)", () => {
    window.alert = vi.fn();

    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "99001312345" } });

    const button = screen.getByRole("button", { name: /sprawdz pesel/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("niepoprawny pesel")
    );
  });

  test("should show error alert for invalid PESEL (wrong control digit)", () => {
    window.alert = vi.fn();

    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "44051401358" } });

    const button = screen.getByRole("button", { name: /sprawdz pesel/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("niepoprawny pesel")
    );
  });

  test("should not accept non-numeric characters", () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "44a051401359" } });

    expect(input).toHaveValue("44051401359"); // bez litery
  });
});
