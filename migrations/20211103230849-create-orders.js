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
      cart: {
        type: Sequelize.JSON
      },
      cartValues: {
        type: Sequelize.JSON
      },
      UserId: {
        allowNull:false,
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
      phoneNumber: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        refecences: {
          model: 'Users',
          key: 'email'
        }
      },
      completed: {
        type: Sequelize.BOOLEAN
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