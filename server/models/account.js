'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define(
    'account',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      routingNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accountName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roth: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      traditional: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // accountBalance: {
      //   type: DataTypes.JSON,
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
      // createdAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      // },
    },
    {
      underscore: true,
      timestamps: true,
    }
  );

  account.associate = (models) => {
    account.belongsTo(models.user);
    // account.hasMany(models.user_account, {
    //   foreignKey: 'user_id',
    //   sourceKey: 'id',
    // });
  };
  return account;
};
