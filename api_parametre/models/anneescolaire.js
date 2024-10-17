'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnneeScolaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnneeScolaire.init({
    id_annee: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle_annee: {
      type: DataTypes.STRING,
      allowNull: false, // empêche la valeur nulle
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'AnneeScolaire',
    tableName: 'annee_scolaire', // Nom de la table dans la base de données
    timestamps: true, // Inclut les champs createdAt et updatedAt


  });
  return AnneeScolaire;
};