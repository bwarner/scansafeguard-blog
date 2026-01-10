import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UnauthorizedPage from "./page";

describe("UnauthorizedPage", () => {
  it("renders the 401 heading", () => {
    render(<UnauthorizedPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("401");
  });

  it("renders the Unauthorized Access message", () => {
    render(<UnauthorizedPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /unauthorized access/i })
    ).toBeInTheDocument();
  });

  it("renders a helpful description", () => {
    render(<UnauthorizedPage />);
    expect(
      screen.getByText(/you don't have permission to access this page/i)
    ).toBeInTheDocument();
  });

  it("renders a link to sign in", () => {
    render(<UnauthorizedPage />);
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute("href", "/login");
  });

  it("renders a link to go home", () => {
    render(<UnauthorizedPage />);
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders the ShieldX icon container", () => {
    render(<UnauthorizedPage />);
    const iconContainer = document.querySelector(".rounded-full.bg-ssg-cream");
    expect(iconContainer).toBeInTheDocument();
  });
});
