'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.STRING
      },
      cartArray: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING,
        refecences: {
          model: 'Users',
          key: 'firstName'
        }
      },
      lastName: {
        type: Sequelize.STRING,
        refecences: {
          model: 'Users',
          key: 'lastName'
        }
      },
      email: {
        type: Sequelize.STRING,
        refecences: {
          model: 'Users',
          key: 'email'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};