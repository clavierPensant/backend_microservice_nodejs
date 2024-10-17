const {
    affichezTousLesNiveaux,
    affichezUnNiveauDonne,
    ajouterUnNiveau,
    modifierUnNiveau,
    supprimerUnNiveau

} = require ("../controllers/Niveau");

module.exports=(router)=>{
    router.get("/niveaux",affichezTousLesNiveaux);
    router.get("/niveaux/:id",affichezUnNiveauDonne);
    router.post("/niveaux/create",ajouterUnNiveau);
    router.put("/niveaux/update/:id",modifierUnNiveau);
    router.delete("/niveaux/delete/:id",supprimerUnNiveau);
};