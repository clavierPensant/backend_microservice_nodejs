const {
    affichezTousAnneeScolaire,
    affichezUneAnneeScolaireDonne,
    ajouterUneAnneeScolaire,
    modifierUneAnneeScolaire,
    supprimerUneAnneeScolaire

} = require ("../controllers/AnneeScolaire");

module.exports=(router)=>{
    router.get("/annee_scolaire",affichezTousAnneeScolaire);
    router.get("/annee_scolaire/:id",affichezUneAnneeScolaireDonne);
    router.post("/annee_scolaire/create",ajouterUneAnneeScolaire);
    router.put("/annee_scolaire/update/:id",modifierUneAnneeScolaire);
    router.delete("/annee_scolaire/delete/:id",supprimerUneAnneeScolaire);
};