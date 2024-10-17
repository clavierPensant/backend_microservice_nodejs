const {AnneeScolaire} = require ("../../models");
module.exports={
    async affichezTousAnneeScolaire(req,res){
        try {
            const annee_scolaire = await AnneeScolaire.findAll();
            res.status(200).json(annee_scolaire);
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },

    async affichezUneAnneeScolaireDonne(req,res){
        try {
            const annee_scolaire = await AnneeScolaire.findOne({where : {id_annee : req.params.id}});
            if(annee_scolaire){
                res.status(200).json(annee_scolaire);
            }else{
                res.status(404).json("Année scolaire non trouvé");
            }
        } catch (error) {
            res.status(500).json(error)
            console.error("Erreur"+error);
        }
    },

    async ajouterUneAnneeScolaire(req, res) {
        try {
            const { libelle_annee } = req.body;

            // Vérification de l'existence d'une année scolaire avec le même libellé
            const anneeExistante = await AnneeScolaire.findOne({
                where: { libelle_annee }
            });

            if (anneeExistante) {
                return res.status(400).json({
                    message: "Une année scolaire avec ce libellé existe déjà."
                });
            }

            // Si aucune année scolaire similaire n'existe, on procède à l'ajout
            const annee_scolaire = await AnneeScolaire.create(req.body);
            res.status(201).json({
                message: "Année scolaire ajoutée avec succès",
                annee_scolaire
            });
        } catch (error) {
            console.error("Erreur: ", error);
            res.status(500).json({
                message: "Erreur lors de l'ajout de l'année scolaire",
                error
            });
        }
    },
    async modifierUneAnneeScolaire (req,res){
        try {
            const [updated] = await AnneeScolaire.update(req.body,{where : {id_annee : req.params.id}});
            if(updated){
                res.status(200).json("Année scolaire modifié avec succès");
            }
            else{
                res.status(404).json("Année scolaire non trouvé donc impossible de modifier");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },
    async supprimerUneAnneeScolaire (req,res){
        try {
            const deleted = await AnneeScolaire.destroy({where : {id_annee : req.params.id}});
            if(deleted){
                res.status(200).json("Année scolaire supprimé avec succès");
            }
            else{
                res.status(404).json("Année scolaire non trouvé donc pas de suppression");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    }
}