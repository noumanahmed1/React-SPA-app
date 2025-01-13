import React from "react";
import { render, screen } from "@testing-library/react/pure";
import "@testing-library/jest-dom/extend-expect";
import Root from "./root.component";

describe("Root component", () => {
  it("should render the welcome message", () => {
    render(<Root />);
    const heading = screen.getByText("Wellcome to React App one");
    expect(heading).toBeInTheDocument();
  });
});
