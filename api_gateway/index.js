const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de sécurité
app.use(helmet());

// Middleware CORS
app.use(cors());

// Middleware pour parser le JSON


// Middleware de logging
app.use(morgan("combined"));

// Middleware pour gérer les données de formulaire

// Middleware de limitation de taux (Rate Limiting)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre
    message: "Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard."
});
app.use(limiter);

// Middleware d'authentification JWT
const authenticate = (req, res, next) => {
    // Routes publiques ne nécessitent pas d'authentification
    if (req.path.startsWith("/api/users/auth")) {
        return next();
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Token invalide." });
    }
};

app.use(authenticate);

// Configuration des services backend
const services = {
    users: {
        url: "http://localhost:3001/api/users", // Service Users incluant l'authentification
    },
    parametres: {
        url: "http://localhost:3000/api/parametres",
    },
    inscription: {
        url: "http://localhost:7000/api/inscription",
    },
};

// Fonction de filtrage des en-têtes pertinents (y compris Authorization si présent)
const filterHeaders = (headers) => {
    const allowedHeaders = ['authorization', 'content-type', 'accept'];
    const filteredHeaders = {};

    for (const key in headers) {
        if (allowedHeaders.includes(key.toLowerCase())) {
            filteredHeaders[key] = headers[key];
        }
    }
    return filteredHeaders;
};

// Fonction de routage dynamique avec clé API interne
const routeRequest = (serviceName) => async (req, res) => {
    try {
        const service = services[serviceName];
        if (!service) {
            return res.status(502).json({ message: "Service non trouvé." });
        }

        // Récupérer les en-têtes filtrés (y compris Authorization si fourni)
        const filteredHeaders = filterHeaders(req.headers);

        // Construire les options de la requête
        const requestOptions = {
            method: req.method,
            url: `${service.url}${req.url}`, // Inclure le chemin complet
            headers: {
                ...filteredHeaders, // Intégrer uniquement les en-têtes filtrés
                'x-internal-api-key': process.env.INTERNAL_API_KEY, // Clé API interne
            },
            params: req.query, // Paramètres de requête
            data: req.body, // Corps de la requête pour POST/PUT
        };

        // Logs des options de requête et du corps de la requête
        console.log('Request Options:', JSON.stringify(requestOptions, null, 2));
        console.log('Request Body:', req.body);

        // Envoyer la requête au service cible
        const response = await axios(requestOptions);

        // Retourner la réponse du service au client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error Details:', error); // Log de l'erreur

        if (error.response) {
            // Si une réponse est reçue avec une erreur
            res.status(error.response.status).json(error.response.data);
        } else {
            // Si une erreur de communication survient
            res.status(500).json({ message: "Erreur du service", error: error.message });
        }
    }
};


// Routes publiques d'authentification
app.use("/api/users", routeRequest("users"));
app.use("/api/parametres", routeRequest("parametres"));
app.use("/api/inscription", routeRequest("inscription"));

// Route de test
app.get("/", (req, res) => {
    res.send("API Gateway Fonctionne !");
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`API Gateway en cours d'exécution sur le port ${PORT}`);
});
