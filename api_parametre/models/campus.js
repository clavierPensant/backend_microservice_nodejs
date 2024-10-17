'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
   Campus.init({
    id_campus: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom_campus: {
      type: DataTypes.STRING,
      allowNull: false, // empêche la valeur nulle
      validate: {
        notEmpty: true,
        len: [3, 255], // Exemple: entre 3 et 255 caractères
      },
    },
  }, {
    sequelize,
    modelName: 'Campus',
    tableName: 'campus',
  });
  return Campus;
};