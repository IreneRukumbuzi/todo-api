module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    name: 'Umutekano',
    email: 'umutekano21@gmail.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
