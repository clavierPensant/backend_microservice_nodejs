'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Option.belongsTo(models.Filiere, {
        foreignKey: 'id_filiere',
        as: 'filiere',
      });
    }
  }
  Option.init(
    {
      id_option: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code_option: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      libelle_option: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      id_filiere: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'filiere',
          key: 'id_filiere',
        },
        onDelete: 'CASCADE', // Supprime les options associées si la filière est supprimée
      },
    }, {
    sequelize,
    modelName: 'Option',
    tableName: 'option',
  });
  return Option;
};