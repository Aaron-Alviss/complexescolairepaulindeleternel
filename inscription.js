document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formInscription");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nom = document.getElementById("nom").value.trim();
        const dateNaissance = document.getElementById("date_naissance").value;
        const niveau = document.getElementById("niveau").value;

        if (!nom || !dateNaissance || !niveau) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const eleve = { nom, dateNaissance, niveau };
        const inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];
        inscriptions.push(eleve);
        localStorage.setItem("inscriptions", JSON.stringify(inscriptions));

        alert("Inscription réussie pour " + nom + " !");
        form.reset();
    });
});