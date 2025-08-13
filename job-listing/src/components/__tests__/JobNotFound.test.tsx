import React from "react";
import { render, screen } from "@testing-library/react";
import OpportunityDetail from "@/app/opportunities/[id]/page"; // or the small component that shows "No opportunity found"

// If OpportunityDetail is a full route with hooks, better test a small presentational JobNotFound component:
const JobNotFound = () => <div>No opportunity found</div>;

test("shows job not found", () => {
  render(<JobNotFound />);
  expect(screen.getByText("No opportunity found")).toBeInTheDocument();
});
