describe("Login Page", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("http://localhost:3000/login");
  });

  it("should display login form elements correctly", () => {
    // Check for Mobile Number input field
    cy.get('input[name="username"]')
      .should("be.visible")
      .should("have.attr", "placeholder", "Enter Your Mobile Number");

    // Check for Password input field
    cy.get('input[name="password"]')
      .should("be.visible")
      .should("have.attr", "placeholder", "Enter Your Password");

    // Check for Login button
    cy.get('button[type="submit"]').should("be.visible").contains("LOGIN");

    // Check for Forgot Password link
    cy.get("a").contains("Forgot Password ?").should("be.visible");

    // Check for Create Account link
    cy.get("a").contains("New User? Create an account").should("be.visible");
  });

  it("should show validation errors when required fields are empty", () => {
    // Submit the form without entering any values
    cy.get("form").submit();

    // Check if validation messages appear
    cy.get('input[name="username"]').then(($input) => {
      // Ensure error message for username
      cy.wrap($input).siblings(".mantine-TextInput-error").should("exist");
    });

    cy.get('input[name="password"]').then(($input) => {
      // Ensure error message for password
      cy.wrap($input).siblings(".mantine-TextInput-error").should("exist");
    });
  });

  it("should show validation error for invalid mobile number", () => {
    // Enter an invalid mobile number (less than 10 digits)
    cy.get('input[name="username"]').type("12345");

    // Submit the form
    cy.get("form").submit();

    // Check if the validation error for mobile number appears
    cy.get('input[name="username"]')
      .siblings(".mantine-TextInput-error")
      .should("contain", "Mobile number should be 10 digit");
  });

  it("should show loading state on form submission", () => {
    // Mocking the login API response
    cy.intercept("POST", "/api/login", { statusCode: 200 }).as("loginRequest");

    // Fill out the form
    cy.get('input[name="username"]').type("9876543210");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get("form").submit();

    // Verify loading state (button should have loading spinner)
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should navigate to the dashboard after successful login", () => {
    // Mock successful login API response
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: { token: "mock-token" },
    }).as("loginRequest");

    // Fill out the form
    cy.get('input[name="username"]').type("9876543210");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get("form").submit();

    // Wait for login request and ensure it was successful
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // After successful login, check if the user is redirected to the dashboard or appropriate page
    cy.url().should("include", "/dashboard"); // Adjust this to the correct URL after login
  });

  it("should navigate to forgot password page", () => {
    // Click the "Forgot Password ?" link
    cy.get("a").contains("Forgot Password ?").click();

    // Check that the URL has changed to the forgot password page
    cy.url().should("include", "/forgot");
  });

  it("should navigate to register page", () => {
    // Click the "New User? Create an account" link
    cy.get("a").contains("New User? Create an account").click();

    // Check that the URL has changed to the register page
    cy.url().should("include", "/register");
  });
});
