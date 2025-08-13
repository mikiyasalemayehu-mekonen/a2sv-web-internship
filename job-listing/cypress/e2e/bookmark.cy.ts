// cypress/e2e/bookmark.cy.ts
describe("JobCard Bookmark E2E Test", () => {
  const jobTitle = "Software Mentor";

  beforeEach(() => {
    // Intercept the jobs API so we wait for it
    cy.intercept(
      "GET",
      "https://akil-backend.onrender.com/opportunities/search"
    ).as("getJobs");

    // Visit the dashboard where JobCard is rendered
    cy.visit("/dashboard");

    // Wait for the jobs to load
    cy.wait("@getJobs");
  });

  it("shows bookmark button", () => {
    // First JobCard's bookmark button should exist
    cy.get(`[data-testid="bookmark-btn"]`).first().should("exist");
  });

  it("redirects unauthenticated users to signin", () => {
    // Click the bookmark button as unauthenticated user
    cy.get(`[data-testid="bookmark-btn"]`).first().click();

    // Should redirect to signin page
    cy.url().should("include", "/signin");
  });

  it("allows authenticated users to toggle bookmark", () => {
    // Simulate login via API or session setup
    cy.request("POST", "/api/auth/callback/credentials", {
      username: "testuser",
      password: "password",
    }).then(() => {
      // Reload dashboard as logged-in user
      cy.visit("/dashboard");
      cy.wait("@getJobs");

      // Bookmark the first job
      cy.get(`[data-testid="bookmark-btn"]`).first().click();

      
      cy.get(`[data-testid="bookmark-btn"] svg`).should(
        "have.attr",
        "fill",
        "currentColor"
      );
    });
  });
});
