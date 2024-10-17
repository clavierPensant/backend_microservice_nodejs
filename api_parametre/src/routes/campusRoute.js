const {
    affichezTousLesCampus,
    affichezUnCampusDonne,
    ajouterUnCampus,
    modifierUnCampus,
    supprimerUnCampus

} = require ("../controllers/Campus");

module.exports=(router)=>{
    router.get("/campus",affichezTousLesCampus);
    router.get("/campus/:id",affichezUnCampusDonne);
    router.post("/campus/create",ajouterUnCampus);
    router.put("/campus/update/:id",modifierUnCampus);
    router.delete("/campus/delete/:id",supprimerUnCampus);
};