# Kick-Off Backend

API desenvolvida com **Node.js, NestJS e TypeScript** para conectar startups, investidores e desenvolvedores. Permite cadastrar perfis, publicar demandas de investimento ou desenvolvimento e gerenciar as interações entre os participantes, com persistência no **Cloud Firestore**.

[![Node.js](https://img.shields.io/badge/Node.js-16.13.2-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-8.0.0-E0234E?logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.3.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Cloud_Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/docs/firestore)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-AGPL_v3-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🐋 Getting started with Docker](#getting-started-with-docker)
- [🔌 API usage](#api-usage)
- [🗂️ Project structure](#project-structure)
- [✅ Testing and quality](#testing-and-quality)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- Cadastro e login de startups, investidores e desenvolvedores.
- Autenticação com JWT e hash de senhas com bcrypt.
- Consulta, atualização e exclusão de perfis.
- Cadastro, consulta, atualização e exclusão de demandas.
- Demandas dos tipos `development` e `investment`.
- Solicitação de vínculo entre participantes e demandas, com avaliação pela startup.
- Registro de notificações nos dados do usuário.
- Endpoints de saúde e versão da aplicação.

<a id="technologies"></a>

## 🧪 Technologies

As versões abaixo são as declaradas no `package.json`.

| Tecnologia                                                 | Versão  | Utilização                                            |
| ---------------------------------------------------------- | ------- | ----------------------------------------------------- |
| [Node.js](https://nodejs.org/)                             | 16.13.2 | Ambiente de execução                                  |
| [NestJS](https://docs.nestjs.com/)                         | 8.0.0   | Organização da API em módulos, controllers e serviços |
| [TypeScript](https://www.typescriptlang.org/docs/)         | 4.3.5   | Tipagem e compilação                                  |
| [Firebase SDK](https://firebase.google.com/docs/firestore) | 9.6.6   | Acesso ao Cloud Firestore                             |
O projeto também possui um `Dockerfile` e workflows do GitHub Actions.

<a id="environment-setup"></a>

## 🛠️ Environment setup

### 1. Prerequisites

- Git.
- Node.js **16.13.2**, versão definida em `engines.node` e no workflow de CI.
- npm, distribuído com o Node.js.
- Um projeto Firebase próprio com Cloud Firestore habilitado.
- Docker, caso opte pela execução em container.

> A versão do Node.js documentada reproduz a configuração histórica do projeto. A atualização do runtime e das dependências deve ser validada separadamente.

Se você já utiliza o [nvm](https://github.com/nvm-sh/nvm), selecione a versão com:

```bash
nvm install 16.13.2
nvm use 16.13.2
node --version
npm --version
```

### 2. Clone and install

```bash
git clone https://github.com/paulodaluz/kick-off-backend.git
cd kick-off-backend
npm install
```

Este guia utiliza **npm**, assim como o Dockerfile e a CI. O repositório não contém `package-lock.json` nem `yarn.lock`; por isso, a instalação inicial utiliza `npm install`, e não `npm ci`.

Não há configuração de hooks de Git ou script `prepare` no projeto. Também não é necessário instalar a CLI do NestJS globalmente: os scripts utilizam a dependência local.

### 3. Environment variables

Na raiz do projeto:

```bash
cp .env.example .env
```

No PowerShell, o comando equivalente é `Copy-Item .env.example .env`.

Preencha o arquivo:

```dotenv
PORT=3001
APPLICATION_PREFIX=kick-off/v1
SECRET_KEY_TO_JWT_TOKEN=SUBSTITUA_POR_UMA_CHAVE_ALEATORIA
```

Para gerar uma chave, execute o comando abaixo e copie o resultado para `SECRET_KEY_TO_JWT_TOKEN`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

| Variável | Finalidade | Configuração |
| --- | --- | --- |
| `PORT` | Porta HTTP da API | `3001` no exemplo e como fallback no código |
| `APPLICATION_PREFIX` | Prefixo global das rotas | `kick-off/v1`; configure explicitamente |
| `SECRET_KEY_TO_JWT_TOKEN` | Chave de assinatura e validação dos tokens | Obrigatória para cadastro, login e rotas autenticadas |
| `HOST` | Interface de escuta | Opcional; o padrão no código é `0.0.0.0` |

Não publique o arquivo `.env` nem compartilhe a chave JWT.

### 4. Firebase configuration

A configuração do Firebase está definida diretamente em:

`src/database/configuration.database.ts`

Antes de utilizar as funcionalidades com persistência:

1. Crie ou selecione seu projeto no [Firebase Console](https://console.firebase.google.com/).
2. Habilite o **Cloud Firestore**.
3. Registre uma aplicação Web e obtenha o objeto de configuração do Firebase.
4. Substitua o objeto `firebaseConfig` no arquivo indicado pelos dados do seu projeto.
5. Revise as regras de acesso do Firestore para o ambiente utilizado.

Os repositórios acessam as coleções `users` e `requirements`, gravando documentos conforme as operações da API.

> A implementação utiliza o SDK cliente do Firebase, e não o Firebase Admin SDK. O JWT emitido pela API não autentica o cliente no Firebase Authentication. Regras que exigem `request.auth` precisam de uma integração correspondente; não libere acesso público ao banco para contornar erros de permissão.
>
> O código atual não lê variáveis `FIREBASE_*` do `.env`. Adicioná-las ao arquivo, sem alterar a inicialização do Firebase, não muda o projeto utilizado.

<a id="getting-started"></a>

## 🚀 Getting started

### Development

```bash
npm run start:dev
```

O modo de desenvolvimento acompanha alterações no código e reinicia a aplicação.

Com o `.env` de exemplo, a URL base é:

**http://localhost:3001/kick-off/v1**

Verifique se a API está respondendo:

```bash
curl http://localhost:3001/kick-off/v1/health
```

Resposta esperada:

```json
{
  "status": "UP"
}
```

Esse endpoint confirma a resposta da aplicação; ele não verifica a conexão com o Firestore.

### Build and production start

```bash
npm run build
npm run start:prod
```

O build gera os arquivos em `dist/`. Mantenha as variáveis de ambiente configuradas ao iniciar a aplicação.

<a id="getting-started-with-docker"></a>

## 🐋 Getting started with Docker

Configure o Firebase antes de construir a imagem.

O `Dockerfile` atual utiliza `COPY . /app/`, e o `.dockerignore` não exclui `.env`. Não inclua credenciais no contexto de build. A seguinte exclusão é uma pendência de revisão do Dockerfile/contexto antes de construir imagens com configurações privadas (nenhum arquivo Docker foi alterado nesta entrega):

```gitignore
.env
.env.*
!.env.example
```

Construa a imagem:

```bash
docker build -t backend/kickoff .
```

Inicie o container com as variáveis fornecidas em tempo de execução:

```bash
docker run --name kick-off-backend \
  --env-file .env \
  -p 3001:3001 \
  -d backend/kickoff
```

Consulte os logs:

```bash
docker logs -f kick-off-backend
```

A API estará disponível em **http://localhost:3001/kick-off/v1**, mantendo `PORT=3001`.

Para parar e remover o container:

```bash
docker stop kick-off-backend
docker rm kick-off-backend
```

> O Dockerfile utiliza `node:alpine`, sem fixar a versão, enquanto o projeto declara Node.js 16.13.2. Portanto, o ambiente Docker pode divergir do ambiente local. Ele também inicia com `npm start`; o script `start:prod` é uma opção distinta.

**Validação:** comandos Docker documentados somente por inspeção; Docker não foi executado nesta tarefa. Não há Compose ou volumes declarados.

<a id="api-usage"></a>

## 🔌 API usage

### Authentication

Cadastro e login retornam um `token` e o `uuid` do usuário. No login, a resposta também inclui `typeOfUser`.

Exemplo de login com um usuário previamente cadastrado:

```bash
curl -X POST http://localhost:3001/kick-off/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "usuario@example.com",
    "password": "SUA_SENHA"
  }'
```

Nas rotas protegidas, envie o token **diretamente no header `Authorization`, sem o prefixo `Bearer`**, conforme o middleware atual:

```bash
curl http://localhost:3001/kick-off/v1/user/get-infos/UUID_DO_USUARIO \
  -H 'Authorization: SEU_TOKEN_JWT'
```

Exemplo de consulta de demandas de investimento:

```bash
curl http://localhost:3001/kick-off/v1/requirement/active-requirements \
  -H 'Authorization: SEU_TOKEN_JWT' \
  -H 'typeOfRequirement: investment'
```

### Routes

Todos os caminhos abaixo são relativos a `/kick-off/v1`, considerando o `.env` de exemplo.

| Método | Rota                                                                  | JWT | Finalidade                                                  |
| ------ | --------------------------------------------------------------------- | :-: | ----------------------------------------------------------- |
| GET    | `/health`                                                             | Não | Consultar o estado da aplicação                             |
| GET    | `/health/version`                                                     | Não | Consultar nome e versão                                     |
| POST   | `/auth/register`                                                      | Não | Cadastrar um usuário                                        |
| POST   | `/auth/login`                                                         | Não | Autenticar um usuário                                       |
| GET    | `/user/get-infos/:identifier`                                         | Sim | Consultar um perfil                                         |
| PUT    | `/user/update-info/:identifier`                                       | Sim | Atualizar um perfil                                         |
| DELETE | `/user/delete-infos/:identifier`                                      | Sim | Excluir um perfil                                           |
| POST   | `/requirement/register`                                               | Sim | Cadastrar uma demanda; recebe o UUID no header `identifier` |
| POST   | `/requirement/get-infos`                                              | Sim | Consultar demandas a partir de um array de UUIDs no corpo   |
| GET    | `/requirement/active-requirements`                                    | Sim | Consultar demandas pelo header `typeOfRequirement`          |
| POST   | `/requirement/link-requirement-to-customer`                           | Sim | Solicitar vínculo com uma demanda                           |
| POST   | `/requirement/assess-customer-interaction`                            | Sim | Avaliar uma interação                                       |
| PUT    | `/requirement/update-info/requirement/:identifier`                    | Sim | Atualizar uma demanda                                       |
| DELETE | `/requirement/delete-infos/requirement/:requirement/startup/:startup` | Sim | Excluir uma demanda vinculada à startup                     |

Os campos e as validações dos corpos das requisições estão em `src/validators/`. Os tipos de usuário aceitos pelo serviço são `startup`, `investor` e `developer`; o cadastro de startup também valida o CNPJ.

### Postman and data model

- [Coleção do Postman](documentation/Kick-Off.postman_collection.json): importe o JSON, confira a URL base e substitua os dados de exemplo, identificadores e tokens pelos do seu ambiente.
- [Diagrama do banco](documentation/Database.drawio): abra no diagrams.net ou em um editor compatível com Draw.io.

<a id="project-structure"></a>

## 🗂️ Project structure

| Diretório | Responsabilidade |
| --- | --- |
| `src/controllers/` | Rotas HTTP e recebimento de requisições |
| `src/services/` | Regras de negócio, autenticação e notificações |
| `src/repository/` | Operações de persistência no Firestore |
| `src/database/` | Inicialização do Firebase e do Firestore |
| `src/modules/` | Composição de dependências e aplicação do middleware JWT |
| `src/middlewares/` | Validação do token nas rotas protegidas |
| `src/validators/` | Classes de validação dos dados de entrada |
| `src/interfaces/` | Contratos e tipos do domínio |
| `src/utils/` | Funções auxiliares e tratamento de erros |
| `test/unit/` | Testes de controllers, serviços e utilitários |
| `test/mock/` | Dados de apoio aos testes |
| `documentation/` | Coleção do Postman e diagrama do banco |
| `.github/workflows/` | Automações de integração contínua |

O `src/main.ts` inicia o servidor e define o prefixo das rotas. O `src/app.module.ts` carrega a configuração e reúne os módulos da aplicação.

<a id="testing-and-quality"></a>

## ✅ Testing and quality

| Comando | Finalidade |
| --- | --- |
| `npm test` | Executar os testes com Jest |
| `npm run test:watch` | Executar os testes em modo de observação |
| `npm run test:cov` | Executar os testes e gerar cobertura |
| `npm run test:debug` | Executar os testes com o depurador |
| `npm run lint` | Executar o ESLint com correções automáticas |
| `npm run format` | Formatar os arquivos de código e teste |
| `npm run build` | Compilar a aplicação |
| `npm run start:debug` | Iniciar a aplicação com depuração e observação |

A configuração do Jest exige **100%** de cobertura nas métricas globais, considerando as exclusões definidas em `collectCoverageFrom`. Essa configuração é uma meta de execução, não uma declaração de cobertura já atingida.

> O script `test:e2e` está declarado, mas referencia `test/jest-e2e.json`, arquivo ausente no repositório. É necessário configurar essa suíte antes de utilizar `npm run test:e2e`.

O workflow principal de CI executa instalação, compilação TypeScript, build, testes e lint em pull requests para `main` e em acionamentos manuais.

### Validation recorded

Em 11/11/2026, a instalação foi tentada duas vezes com Node 16.13.2/npm 8.1.2; ambas terminaram com `ECONNRESET` durante acesso ao registro npm. Não houve instalação concluída. `npm run build` e os testes falharam por executáveis locais ausentes (`rimraf` e `jest`), e `start:prod` não encontrou `dist/main`. Nenhuma funcionalidade HTTP ou persistência Firestore foi verificada. As portas temporárias 4202 foram usadas apenas na tentativa; a porta padrão continua 3001. Todos os processos iniciados foram encerrados.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

| Situação | O que verificar |
| --- | --- |
| `404` ao acessar a API | Confira `APPLICATION_PREFIX=kick-off/v1` e use uma rota existente, como `/health`. |
| `403` em uma rota protegida | Envie somente o token no header `Authorization` e confira a chave JWT do ambiente. |
| Falha ao cadastrar ou consultar dados | Confira o projeto configurado em `configuration.database.ts`, a conexão e as permissões do Firestore. |
| Falha ao gerar token | Preencha `SECRET_KEY_TO_JWT_TOKEN` antes de iniciar a aplicação. |
| Porta `3001` ocupada | Encerre o processo que utiliza a porta ou ajuste `PORT` e o mapeamento Docker. |
| Erro de instalação do bcrypt | Confira a versão do Node.js e as ferramentas de compilação exigidas pela dependência no seu sistema. |
| Erro ao executar `test:e2e` | A configuração dessa suíte ainda precisa ser adicionada. |

<a id="contributing"></a>

## 🤝 Contributing

1. Crie uma branch a partir de `main`.
2. Implemente a alteração e ajuste os testes e a documentação relacionados.
3. Execute `npm run build`, `npm test` e `npm run lint`.
4. Revise as alterações automáticas do lint e abra um pull request descrevendo o problema e a solução.

<a id="license"></a>

## 📜 License

Este projeto está sob a **GNU Affero General Public License v3.0**. Consulte o arquivo [LICENSE](LICENSE) para os termos completos.

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
