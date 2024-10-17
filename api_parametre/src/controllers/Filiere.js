const {Filiere} = require ("../../models");
module.exports={
    async affichezTousFilieres(req,res){
        try {
            const filiere = await Filiere.findAll();
            res.status(200).json(filiere);
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },

    async affichezUneFiliereDonne(req,res){
        try {
            const filiere = await Filiere.findOne({where : {id_filiere : req.params.id}});
            if(filiere){
                res.status(200).json(filiere);
            }else{
                res.status(404).json("Filière non trouvée");
            }
        } catch (error) {
            res.status(500).json(error)
            console.error("Erreur"+error);
        }
    },

    async ajouterUneFiliere(req, res) {
        try {
            const { code_filiere, libelle_filiere } = req.body;

            // Vérification de l'existence d'une filière avec le même code_filiere et libelle_filiere
            const filiereExistante = await Filiere.findOne({
                where: { 
                    code_filiere, 
                    libelle_filiere 
                },
            });

            if (filiereExistante) {
                return res.status(400).json({ 
                    message: "Cette filière avec le même code et libellé existe déjà." 
                });
            }

            // Création de la nouvelle filière si elle n'existe pas
            const filiere = await Filiere.create(req.body);
            res.status(201).json({ 
                message: "Filière ajoutée avec succès", 
                filiere 
            });
        } catch (error) {
            console.error("Erreur: ", error);
            res.status(500).json({ 
                message: "Erreur lors de l'ajout de la filière", 
                error 
            });
        }
    },
    async modifierUneFiliere (req,res){
        try {
            const [updated] = await Filiere.update(req.body,{where : {id_filiere : req.params.id}});
            if(updated){
                res.status(200).json("Filière modifiée avec succès");
            }
            else{
                res.status(404).json("Filière non trouvée donc impossible de modifier");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },
    async supprimerUneFiliere (req,res){
        try {
            const deleted = await Filiere.destroy({where : {id_filiere : req.params.id}});
            if(deleted){
                res.status(200).json("Filière supprimée avec succès");
            }
            else{
                res.status(404).json("Filière non trouvée donc pas de suppression");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    }
}