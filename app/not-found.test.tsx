import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders the 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
  });

  it("renders the Page Not Found message", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { level: 2, name: /page not found/i }),
    ).toBeInTheDocument();
  });

  it("renders a helpful description", () => {
    render(<NotFound />);
    expect(
      screen.getByText(/the page you're looking for doesn't exist/i),
    ).toBeInTheDocument();
  });

  it("renders a link to browse the blog", () => {
    render(<NotFound />);
    const blogLink = screen.getByRole("link", { name: /browse blog/i });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute("href", "/posts");
  });

  it("renders a link to go home", () => {
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders the FileQuestion icon container", () => {
    render(<NotFound />);
    const iconContainer = document.querySelector(".rounded-full.bg-ssg-cream");
    expect(iconContainer).toBeInTheDocument();
  });
});
