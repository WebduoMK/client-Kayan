'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'ognent@gmail.com',
        firstName: 'Ognen',
        lastName: 'Todorovski',
        password:
          '$2a$10$DimL8YpjPZ/NpqdbP1XZh.ToGoo8bdV6PrpmnaC1Ewtorssj7bJpC',
        address: 'Anastas Mitrev 27',
        ssn: '123123123',
        dob: '2022-02-14 16:59:57',
        cellPhone: '078237825',
      },
      // {
      //   firstName: 'Asd',
      //   lastName: 'Dsa',
      //   email: 'dsadas@gmail.com',
      //   password: 'dsadsa',
      //   address: 'Asd dsa br 18',
      // },
      // {
      //   firstName: 'Random',
      //   lastName: 'last name',
      //   email: 'random@gmail.com',
      //   password: 'asdasd',
      //   address: 'bcas asd br 24',
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
