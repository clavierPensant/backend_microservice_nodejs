const {
    affichezTousLesUsers,
    affichezUnUserDonne,
    ajouterUnUser,
    modifierUnUser,
    supprimerUnUser,
    login

} = require ("../controllers/User");

module.exports=(router)=>{
    router.get("/",affichezTousLesUsers);
    router.get("/:id",affichezUnUserDonne);
    router.post("/create",ajouterUnUser);
    router.post("/auth",login);
    router.put("/update/:id",modifierUnUser);
    router.delete("/delete/:id",supprimerUnUser);
};