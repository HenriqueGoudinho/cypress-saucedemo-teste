## ▶️ Quick Start

bash
git clone <URL>
cd <repo>
npm install
npx cypress open

# Automacao E2E - Sauce Demo (Cypress + TypeScript)

Projeto de testes end-to-end com **Cypress** e **TypeScript** para o site de demonstração (https://www.saucedemo.com), cobrindo fluxos criticos de autenticacao, inventario, carrinho e checkout.

---

## Sumario

- [Pré-requisitos](#pre-requisitos)
- [Instalação do ambiente (Node.js, npm, Cypress e TypeScript)](#instalacao-do-ambiente-nodejs-npm-cypress-e-typescript)
- [Como clonar e instalar o projeto](#como-clonar-e-instalar-o-projeto)
- [Como executar os testes](#como-executar-os-testes)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Cenários cobertos](#cenarios-cobertos)
- [Arquitetura e decisões técnicas](#arquitetura-e-decisoes-tecnicas)
- [Estratégia de testes](#estrategia-de-testes)

---

## Pré-requisitos

| Ferramenta | Uso |
|------------|-----|
| **Node.js** (versao LTS recomendada) | Executa o JavaScript e o gerenciador **npm** |
| **npm** | Vem junto com o Node.js; instala **Cypress**, **TypeScript** e demais dependências do projeto |

Não é obrigatorio instalar Cypress ou TypeScript “na mão” no sistema operacional: este repositório ja declara tudo no 'package.json' e o 'npm install' baixa as versões corretas para a pasta 'node_modules'.

---

## Instalação do ambiente (Node.js, npm, Cypress e TypeScript)

### 1. Instalar Node.js (inclui npm)

O Node.js e o ambiente necessário para rodar o Cypress e o npm na sua maquina.

1. Acesse o site oficial: **[https://nodejs.org/](https://nodejs.org/)**
2. Baixe o instalador **LTS** (Long Term Support), recomendado para a maioria dos projetos.
3. Execute o instalador e siga as etapas (em Windows, marcar a opcao que adiciona o Node ao 'PATH' facilita o uso no terminal).
4. **Reabra** o terminal (ou o VS Code / Cursor) apos a instalação.

**Conferir se deu certo** (deve aparecer numeros de versao, sem erro):

```bash
node -v
npm -v
```

### 2. O que acontece com Cypress e TypeScript neste projeto

| Pacote | Papel | Como entra no seu computador |
|--------|--------|-------------------------------|
| **Cypress** | Framework de testes E2E | Listado em 'devDependencies' no 'package.json'; instalado com 'npm install' na pasta do projeto (nao exige `npm install -g cypress` para rodar este repo). |
| **TypeScript** | Linguagem dos arquivos '*.ts' e suporte a tipagem | Tambem em 'devDependencies'; o Cypress usa TypeScript nos testes conforme 'tsconfig.json'. |
| **@types/node** | Tipos do Node para o TypeScript | Instalado junto com as dependencias do projeto. |

Ou seja: **apos clonar o repositorio**, o passo que realmente instala Cypress e TypeScript e o **`npm install` na raiz do projeto** (veja a secao seguinte).

### 3. Verificar o Cypress depois do `npm install` (opcional)

Na pasta do projeto, apos `npm install`:

```bash
npx cypress verify
```

```bash
npx cypress --version
```

- `npx` executa o Cypress que foi instalado em `node_modules`, sem precisar instalacao global.

### 4. Resumo rapido

1. Instalar **Node.js LTS** em [nodejs.org](https://nodejs.org/) (npm vem junto).
2. Clonar o repositorio e entrar na pasta do projeto.
3. Rodar **`npm install`** — isso instala **Cypress**, **TypeScript** e o restante das dependencias listadas no `package.json`.

---

## Como clonar e instalar o projeto

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <PASTA_DO_PROJETO>
npm install
```

O comando `npm install` le o `package.json` e baixa tudo para `node_modules`, incluindo Cypress e TypeScript nas versoes definidas no projeto.

---

## Como executar os testes

| Comando | Descricao |
|---------|-----------|
| `npm run cy:run` | Executa todos os testes em modo **headless** (terminal, sem interface grafica). |
| `npm run cy:open` | Abre o **Cypress Test Runner** para escolher o navegador e rodar os specs na interface. |
| `npm test` | Alias para `cypress run` (mesmo efeito que `cy:run` neste projeto). |

Executar **um arquivo** especifico:

```bash
npx cypress run --spec "cypress/e2e/login.cy.ts"
```

Executar **varios** specs:

```bash
npx cypress run --spec "cypress/e2e/login.cy.ts,cypress/e2e/checkout.cy.ts"
```

---

## Estrutura do projeto

```
.
├── cypress/
│   ├── e2e/                 # Specs de teste E2E (*.cy.ts)
│   ├── fixtures/            # Dados estaticos (quando utilizados)
│   └── support/
│       ├── commands.ts      # - Uso de Custom Commands para abstração de ações repetitivas (ex: login)     
│       ├── e2e.ts           # Carregado antes dos testes
│       └── index.d.ts       # Tipagem TypeScript dos comandos
├── cypress.config.ts        # Configuracao do Cypress (baseUrl, etc.)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Cenários cobertos

| Arquivo | O que valida |
|---------|----------------|
| `login.cy.ts` | Login com usuario valido e acesso ao inventario. |
| `login-invalido.cy.ts` | Credenciais incorretas e mensagem de erro. |
| `usuario_invalido.cy.ts` | Variacao de usuarios invalidos (data-driven). |
| `checkout.cy.ts` | Adicionar item, carrinho e finalizar pedido. |
| `compraProdutoCompleto.cy.ts` | Ordenacao por preco, multiplos produtos, total e conclusao. |
| `logout.cy.ts` | Logout e retorno a tela de login. |
| `carrinho-remover-item.cy.ts` | Adicionar e remover item; badge do carrinho. |
| `checkout-campos-obrigatorios.cy.ts` | Validacao de campos obrigatorios no checkout. |

## Arquitetura e decisões técnicas

- **Cypress + TypeScript:** tipagem e melhor manutencao conforme a suite cresce.

- **`baseUrl` em `cypress.config.ts`:** URL base `https://www.saucedemo.com`, evitando repetir URL completa em cada `cy.visit('/')`.

- **Comando 'cy.login' em 'support/commands.ts':** centraliza o fluxo de login (visitar pagina, preencher campos, submeter), reduzindo duplicacao nos specs.

- **Seletores:** prioridade a atributos `data-test` quando existem no Sauce Demo, para testes menos acoplados a classes CSS puras.

---

## Estratégia de testes

- Testes independentes e isolados
- Validação de comportamento (URL + elementos da tela)
- Uso de seletores estáveis (data-test)

---

## Licença

Este repositorio e um projeto de estudo / desafio tecnico. Ajuste a licenca conforme sua necessidade.

---

## Autor

Henrique Goudinho da Silva.