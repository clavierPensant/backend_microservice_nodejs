// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const campusRoute = require("./src/routes/campusRoute");
const anneeScolaireRoute = require("./src/routes/anneeScolaireRoute");
const filieresRoute = require("./src/routes/filiereRoute");
const optionsRoute = require("./src/routes/optionRoute");
const niveauRoute =require ("./src/routes/niveauRoute");
const verifyApiKey = require ("./middleware/verifyApiKey");
// Chargement des variables d'environnement
dotenv.config();
const {connectDB} = require ("./config/database");

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors()); // Autoriser les requêtes CORS
app.use(express.json()); // Pour parser les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les requêtes URL-encoded

//connexion à la base de données 
connectDB();

app.use(verifyApiKey);

// Routes
const router = express.Router();
campusRoute(router);
anneeScolaireRoute(router);
filieresRoute(router);
optionsRoute(router);
niveauRoute(router);
app.use("/api/parametre",router)

// Démarrage du serveur
const PORT = process.env.PORT || 3000; // Définir le port
app.listen(PORT, () => {
    console.log(`Serveur en cours sur le port ${PORT}`);
});
