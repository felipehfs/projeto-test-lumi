import { fireEvent, screen } from "@testing-library/react";
import Button from "./Button";
import { describe, test, vi, expect } from "vitest";
import { renderWithTheme } from "../../utils/renderWithTheme";

describe("Button test", () => {
  test("should a click call a function", () => {
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Teste</Button>);

    fireEvent.click(screen.getByText("Teste"));

    expect(onClick).toHaveBeenCalled();
  });
});
