# Teste de Validação de Campos no Cadastro

Este conjunto de testes automatizados, usando **Cypress**, valida os campos obrigatórios no cadastro de usuários. O código foi estruturado para facilitar a manutenção e reutilização de dados e seletores.

## Estrutura do Projeto

- **Seletores**: Para manter o código limpo e modular, todos os seletores são armazenados em um arquivo separado em `cypress/support/selectors.js`. Isso facilita a manutenção do código, permitindo que mudanças nos elementos da interface sejam feitas de forma centralizada.
- **Dados de Teste**: Foi criado um arquivo `cypress/fixtures/users.js`, onde os dados dos usuários são armazenados. Isso permite que os dados sejam reutilizados em diferentes cenários de teste, evitando duplicação de código.
- **Tags nos Testes**: As tags são usadas para categorizar os testes, facilitando a execução de testes específicos. O `@grep` foi utilizado para adicionar tags como `@cadastro`, `@sucess`, `@validateError`, entre outras, aos testes, permitindo que testes com tags específicas sejam executados de forma isolada.

## Cenários de Teste

1. **Cadastro com sucesso**: Verifica se o cadastro é feito corretamente com dados válidos e exibe a mensagem de sucesso.
2. **Campos obrigatórios vazios**: Verifica se os erros são exibidos quando campos obrigatórios são deixados vazios.
3. **E-mails diferentes**: Verifica se o erro é mostrado quando os e-mails não coincidem.
4. **Senha fraca**: Verifica se o erro é exibido quando a senha não atende aos requisitos.
5. **Campos individuais vazios**: Verifica se erros são mostrados ao deixar campos obrigatórios vazios um de cada vez.

## Como Rodar

### Rodando Todos os Testes

1. Instale o Cypress com o comando:
  ```
  npm install cypress --save-dev
  ```

2. Abra o Cypress com o comando:
  ```
  npx cypress open
  ```

  ou

3. Rode os teste no modo headless com o comando:
  ```
  npx cypress run 
  ```

### Rodando Testes com Tags Específicas

Para rodar apenas os testes com tags específicas, utilize o comando abaixo com a opção --env grep=tag:

2. Abra o Cypress com o comando:
  ```
  npx cypress run --env grep="@cadastro"
  ```


Isso executará apenas os testes que possuem a tag @cadastro.

# Outros Testes Relacionados

### Teste de Performance com K6: https://github.com/jasonwillyan/k6-performance-test

### Teste de API com Postman: https://github.com/jasonwillyan/collection-API