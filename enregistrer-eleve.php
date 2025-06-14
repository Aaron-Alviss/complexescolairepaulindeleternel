<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST['nom']);
    $prenom = htmlspecialchars($_POST['prenom']);
    $classe = htmlspecialchars($_POST['classe']);
    $parent = htmlspecialchars($_POST['parent']);
    $telephone = htmlspecialchars($_POST['telephone']);

    $ligne = "Nom: $nom\nPrénom: $prenom\nClasse: $classe\nParent: $parent\nTéléphone: $telephone\n---\n";

    $fichier = fopen("eleves.txt", "a");
    fwrite($fichier, $ligne);
    fclose($fichier);

    echo "<h2>Inscription envoyée avec succès !</h2>";
    echo "<a href='inscription-eleve.html'>Retour au formulaire</a>";
} else {
    echo "Erreur : veuillez remplir le formulaire.";
}
?>
