const { Sequelize } = require ("sequelize");
require ("dotenv").config();

const sequelize = new Sequelize (process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host : process.env.DB_HOST,
    dialect : "mysql",
    port :process.env.DB_PORT,
    logging:false
})

const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connexion a la base de données avec succès");
    } catch (error) {
        console.error ("Impossible de se connecter a la base de données",error);
    }
};

module.exports = {sequelize, connectDB};