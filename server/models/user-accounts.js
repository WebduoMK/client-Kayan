'use strict';
const { create } = require('lodash');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const user_account = sequelize.define(
    'user_account',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscore: true,
      timestamps: true,
    }
  );

  user_account.associate = (models) => {
    // user_account.hasOne(models.user, {
    //   foreignKey: 'id',
    //   sourceKey: 'user_id',
    // });
    // user_account.belongsTo(models.user, {
    //   foreignKey: 'user_id',
    // });
    // user_account.hasOne(models.account, {
    //   foreignKey: 'id',
    //   sourceKey: 'account_id',
    // });
    // user_account.belongsTo(models.account, {
    //   foreignKey: 'account_id',
    // });
  };

  return user_account;
};
