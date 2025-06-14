<?php
echo '<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Messages des Parents</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .message {
            background-color: #f2f2f2;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h2 {
            color: #333;
        }
        hr {
            border: none;
            border-top: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <h2>Messages Reçus</h2>';

$fichier = "messages.txt";

if (file_exists($fichier)) {
    $contenu = file_get_contents($fichier);
    $messages = explode("---", $contenu);

    if (count($messages) > 1) {
        foreach ($messages as $message) {
            $message = trim($message);
            if (!empty($message)) {
                echo "<div class='message'>";
                echo nl2br(htmlspecialchars($message));
                echo "</div>";
            }
        }
    } else {
        echo "<p>Aucun message pour le moment.</p>";
    }
} else {
    echo "<p>Fichier de messages introuvable.</p>";
}

echo '</body>
</html>';
?>
