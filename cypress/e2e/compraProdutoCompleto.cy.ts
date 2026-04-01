describe('Compra completa — múltiplos produtos', () => {
  it('Ordena por preço, adiciona três itens e finaliza o pedido', () => {
    cy.login('standard_user', 'secret_sauce');

    // Ordenação do menor para o maior preço
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)');

    // Validação da ordenação (cards na ordem exibida)
    cy.get('[data-test="inventory-item"]').eq(0).find('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Onesie');
    cy.get('[data-test="inventory-item"]').eq(1).find('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bike Light');
    cy.get('[data-test="inventory-item"]').eq(2).find('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bolt T-Shirt');

    cy.contains('Sauce Labs Onesie').click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="back-to-products"]').click();

    cy.contains('Sauce Labs Bike Light').click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="back-to-products"]').click();

    cy.contains('Sauce Labs Bolt T-Shirt').click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="back-to-products"]').click();

    cy.get('[data-test="shopping-cart-link"]').should('have.text', '3');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="cart-list"]').should('contain', 'Sauce Labs Onesie');
    cy.get('[data-test="cart-list"]').should('contain', 'Sauce Labs Bike Light');
    cy.get('[data-test="cart-list"]').should('contain', 'Sauce Labs Bolt T-Shirt');

    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="cart-list"]').should('contain', 'Sauce Labs Onesie');
    cy.get('[data-test="cart-list"]').should('contain', 'Sauce Labs Bike Light');
    cy.get('[data-test="cart-list"]').should('contain', 'Sauce Labs Bolt T-Shirt');

    cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69');

    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
  });
});

