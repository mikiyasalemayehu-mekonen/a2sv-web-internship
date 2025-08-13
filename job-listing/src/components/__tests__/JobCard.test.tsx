/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobCard from "../JobCard";
import * as bookmarkLib from "@/lib/bookmark";

// mock next-auth useSession
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// mock next/navigation useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("JobCard", () => {
  const defaultProps = {
    id: "1",
    name: "Org",
    title: "Software Mentor",
    location: "Addis Ababa",
    description: "desc",
    avatarUrl: "/logo.png",
    jobType: "Full-time",
    categories: ["Education"],
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders job card and categories", () => {
    // unauthenticated - useSession mock returns null
    (require("next-auth/react").useSession as jest.Mock).mockReturnValue({
      data: null,
    });
    render(<JobCard {...defaultProps} isBookmarked={false} />);
    expect(screen.getByText("Software Mentor")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByTestId("bookmark-btn")).toBeInTheDocument();
  });

  it("redirects to /signin if user is not logged in", async () => {
    (require("next-auth/react").useSession as jest.Mock).mockReturnValue({
      data: null,
    });
    render(<JobCard {...defaultProps} isBookmarked={false} />);
    await userEvent.click(screen.getByTestId("bookmark-btn"));
    expect(mockPush).toHaveBeenCalledWith("/signin");
  });

  it("calls toggle API when user is authenticated and toggles icon", async () => {
    (require("next-auth/react").useSession as jest.Mock).mockReturnValue({
      data: { accessToken: "TOK" },
    });

    const toggleMock = jest
      .spyOn(bookmarkLib, "toggleBookmark")
      .mockResolvedValue({ success: true });

    render(<JobCard {...defaultProps} isBookmarked={false} />);
    const btn = screen.getByTestId("bookmark-btn");
    await userEvent.click(btn);

    // Updated expectation to match actual JobCard call
    expect(toggleMock).toHaveBeenCalledWith(
      "1",
      false,
      "TOK",
      "https://akil-backend.onrender.com"
    );

    // After successful toggle the UI should show filled icon
    expect(await screen.findByTestId("bookmark-filled")).toBeInTheDocument();
  });
});
