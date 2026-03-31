describe('Login', () => {
  it('Deve fazer login com sucesso', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.url().should('include', '/inventory');
    cy.get('[data-test="inventory-container"]').should('be.visible');
  });
});