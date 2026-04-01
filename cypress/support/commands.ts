/// <reference types="cypress" />

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/');

  cy.get('[data-test="username"]').clear();
  if (username.length > 0) {
    cy.get('[data-test="username"]').type(username);
  }
  cy.get('[data-test="password"]').clear();
  if (password.length > 0) {
    cy.get('[data-test="password"]').type(password);
  }
  cy.get('[data-test="login-button"]').click();
});

export {};