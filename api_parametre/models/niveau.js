'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Niveau extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here (ex: Niveau.hasMany(models.Option); )
    }
  }

  Niveau.init(
    {
      id_niveau: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      libelle_niveau: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Niveau',
      tableName: 'niveau', // Nom explicite pour la table
    }
  );

  return Niveau;
};
