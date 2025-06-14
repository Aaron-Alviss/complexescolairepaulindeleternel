<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titre = htmlspecialchars($_POST["titre"]);
    $contenu = htmlspecialchars($_POST["contenu"]);
    $date = date("d/m/Y à H:i");

    $message = [
        "titre" => $titre,
        "contenu" => $contenu,
        "date" => $date
    ];

    $fichier = "messages-publies.json";
    $messages = [];

    if (file_exists($fichier)) {
        $messages = json_decode(file_get_contents($fichier), true);
    }

    array_unshift($messages, $message); // Ajoute en haut de la liste
    file_put_contents($fichier, json_encode($messages, JSON_PRETTY_PRINT));

    echo "<h3>Message publié avec succès !</h3>";
    echo "<a href='admin-publier-message.html'>Retour</a>";
}
?>
