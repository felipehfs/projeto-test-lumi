import { screen, fireEvent, waitFor } from "@testing-library/react";
import TextInput from "./TextInput";
import { describe, test, expect, vi } from "vitest";
import { renderWithTheme } from "../../utils/renderWithTheme";

describe("TextInput test", () => {
  test("should have a correct label", () => {
    const label = "Nome";
    renderWithTheme(<TextInput id="name" label={label} />);
    expect(screen.getByText(label)).toBeTruthy();
  });

  test("should update the value", async () => {
    const label = "Nome";
    const initialValue = "Marcos";
    const onChange = vi.fn();
    const placeholder = "Digite um número";
    renderWithTheme(
      <TextInput
        id="name"
        label={label}
        onChange={onChange}
        value={initialValue}
        placeholder={placeholder}
      />
    );

    expect(screen.getByDisplayValue(initialValue)).toBeTruthy();

    fireEvent.change(screen.getByPlaceholderText(placeholder), {
      target: {
        value: 'text'
      }
    });

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});
