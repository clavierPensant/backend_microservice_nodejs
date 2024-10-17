const {Niveau} = require ("../../models");
module.exports={
    async affichezTousLesNiveaux(req,res){
        try {
            const niveau = await Niveau.findAll();
            res.status(200).json(niveau);
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },

    async affichezUnNiveauDonne(req,res){
        try {
            const niveau = await Niveau.findOne({where : {id_niveau : req.params.id}});
            if(niveau){
                res.status(200).json(niveau);
            }else{
                res.status(404).json("Niveau non trouvé");
            }
        } catch (error) {
            res.status(500).json(error)
            console.error("Erreur"+error);
        }
    },

    async ajouterUnNiveau(req, res) {
        try {
            const { libelle_niveau } = req.body;

            // Vérification de l'existence d'un niveau avec le même libellé
            const niveauExistant = await Niveau.findOne({
                where: { libelle_niveau }
            });

            if (niveauExistant) {
                return res.status(400).json({
                    message: "Un niveau avec ce libellé existe déjà."
                });
            }

            // Si aucun niveau similaire n'existe, on procède à l'ajout
            const niveau = await Niveau.create(req.body);
            res.status(201).json({
                message: "Niveau ajouté avec succès",
                niveau
            });
        } catch (error) {
            console.error("Erreur: ", error);
            res.status(500).json({
                message: "Erreur lors de l'ajout du niveau",
                error
            });
        }
    },
    async modifierUnNiveau (req,res){
        try {
            const [updated] = await Niveau.update(req.body,{where : {id_niveau : req.params.id}});
            if(updated){
                res.status(200).json("Niveau modifié avec succès");
            }
            else{
                res.status(404).json("Niveau non trouvé donc impossible de modifier");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },
    async supprimerUnNiveau (req,res){
        try {
            const deleted = await Niveau.destroy({where : {id_niveau : req.params.id}});
            if(deleted){
                res.status(200).json("Niveau supprimé avec succès");
            }
            else{
                res.status(404).json("Niveau non trouvé donc pas de suppression");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    }
}