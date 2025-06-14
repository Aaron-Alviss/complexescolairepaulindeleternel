 // Filtrage dynamique du tableau
 document.getElementById("searchInput").addEventListener("keyup", function () {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#teacherTable tbody tr");
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

// Suppression d'un enseignant
document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function () {
        if (confirm("Voulez-vous vraiment supprimer cet enseignant ?")) {
            this.closest("tr").remove();
        }
    });
});