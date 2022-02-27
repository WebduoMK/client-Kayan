'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bank: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bankNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      routingNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accountName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roth: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      traditional: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // accountBalance: {
      //   type: Sequelize.JSON,
      //   allowNull: true,
      //   // defaultValue: `{
      //   //   [
      //   //     {"currency": "btc", "amount": 0.04},
      //   //     {"currency": "eth", "amount": 1.23},
      //   //     {"currency": "ada", "amount": 820}
      //   //   ]
      //   // }`,
      //   get: function () {
      //     return JSON.parse(this.getDataValue('accountBalance'));
      //   },
      //   set: function (value) {
      //     this.setDataValue('accountBalance', JSON.stringify(value));
      //   },
      // },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  },
};
