// middleware/verifyApiKey.js

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-internal-api-key']; // Récupérer la clé API depuis l'en-tête

    if (!apiKey) {
        return res.status(401).json({ message: "Clé API interne manquante." });
    }

    if (apiKey !== process.env.INTERNAL_API_KEY) {
        return res.status(403).json({ message: "Clé API interne invalide." });
    }

    next(); // Continuer vers la route suivante si la clé est valide
};

module.exports = verifyApiKey;
