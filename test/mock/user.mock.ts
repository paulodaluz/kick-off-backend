/* eslint-disable max-len */
export default {
  userToCreateStartup: {
    "email": "test@email.com",
    "name": "Carlos Gas",
    "managingPartners": "Paulo da Luz e Leonardo",
    "numberOfWorkers": 33,
    "typeOfUser": "startup",
    "phoneNumber": "(54) 99108-3039",
    "cnpj": "98.828.768/0001-52",
    "password": "senha123"
  },
  userToCreateInvestor: {
    "email": "test@email.com",
    "name": "Carlos",
    "typeOfUser": "investor",
    "phoneNumber": "(54) 99108-3039",
    "password": "senha123"
  },
  userToCreateDeveloper: {
    "email": "test@email.com",
    "name": "Carlos",
    "typeOfUser": "developer",
    "phoneNumber": "(54) 99108-3039",
    "password": "senha123"
  },
  userToCreateIncorrectType: {
    "email": "test@email.com",
    "name": "Carlos",
    "typeOfUser": "xxx",
    "phoneNumber": "(54) 99108-3039",
    "password": "senha123"
  },
  userStartupCreated: {
    "uuid": "10611d0d-93d3-414f-8a39-af350f54315f",
    "email": "test@email.com",
    "name": "Carlos Gas",
    "managingPartners": "Paulo da Luz e Leonardo",
    "numberOfWorkers": 33,
    "typeOfUser": "startup",
    "phoneNumber": "(54) 99108-3039",
    "cnpj": "98.828.768/0001-52",
    "password": "senha123",
    "investmentRequirements": [],
    "developerRequirements": []
  },
  userStartupCreatedResponse: {
    "uuid": "10611d0d-93d3-414f-8a39-af350f54315f",
    "email": "test@email.com",
    "name": "Carlos Gas",
    "managingPartners": "Paulo da Luz e Leonardo",
    "numberOfWorkers": 33,
    "typeOfUser": "startup",
    "phoneNumber": "(54) 99108-3039",
    "cnpj": "98.828.768/0001-52",
    "investmentRequirements": [],
    "developerRequirements": []
  },
  token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMTA2MTFkMGQtOTNkMy00MTRmLThhMzktYWYzNTBmNTQzMTVmIiwiZW1haWwiOiJwYXVsby5kYWx1empyQGdtYWlsLmNvbSIsImlhdCI6MTY0NTE5MjUzM30.Tep3RILK2u9mkxF3-M2T9duZmCQYLIo_KDV0OTd6lknM4uirnTp3nQ3-8ad5RjFwOhJNq-SY12BrCLFJOVYl2g',
  completeUserStartup: {
    "typeOfUser": "startup",
    "managingPartners": "Paulo da Luz e Leonardo",
    "investmentRequirements": [
      "7ecc6794-5014-40d1-8388-6b43cf69dfdd",
      "fe0aa28d-e230-4d53-95d4-7fe5c0c7f65c"
    ],
    "developerRequirements": [
      "9114197b-dbac-42bf-9a9c-a7f197d0e360",
    ],
    "numberOfWorkers": 33,
    "phoneNumber": "(54) 99108-3039",
    "cnpj": "98.828.768/0001-52",
    "uuid": "10611d0d-93d3-414f-8a39-af350f54315f",
    "name": "Startup Name",
    "email": "email@gmail.com",
    "description": "A good startup"
  },
  devRequirement: {
    uuid: "9114197b-dbac-42bf-9a9c-a7f197d0e360",
    typeOfRequirement: "development",
    languagesOfDevelop: "NodeJS e React Native",
    payment: 5000,
    description: "Desenvolver um aplicativo mobile com firebase",
    creationDate: 'Fri Feb 21 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)'
  },
  investRequirementOne: {
    obtainedMoney: 40000,
    typeOfRequirement: "investment",
    uuid: "8d0da819-ec17-4ef1-a2ab-863cfd06c485",
    description: "Pagar desenvolvedores",
    partnerParticipation: '5,2%',
    requiredMoney: 60000,
    creationDate: 'Fri Feb 22 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)'
  },
  investRequirementTwo: {
    typeOfRequirement: "investment",
    description: "A Seed Smart disponibiliza diagnóstico, monitoramento e gestão remota aos produtores do campo. O foco são pequenos e médios produtores que buscam uma solução para auxiliar na gestão e controle da sua produção com melhoria de processos e redução de custos.",
    requiredMoney: 60000,
    obtainedMoney: 5000,
    uuid: "7ecc6794-5014-40d1-8388-6b43cf69dfdd",
    partnerParticipation: '5,2%',
    creationDate: 'Fri Feb 23 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)'
}
}
