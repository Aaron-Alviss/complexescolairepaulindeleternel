<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST['nom']);
    $message = htmlspecialchars($_POST['message']);

    // Sauvegarder dans un fichier texte
    $fichier = fopen("messages.txt", "a");
    fwrite($fichier, "Nom: $nom\nMessage: $message\n---\n");
    fclose($fichier);

    // Page de confirmation simple
    echo "<!DOCTYPE html>
    <html lang='fr'>
    <head>
        <meta charset='UTF-8'>
        <title>Confirmation</title>
        <link rel='stylesheet' href='styles.css'>
    </head>
    <body>
        <h2>Merci $nom, votre message a bien été envoyé !</h2>
        <a href='contact.html'>Retour au formulaire</a>
    </body>
    </html>";
} else {
    echo "Erreur : veuillez envoyer le formulaire.";
}
?>
