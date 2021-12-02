'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Guest',
      lastName: 'guestLogin',
      email: 'guest@apple.com',
      username: 'guestperson',
      phoneNumber: '123',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "ronnyb378",
      email: "ronny@google.com",
      password: "$2b$10$Hmh433jczmP06q8hkasKleqo4P/Y5B.LT/uDdDOLAUKoxGLf1KAtG",
      firstName: "ronny",
      lastName: "barahona",
      phoneNumber: "1234567890",
      updatedAt: "2021-12-01T22:48:28.428Z",
      createdAt: "2021-12-01T22:48:28.428Z"
    }
    ], {});
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
