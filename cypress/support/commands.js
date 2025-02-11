import { cadastroSelectors as sel } from './selectors';

Cypress.Commands.add('preencherFormulario', (dados) => {
  cy.get(sel.nome).type(dados.nome);
  cy.get(sel.email).type(dados.email);
  cy.get(sel.confirmEmail).type(dados.email);
  cy.get(sel.senha).type(dados.senha);
  cy.get(sel.nascimento).type(dados.nascimento);
  cy.get(sel.termos).check();
});