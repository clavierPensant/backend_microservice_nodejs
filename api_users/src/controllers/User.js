const {User} = require ("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


module.exports={
    async login(req, res) {
        const { email_user, mdp_user } = req.body;

        try {
            const user = await User.findOne({ where: { email_user } });

            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            // Vérification du mot de passe
            const match = await bcrypt.compare(mdp_user, user.mdp_user);
            if (!match) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            // Générer un token
            const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: "Connexion réussie",
                token,
                user: {
                    id_user: user.id_user,
                    nom_user: user.nom_user,
                    prenom_user: user.prenom_user,
                    statut_user: user.statut_user,
                    centres: user.centres,
                    email_user: user.email_user,
                }
            });
        } catch (error) {
            console.error("Erreur lors de la connexion", error);
            res.status(500).json({ message: "Erreur lors de la connexion" });
        }
    },
    async affichezTousLesUsers(req,res){
        try {
            const user = await User.findAll();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },

    async affichezUnUserDonne(req,res){
        try {
            const user = await User.findOne({where : {id_user : req.params.id}});
            if(user){
                res.status(200).json(user);
            }else{
                res.status(404).json("Utilisateur non trouvé");
            }
        } catch (error) {
            res.status(500).json(error)
            console.error("Erreur"+error);
        }
    },

async ajouterUnUser(req, res) {
        try {
            const { nom_user, prenom_user, statut_user, centres, email_user, mdp_user } = req.body;

            // Vérification si un utilisateur avec cet email existe déjà
            const UserExistant = await User.findOne({ where: { email_user } });

            if (UserExistant) {
                return res.status(400).json({
                    message: "Un utilisateur avec cet email existe déjà.",
                });
            }

            // Hash du mot de passe
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(mdp_user, saltRounds);

            // Création de l'utilisateur avec le mot de passe hashé et premiere_connexion à 0 par défaut
            const user = await User.create({
                nom_user,
                prenom_user,
                statut_user,
                centres,
                email_user,
                mdp_user: hashedPassword,
                premiere_connexion: 0, // Valeur par défaut
            });

            res.status(201).json({
                message: "Utilisateur ajouté avec succès",
                user,
            });
        } catch (error) {
            console.error("Erreur: ", error);
            res.status(500).json({
                message: "Erreur lors de l'ajout de l'utilisateur",
                error,
            });
        }
    },
    async modifierUnUser(req, res) {
        try {
            // Récupérer tous les champs du corps de la requête
            const { nom_user, prenom_user, statut_user, centres, mdp_user } = req.body;

            // Préparer un objet avec les données à mettre à jour
            const updatedData = {
                nom_user,
                prenom_user,
                statut_user,
                centres,
                // Si le mot de passe est fourni, il peut être hashé ici
                ...(mdp_user && { mdp_user: await bcrypt.hash(mdp_user, 10) }) // Hash le mdp_user si présent
            };

            const [updated] = await User.update(updatedData, {
                where: { id_user: req.params.id }
            });

            if (updated) {
                res.status(200).json("Utilisateur modifié avec succès");
            } else {
                res.status(404).json("Utilisateur non trouvé donc impossible de modifier");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur" + error);
        }
    },
    async supprimerUnUser (req,res){
        try {
            const deleted = await User.destroy({where : {id_user : req.params.id}});
            if(deleted){
                res.status(200).json("Utilisateur supprimé avec succès");
            }
            else{
                res.status(404).json("Utilisateur non trouvé donc pas de suppression");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    }
}