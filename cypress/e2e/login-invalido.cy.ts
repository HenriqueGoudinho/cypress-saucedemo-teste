describe('Login invalido', () => {
  it('Deve exibir mensagem de erro para credenciais incorretas', () => {
    cy.login('standard_user', 'wrong_password');

    cy.get('[data-test="error"]').should('be.visible').and('contain.text', 'Epic sadface');
  });
});

