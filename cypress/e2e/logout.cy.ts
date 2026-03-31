describe('Logout', () => {
  it('Deve encerrar sessao e exibir novamente a tela de login', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.url().should('include', '/inventory');

    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    cy.url().should('not.include', '/inventory');
    cy.get('[data-test="login-button"]').should('be.visible');
  });
});
