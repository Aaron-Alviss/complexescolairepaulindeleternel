<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST['nom']);
    $cours = htmlspecialchars($_POST['cours']);
    $q1 = htmlspecialchars($_POST['q1']);
    $q2 = htmlspecialchars($_POST['q2']);
    $date = date("d/m/Y H:i");

    $contenu = "Nom: $nom\nCours: $cours\nRéponses:\n1: $q1\n2: $q2\nDate: $date\n---\n";

    // Sauvegarde dans un fichier
    file_put_contents("reponses_examens.txt", $contenu, FILE_APPEND);

    echo "<h2>Merci $nom !</h2>";
    echo "<p>Votre examen de $cours a été soumis avec succès.</p>";
    echo "<a href='examen.html'>Retour</a>";
} else {
    echo "Erreur : formulaire non soumis correctement.";
}
?>
