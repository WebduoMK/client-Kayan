'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ssn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cellPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Traditional',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      underscore: true,
      timestamps: true,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.account);
    // user account associations
    // user.hasMany(models.account, {
    //   foreignKey: 'user_id',
    //   sourceKey: 'id',
    // });
    // user.belongsToMany(models.account, {
    //   through: models.user_account,
    //   foreignKey: 'user_id',
    // });
  };
  return user;
};
