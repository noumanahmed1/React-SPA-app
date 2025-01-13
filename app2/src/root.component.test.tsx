import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Root from "./root.component";

// Mock the fetch API globally
global.fetch = jest.fn();

describe("Root component", () => {
  afterEach(() => {
    // Manually reset the fetch mock
    global.fetch.mockReset();
  });

  it("should render the heading and the UserList component", () => {
    render(<Root />);
    expect(screen.getByText("List of items on react app two")).toBeInTheDocument();
  });

  it("should display loading state initially in UserList", () => {
    render(<Root />);
    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("should render user list after fetching data", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "User One", email: "userone@example.com" },
        { id: 2, name: "User Two", email: "usertwo@example.com" },
      ],
    });

    render(<Root />);

    await waitFor(() => {
      expect(screen.getByText("User One (userone@example.com)")).toBeInTheDocument();
      expect(screen.getByText("User Two (usertwo@example.com)")).toBeInTheDocument();
    });
  });

  it("should display an error message if fetching fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Failed to fetch users"));

    render(<Root />);

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch users")).toBeInTheDocument();
    });
  });
});
