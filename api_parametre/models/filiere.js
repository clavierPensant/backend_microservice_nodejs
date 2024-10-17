'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filiere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Filiere.associate = (models) => {
        Filiere.hasMany(models.Option, {
          foreignKey: 'id_filiere',
          as: 'options',
        });
      };
    }
  }
  Filiere.init(
    {
      id_filiere: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code_filiere: DataTypes.STRING,
      libelle_filiere: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'Filiere',
    tableName: 'filiere',

  });
  return Filiere;
};