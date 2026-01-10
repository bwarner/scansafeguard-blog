import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPage from "./error";

describe("ErrorPage", () => {
  const mockReset = vi.fn();
  const mockError = new Error("Test error message") as Error & {
    digest?: string;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the error heading", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(
      screen.getByRole("heading", { name: /something went wrong/i })
    ).toBeInTheDocument();
  });

  it("renders a helpful description", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(
      screen.getByText(/we encountered an unexpected error/i)
    ).toBeInTheDocument();
  });

  it("renders a Try Again button", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it("calls reset when Try Again is clicked", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(tryAgainButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders a link to go home", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("displays error digest when provided", () => {
    const errorWithDigest = new Error("Test error") as Error & {
      digest?: string;
    };
    errorWithDigest.digest = "abc123";

    render(<ErrorPage error={errorWithDigest} reset={mockReset} />);
    expect(screen.getByText(/error id: abc123/i)).toBeInTheDocument();
  });

  it("does not display error digest when not provided", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.queryByText(/error id:/i)).not.toBeInTheDocument();
  });

  it("logs error to console", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    consoleSpy.mockRestore();
  });

  it("renders the AlertTriangle icon container", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const iconContainer = document.querySelector(".rounded-full.bg-ssg-cream");
    expect(iconContainer).toBeInTheDocument();
  });
});
