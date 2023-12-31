'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  const {SALT} = require('../config/serverConfig');
  const bcrypt = require('bcrypt');
  User.init({
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail : true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len : [8,30]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate( (user) => {
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPassword;
  });
  
  return User;
};