describe('Validacao de usuarios invalidos', () => {
  const senha = 'secret_sauce';

  // Usuarios que realmente falham no login
  const usuariosInvalidos = ['', 'qualquer_coisa', 'locked_out_user'];

  usuariosInvalidos.forEach((usuario) => {
    it(`Deve mostrar erro para usuario: "${usuario || '(vazio)'}"`, () => {
      cy.login(usuario, senha);

      cy.get('[data-test="error"]').should('be.visible').and('contain.text', 'Epic sadface');

      cy.url().should('not.include', '/inventory');
    });
  });
});