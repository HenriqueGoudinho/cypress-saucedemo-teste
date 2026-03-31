describe('Checkout', () => {
  it('Adiciona um item ao carrinho e finaliza o pedido', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.get('[data-test^="add-to-cart"]').first().click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('.cart_item').should('have.length.greaterThan', 0);

    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="complete-header"]').should('be.visible').and('contain.text', 'Thank you for your order');
  });
});

