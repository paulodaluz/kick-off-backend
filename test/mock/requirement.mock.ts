export default {
  userStartup: {
    uuid: "10611d0d-93d3-414f-8a39-af350f54315f",
    email: "test@email.com",
    name: "Carlos Gas",
    managingPartners: "Paulo da Luz e Leonardo",
    numberOfWorkers: 33,
    typeOfUser: "startup",
    phoneNumber: "(54) 99108-3039",
    cnpj: "98.828.768/0001-52",
    developerRequirements: ['9114197b-dbac-42bf-9a9c-a7f197d0e360'],
    investmentRequirements: ['9114197b-dbac-42bf-9a9c-a7f197d0e361'],
  },
  developerRequirement: {
    uuid: '9114197b-dbac-42bf-9a9c-a7f197d0e360',
    description: 'Desenvolver um aplicativo mobile com firebase',
    languagesOfDevelop: 'NodeJS e React Native',
    payment: 5000,
    typeOfRequirement: 'development',
    status: 'opened'
  },
  inevestmentRequirement: {
    uuid: '9114197b-dbac-42bf-9a9c-a7f197d0e361',
    description: 'Dinheiro para comprar Macs',
    requiredMoney: 10000,
    obtainedMoney: 0,
    status: 'opened',
    partnerParticipation: '5,2%',
    typeOfRequirement: 'investment',
    creationDate: 'Fri Feb 21 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)'
  },
  inevestmentRequirementWithInvest: {
    uuid: '9114197b-dbac-42bf-9a9c-a7f197d0e361',
    description: 'Dinheiro para comprar Macs',
    requiredMoney: 10000,
    obtainedMoney: 9000,
    status: 'opened',
    partnerParticipation: '5,2%',
    typeOfRequirement: 'investment',
    creationDate: 'Fri Feb 23 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)'
  },
  inevestmentRequirementTwo: {
    uuid: '9114197b-dbac-42bf-9a9c-a7f197d0e361',
    description: 'Dinheiro para comprar Macs',
    requiredMoney: 10000,
    obtainedMoney: 0,
    status: 'opened',
    partnerParticipation: '5,2%',
    typeOfRequirement: 'investment',
    creationDate: 'Fri Feb 25 2022 00:05:07 GMT-0300 (Horário Padrão de Brasília)'
  },
}
