import { screen } from "@testing-library/react";
import EmptySstate from "./EmptyState";
import { describe, test, expect } from "vitest";
import { renderWithTheme } from "../../utils/renderWithTheme";

describe("Button test", () => {
  test("should see a not found message", () => {
    renderWithTheme(<EmptySstate />);

    expect(screen.getByText("Nada Encontrado")).toBeTruthy();
  });
});
