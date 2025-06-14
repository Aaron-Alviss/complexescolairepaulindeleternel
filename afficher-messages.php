<?php
$fichier = "messages-publies.json";

echo "<div style='font-family: Arial, sans-serif; padding: 10px;'>";

if (file_exists($fichier)) {
    $messages = json_decode(file_get_contents($fichier), true);

    if (!empty($messages)) {
        foreach ($messages as $msg) {
            echo "<div style='border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; border-radius: 5px;'>";
            echo "<h3>" . htmlspecialchars($msg['titre']) . "</h3>";
            echo "<p>" . nl2br(htmlspecialchars($msg['contenu'])) . "</p>";
            echo "<small style='color: gray;'>Publié le " . $msg['date'] . "</small>";
            echo "</div>";
        }
    } else {
        echo "<p>Aucun message publié pour le moment.</p>";
    }
} else {
    echo "<p>Fichier de messages introuvable.</p>";
}

echo "</div>";
?>
