'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const password_reset_request = sequelize.define(
    'password_reset_request',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resetString: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscore: true,
      timestamps: true,
    }
  );

  return password_reset_request;
};
