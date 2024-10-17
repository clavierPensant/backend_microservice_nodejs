const {Campus} = require ("../../models");
module.exports={
    async affichezTousLesCampus(req,res){
        try {
            const campus = await Campus.findAll();
            res.status(200).json(campus);
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },

    async affichezUnCampusDonne(req,res){
        try {
            const campus = await Campus.findOne({where : {id_campus : req.params.id}});
            if(campus){
                res.status(200).json(campus);
            }else{
                res.status(404).json("Campus non trouvé");
            }
        } catch (error) {
            res.status(500).json(error)
            console.error("Erreur"+error);
        }
    },

    async ajouterUnCampus(req, res) {
        try {
            const { nom_campus } = req.body;

            // Vérification de l'existence d'un campus avec le même nom
            const campusExistant = await Campus.findOne({
                where: { nom_campus }
            });

            if (campusExistant) {
                return res.status(400).json({
                    message: "Un campus avec ce nom existe déjà."
                });
            }

            // Si aucun campus similaire n'existe, on procède à l'ajout
            const campus = await Campus.create(req.body);
            res.status(201).json({
                message: "Campus ajouté avec succès",
                campus
            });
        } catch (error) {
            console.error("Erreur: ", error);
            res.status(500).json({
                message: "Erreur lors de l'ajout du campus",
                error
            });
        }
    },
    async modifierUnCampus (req,res){
        try {
            const [updated] = await Campus.update(req.body,{where : {id_campus : req.params.id}});
            if(updated){
                res.status(200).json("Campus modifié avec succès");
            }
            else{
                res.status(404).json("Campus non trouvé donc impossible de modifier");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },
    async supprimerUnCampus (req,res){
        try {
            const deleted = await Campus.destroy({where : {id_campus : req.params.id}});
            if(deleted){
                res.status(200).json("Campus supprimé avec succès");
            }
            else{
                res.status(404).json("Campus non trouvé donc pas de suppression");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    }
}