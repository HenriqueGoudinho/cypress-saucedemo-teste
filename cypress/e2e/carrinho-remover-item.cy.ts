describe('Carrinho - remover item', () => {
  it('Deve zerar o badge ao remover o unico item adicionado', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });
});
