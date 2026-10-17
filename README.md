# Testes Automatizados de Cadastro — Playwright

## Sobre o projeto

Projeto de estudo de QA Automation utilizando Playwright e JavaScript para testar um formulário de cadastro de usuário.

## Tecnologias

- JavaScript
- Node.js
- Playwright Test
- HTML

## Cenários de teste

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT-001 | Cadastro com nome vazio | O navegador impede o envio do formulário |
| CT-002 | Cadastro com e-mail inválido | O sistema apresenta uma mensagem de erro |
| CT-003 | Cadastro com senha inferior a 8 caracteres | O navegador considera o campo inválido |
| CT-004 | Cadastro com dados válidos | O sistema apresenta uma mensagem de sucesso |

## Estrutura do projeto

- `cadastro.html`: formulário de cadastro utilizado nos testes.
- `tests/cadastro.spec.js`: testes automatizados.
- `playwright.config.js`: configuração do Playwright.

## Como executar

Instale as dependências:

```bash
npm install
```

Execute os testes no Chromium:

```bash
npx playwright test tests/cadastro.spec.js --project=chromium
```

Abra o relatório HTML:

```bash
npx playwright show-report
```

## Objetivo de aprendizagem

Praticar automação de testes de interface, validação de formulários, asserções, organização de testes e análise de resultados.
