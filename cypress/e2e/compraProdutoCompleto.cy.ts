describe('Checkout', () => {
  it('Compra completa', () => {
    cy.login('standard_user', 'secret_sauce');

    //ordenação do produto de menor para maior valor
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

    //Validação de ordenção dos produtos
    cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Onesie')
    cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bike Light')
    cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bolt T-Shirt')
    
    //Adicionando o produto no carrinho
    cy.contains('Sauce Labs Onesie').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="back-to-products"]').click()

    cy.contains('Sauce Labs Bike Light').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="back-to-products"]').click()

    cy.contains('Sauce Labs Bolt T-Shirt').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="back-to-products"]').click()

    //Validar se tem que 3 produtos adicionados
    cy.get('[data-test="shopping-cart-link"]').should('have.text', '3')
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="cart-list"] > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
    cy.get('[data-test="cart-list"] > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
    cy.get('[data-test="cart-list"] > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')

    //Clicar em checkout
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    //Validar se os 3 produtos estão no carrinho
    cy.get('[data-test="cart-list"] > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
    cy.get('[data-test="cart-list"] > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
    cy.get('[data-test="cart-list"] > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')

    //Checagem do valor total
    cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')

    //Finalizar
    cy.get('[data-test="finish"]').click()

    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
  });   
});

