document.addEventListener("DOMContentLoaded", function() {

    
    // PLANNING
    let planningBtn = document.getElementById("planningBtn");
    let planningForm = document.getElementById("planningFormDiv");
    let planningAddBtn = document.getElementById("planningAddBtn");
    let planningCloseBtn = document.getElementById("planningCloseBtn");
    
    
    planningBtn.addEventListener("click", function () {
        planningForm.style.display = "flex";
    });
    
    
    planningCloseBtn.addEventListener("click", function () {
        planningForm.style.display = "none";
})



// FILMS
let filmsBtn = document.getElementById("filmsBtn");
let filmsForm = document.getElementById("filmsFormDiv");
let filmsAddBtn = document.getElementById("filmsAddBtn");
let filmsCloesBtn = document.getElementById("filmsCloseBtn");


filmsBtn.addEventListener("click", function () {
    filmsForm.style.display = "flex";
});


filmsCloesBtn.addEventListener("click", function () {
    filmsForm.style.display="none";
})




// SALLES
let sallesBtn = document.getElementById("sallesBtn");
let sallesForm = document.getElementById("sallesFormDiv");
let sallesAddBtn = document.getElementById("sallesAddBtn");
let sallesCloseBtn = document.getElementById("sallesCloseBtn");

sallesBtn.addEventListener("click", function () {
    sallesForm.style.display = "flex";
});


sallesCloseBtn.addEventListener("click", function () {
    sallesForm.style.display="none";
})




})