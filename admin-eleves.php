<?php
echo '<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscriptions des Élèves</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .eleve {
            background-color: #e8f9e9;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h2 {
            color: #2b542c;
        }
    </style>
</head>
<body>
    <h2>Inscriptions enregistrées</h2>';

$fichier = "eleves.txt";

if (file_exists($fichier)) {
    $contenu = file_get_contents($fichier);
    $eleves = explode("---", $contenu);

    if (count($eleves) > 1) {
        foreach ($eleves as $eleve) {
            $eleve = trim($eleve);
            if (!empty($eleve)) {
                echo "<div class='eleve'>";
                echo nl2br(htmlspecialchars($eleve));
                echo "</div>";
            }
        }
    } else {
        echo "<p>Aucune inscription pour le moment.</p>";
    }
} else {
    echo "<p>Fichier eleves.txt introuvable.</p>";
}

echo '</body>
</html>';
?>
