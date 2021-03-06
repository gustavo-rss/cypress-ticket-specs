/// <reference types="Cypress" />

describe("Tickets", () => {
    beforeEach(() => cy.visit("/index.html"));
  
    it("fills all the text input fields", () => {
      const firstName = "Gustavo";
      const lastName = "Ramos";
  
      cy.get("#first-name").type(firstName);
      cy.get("#last-name").type(lastName);
      cy.get("#email").type("gustavo@gmail.com");
      cy.get("#requests").type("Glass of water");
      cy.get("#signature").type(`${firstName} ${lastName}`);
    });
  
    it("select two tickets", () => {
      cy.get("#ticket-quantity").select("2");
    });
  
    it("select 'vip' ticket type", () => {
      cy.get("#vip").check();
    });
  
    it("selects 'social media' checkbox", () => {
      cy.get("#social-media").check();
    });
  
    it("selects 'friend' and 'publication', then uncheck 'friend'", () => {
      cy.get("#friend").check();
      cy.get("#publication").check();
      cy.get("#friend").uncheck();
    });
  
    it("has 'TICKETBOX' header's heading", () => {
      cy.get("header h1").should("contain", "TICKETBOX");
    });
  
    it("alerts on invalid email", () => {
      cy.get("#email").as("email").type("gustavo-gmail.com");
  
      cy.get("#email.invalid").should("exist");
  
      cy.get("@email").clear().type("gustavo@gmail.com");
  
      cy.get("#email.invalid").should("not.exist");
    });
  
    it("fills and reset the form", () => {
      const firstName = "Gustavo";
      const lastName = "Ramos";
      const fullName = `${firstName} ${lastName}`;
  
      cy.get("#first-name").type(firstName);
      cy.get("#last-name").type(lastName);
      cy.get("#email").type("gustavo@gmail.com");
      cy.get("#ticket-quantity").select("2");
      cy.get("#vip").check();
      cy.get("#friend").check();
      cy.get("#requests").type("Glass of water");
  
      cy.get(".agreement p").should(
        "contain",
        `I, ${fullName}, wish to buy 2 VIP tickets.`
      );
  
      cy.get("#agree").click();
      cy.get("#signature").type(fullName);
  
      cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");
  
      cy.get("button[type='reset']").click();
  
      cy.get("@submitButton").should("be.disabled");
    });
  
    it("fills mandatory fields using support command", () => {
      const customer = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };
  
      cy.fillMandatoryFields(customer);
  
      cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");
  
      cy.get("#agree").uncheck();
  
      cy.get("@submitButton").should("be.disabled");
    });
  });
  