<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $nom = $_POST['nom'];
    $date_naissance = $_POST['date_naissance'];
    $niveau = $_POST['niveau'];

    // Vous pouvez maintenant utiliser ces données comme vous le souhaitez.
    // Par exemple, vous pouvez les afficher ou les enregistrer dans une base de données.

    echo "<h2>Informations soumises :</h2>";
    echo "<p><strong>Nom de l'élève :</strong> " . htmlspecialchars($nom) . "</p>";
    echo "<p><strong>Date de naissance :</strong> " . htmlspecialchars($date_naissance) . "</p>";
    echo "<p><strong>Niveau d'enseignement :</strong> " . htmlspecialchars($niveau) . "</p>";
}
?>
