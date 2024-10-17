const {
    affichezTousFilieres,
    affichezUneFiliereDonne,
    ajouterUneFiliere,
    modifierUneFiliere,
    supprimerUneFiliere

} = require ("../controllers/Filiere");

module.exports=(router)=>{
    router.get("/filieres",affichezTousFilieres);
    router.get("/filieres/:id",affichezUneFiliereDonne);
    router.post("/filieres/create",ajouterUneFiliere);
    router.put("/filieres/update/:id",modifierUneFiliere);
    router.delete("/filieres/delete/:id",supprimerUneFiliere);
};