describe('Validacao de usuarios (diferentes de standard_user)', () => {
  const senha = 'secret_sauce'

  const usuariosInvalidos = ['', 'qualquer_coisa', 'problem_user', 'locked_out_user', 'performance_glitch_user', 'error_user', 'visual_user']

  usuariosInvalidos.forEach((usuario) => {
    it(`Deve mostrar erro para usuario: "${usuario || '(vazio)'}"`, () => {
      cy.login(usuario, senha)

      cy.get('[data-test="error"]').should('be.visible').and('contain.text', 'Epic sadface')

      cy.url().should('not.include', '/inventory')
    })
  })
})