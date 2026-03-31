describe('Checkout - campos obrigatorios', () => {
  it('Deve exibir erro ao continuar sem preencher os dados do pedido', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });
});
