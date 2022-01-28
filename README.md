![Screenshot_1](https://user-images.githubusercontent.com/47355769/151414315-fe3bf42a-dc70-438a-8df8-3b73ae6449b8.jpg)

# KickOffBackend
A NodeJS backend application for investors to find and register startups.

## 🧪 Tecnologias
As principais tecnologias utilizadas foram:
- [NodeJS](https://nodejs.org/en/)
- [NestJS](https://docs.nestjs.com/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Firebase](https://firebase.google.com/docs)


## 🛠️ Configurando o ambiente
 - Use a versão 16.13.2 do nodeJS
 - Clone o repositório
 - Instale as dependências com `npm install` ou `yarn install`


## 🚀 Getting started
Para startar o projeto você pode digitar o comando `npm run start:dev` ou `yarn start:dev` no diretório do projeto.

Após isso ele irá abrir na porta `3001` no seu localhost, ou seja, basta apenas entrar em `localhost:3001/kick-off/{ROTA_DESEJADA}`.


## 🐋 Getting started with Docker
Para buildar o projeto você pode digitar o comando ` docker build -t backend/kickoff .` no diretório do projeto. Para inciar o container basta executar o comando `docker run -p 3001:3001 -d backend/kickoff`.

Após isso ele irá executar um container docker na porta `3001` no seu localhost, ou seja, basta apenas entrar em `localhost:3001/kick-off/{ROTA_DESEJADA}`.


## 📜 Licença
Esse projeto está sob a licença GNU Affero General Public License v3.0. Veja o arquivo [LICENSE](https://github.com/paulodaluz/kick-off-backend/blob/main/LICENSE) para mais detalhes.

---

<p align="center">Made with 💜 by Paulo da Luz</p>
