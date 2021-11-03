'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Items', [{
      partNumber: '',
      name: 'Strawberry Empanadas',
      description: '',
      costDozen: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      partNumber: '',
      name: 'Pineapple Empanadas',
      description: '',
      costDozen: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      partNumber: '',
      name: 'Nutella Empanadas',
      description: '',
      costDozen: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      partNumber: '',
      name: 'Cajeta Empanadas',
      description: '',
      costDozen: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      partNumber: '',
      name: 'Chocolate Strawberries',
      description: '',
      costDozen: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      partNumber: '',
      name: 'Mini Pound Cake',
      description: '',
      costDozen: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
