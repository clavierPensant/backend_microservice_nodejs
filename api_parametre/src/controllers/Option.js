const {Option} = require ("../../models");
module.exports={
    async affichezToutesLesOptions(req,res){
        try {
            const option = await Option.findAll();
            res.status(200).json(option);
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    },

    async affichezUneOptionDonne(req,res){
        try {
            const option = await Option.findOne({where : {id_option : req.params.id}});
            if(option){
                res.status(200).json(option);
            }else{
                res.status(404).json("Option non trouvée");
            }
        } catch (error) {
            res.status(500).json(error)
            console.error("Erreur"+error);
        }
    },

    async ajouterUneOption(req, res) {
        try {
            const { code_option, libelle_option, id_filiere } = req.body;

            // Vérification de l'existence d'une option avec le même code ou libellé
            const optionExistante = await Option.findOne({
                where: {
                    [Op.or]: [
                        { code_option },
                        { libelle_option }
                    ]
                }
            });

            if (optionExistante) {
                return res.status(400).json({
                    message: "Une option avec ce code ou ce libellé existe déjà."
                });
            }

            // Création de l'option si aucune n'existe avec les mêmes informations
            const option = await Option.create(req.body);
            res.status(201).json({
                message: "Option ajoutée avec succès",
                option
            });
        } catch (error) {
            if (error.name === "SequelizeForeignKeyConstraintError") {
                res.status(400).json({
                    message: "L'ID de filière fourni n'existe pas. Veuillez vérifier et réessayer.",
                    error: error.message
                });
            } else {
                console.error("Erreur: " + error);
                res.status(500).json({
                    message: "Erreur lors de l'ajout de l'option",
                    error
                });
            }
        }
    },
    async modifierUneOption (req,res){
        try {
            const [updated] = await Option.update(req.body,{where : {id_option : req.params.id}});
            if(updated){
                res.status(200).json("Option modifiée avec succès");
            }
            else{
                res.status(404).json("Option non trouvée donc impossible de modifier");
            }
        } catch (error) {
            if (error.name === "SequelizeForeignKeyConstraintError") {
                res.status(400).json({
                    message: "L'ID de filière fourni n'existe pas. Veuillez vérifier et réessayer.",
                    error: error.message
                });
            } else {
                console.error("Erreur: " + error);
                res.status(500).json({ message: "Erreur lors de la modification de l'option", error });
            }
        }
    },
    async supprimerUneOption (req,res){
        try {
            const deleted = await Option.destroy({where : {id_option : req.params.id}});
            if(deleted){
                res.status(200).json("Option supprimée avec succès");
            }
            else{
                res.status(404).json("Option non trouvée donc pas de suppression");
            }
        } catch (error) {
            res.status(500).json(error);
            console.error("Erreur"+error);
        }
    }
}