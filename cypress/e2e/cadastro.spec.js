import { cadastroSelectors as selectors } from "../support/selectors";

describe('Validação de Campos Obrigatórios no Cadastro', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config('baseUrl')}`)
  });

  it('[@cadastro] [@sucess] Deve cadastrar corretamente e exibir mensagem de sucesso', () => {
    cy.fixture('users').then((data) => {
      cy.preencherFormulario({
        nome: data.user.nome,
        email: data.user.email,
        senha: data.user.senhaForte,
        nascimento: data.user.dataNascimento
      });
      cy.get(selectors.botaoSubmit).click();
      cy.get(selectors.mensagemSucesso).should('be.visible').and('have.text', 'Cadastro realizado com sucesso!');
    });
  });

  it('[@cadastro] [@validateError] Não deve permitir cadastro com campos obrigatórios vazios', () => {
    cy.get(selectors.botaoSubmit).click();
    cy.get(selectors.nomeErro).should('have.text', 'Nome é obrigatório.');
    cy.get(selectors.emailErro).should('have.text', 'E-mail é obrigatório.');
    cy.get(selectors.confirmEmailErro).should('have.text', 'Os e-mails não coincidem.');
    cy.get(selectors.senhaErro).should('have.text', 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.');
    cy.get(selectors.nascimentoErro).should('have.text', 'Data de nascimento é obrigatória.');
    cy.get(selectors.termosErro).should('have.text', 'Você deve aceitar os termos.');
  });

  it('[@cadastro] [@validateError] Deve exibir erro ao digitar e-mails diferentes', () => {
    cy.fixture('users').then((data => {
      cy.get(selectors.nome).type(data.user.nome);
      cy.get(selectors.email).type(data.user.email);
      cy.get(selectors.confirmEmail).type(data.user.emailInvalido);
      cy.get(selectors.senha).type(data.user.senhaForte);
      cy.get(selectors.nascimento).type(data.user.dataNascimento);
    }))
    cy.get(selectors.termos).check();
    cy.get(selectors.botaoSubmit).click();
    cy.get(selectors.confirmEmailErro).should('have.text', 'Os e-mails não coincidem.');
  });

  it('[@cadastro] [@validateError] Deve exibir erro ao usar uma senha fraca', () => {
    cy.fixture('users').then((data => {
      cy.get(selectors.nome).type(data.user.nome);
      cy.get(selectors.email).type(data.user.email);
      cy.get(selectors.confirmEmail).type(data.user.emailInvalido);
      cy.get(selectors.senha).type(data.user.senhaFraca);
      cy.get(selectors.nascimento).type(data.user.dataNascimento);
    }))
    cy.get(selectors.termos).check();
    cy.get(selectors.botaoSubmit).click();
    cy.get(selectors.senhaErro).should('have.text', 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.');
  });

  it('[@cadastro] [@validateError] Deve exibir erro ao deixar cada campo obrigatório vazio individualmente', () => {
    const campos = [
      { id: selectors.nome, erro: selectors.nomeErro, msg: 'Nome é obrigatório.' },
      { id: selectors.email, erro: selectors.emailErro, msg: 'E-mail é obrigatório.' },
      { id: selectors.confirmEmail, erro: selectors.confirmEmailErro, msg: 'Os e-mails não coincidem.' },
      { id: selectors.senha, erro: selectors.senhaErro, msg: 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.' },
      { id: selectors.nascimento, erro: selectors.nascimentoErro, msg: 'Data de nascimento é obrigatória.' }
    ];

    campos.forEach(({ id, erro, msg }) => {
      cy.reload();
      cy.get(selectors.nome).type('Jason Willyan');
      cy.get(selectors.email).type('jason@example.com');
      cy.get(selectors.confirmEmail).type('jason@example.com');
      cy.get(selectors.senha).type('SenhaForte123');
      cy.get(selectors.nascimento).type('2000-01-01');
      cy.get(selectors.termos).check();
      cy.get(id).clear();
      cy.get(selectors.botaoSubmit).click();
      cy.get(erro).should('contain', msg);
    });
  });
})
