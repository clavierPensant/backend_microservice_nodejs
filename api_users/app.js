// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./src/routes/userRoute');
const verifyApiKey = require('./middleware/verifyApiKey'); // Importer le middleware


// Chargement des variables d'environnement
dotenv.config();
const {connectDB} = require ("./config/database");

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors()); // Autoriser les requêtes CORS
app.use(express.json()); // Pour parser les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les requêtes URL-encoded

app.use(verifyApiKey);

//connexion à la base de données 
connectDB();

// Routes
const router = express.Router();
userRoute(router);

app.use("/api/users",router);

// Démarrage du serveur
const PORT = process.env.PORT || 3001; // Définir le port
app.listen(PORT, () => {
    console.log(`Serveur en cours sur le port ${PORT}`);
});
