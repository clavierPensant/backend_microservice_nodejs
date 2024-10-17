const {
    affichezToutesLesOptions,
    affichezUneOptionDonne,
    ajouterUneOption,
    modifierUneOption,
    supprimerUneOption

} = require ("../controllers/Option");

module.exports=(router)=>{
    router.get("/options",affichezToutesLesOptions);
    router.get("/options/:id",affichezUneOptionDonne);
    router.post("/options/create",ajouterUneOption);
    router.put("/options/update/:id",modifierUneOption);
    router.delete("/options/delete/:id",supprimerUneOption);
};