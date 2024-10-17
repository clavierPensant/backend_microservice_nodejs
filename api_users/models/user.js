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
  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,  // Clé primaire personnalisée
      },
    nom_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statut_user: {
        type: DataTypes.STRING,
      },
      centres: {
        type: DataTypes.STRING,
      },
      mdp_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Email unique pour chaque utilisateur
      },
      premiere_connexion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,  // Par exemple, 1 pour "première connexion"
      },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};