<?php
session_start();

// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=ecole', 'root', '');

// ===================== Vérification de Connexion =====================
if (strpos($_SERVER['REQUEST_URI'], 'admin') !== false && !isset($_SESSION['admin'])) {
    echo "<script>alert('Accès refusé. Veuillez vous connecter.'); window.location.href='login.php';</script>";
    exit();
}

// ===================== Authentification =====================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $identifier = trim($_POST['identifier']);
    $password = trim($_POST['password']);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE (username = :id OR email = :id) AND password = :pwd");
    $stmt->execute(['id' => $identifier, 'pwd' => $password]);
    $user = $stmt->fetch();

    if ($user) {
        $_SESSION['admin'] = $user['username'];
        echo "<script>alert('Connexion réussie !'); window.location.href='index.php';</script>";
        exit();
    } else {
        $loginError = "Identifiants incorrects. Veuillez réessayer.";
    }
}

// ===================== Enregistrement de Compte =====================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    if (strlen($password) < 6) {
        $registerError = "Le mot de passe doit contenir au moins 6 caractères.";
    } elseif ($password !== $confirmPassword) {
        $registerError = "Les mots de passe ne correspondent pas.";
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);

        if ($stmt->rowCount() > 0) {
            $registerError = "Un compte avec cet email existe déjà.";
        } else {
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
            $stmt->execute(['username' => $username, 'email' => $email, 'password' => $password]);
            echo "<script>alert('Compte créé avec succès 🎉'); window.location.href='index.php';</script>";
            exit();
        }
    }
}

// ===================== Inscriptions d'élèves =====================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['inscription'])) {
    $nom = trim($_POST['nom']);
    $dateNaissance = $_POST['date_naissance'];
    $niveau = $_POST['niveau'];

    if (!$nom || !$dateNaissance || !$niveau) {
        echo "<script>alert('Veuillez remplir tous les champs !');</script>";
    } else {
        $stmt = $pdo->prepare("INSERT INTO inscriptions (nom, date_naissance, niveau) VALUES (:nom, :date_naissance, :niveau)");
        $stmt->execute(['nom' => $nom, 'date_naissance' => $dateNaissance, 'niveau' => $niveau]);
        echo "<script>alert('Inscription réussie pour $nom !');</script>";
    }
}

// ===================== Messagerie =====================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['message'])) {
    $nom = trim($_POST['nom']);
    $message = trim($_POST['message']);
    if ($message) {
        $stmt = $pdo->prepare("INSERT INTO messages (nom, message) VALUES (:nom, :message)");
        $stmt->execute(['nom' => $nom, 'message' => $message]);
        echo "<script>alert('Message envoyé !');</script>";
    }
}

// ===================== Examens =====================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['exam_submit'])) {
    $score = 0;
    $total = 0;
    $questions = json_decode(file_get_contents('questions.json'), true);

    foreach ($questions as $cours => $qs) {
        foreach ($qs as $index => $q) {
            $key = $cours . "_q" . $index;
            if (isset($_POST[$key]) && $_POST[$key] === $q['answer']) {
                $score++;
            }
            $total++;
        }
    }

    echo "<script>alert('Tu as eu $score bonnes réponses sur $total');</script>";
}

// ===================== Suppression d'un enseignant =====================
if (isset($_GET['delete_teacher'])) {
    $id = $_GET['delete_teacher'];
    $stmt = $pdo->prepare("DELETE FROM enseignants WHERE id = :id");
    $stmt->execute(['id' => $id]);
    echo "<script>alert('Enseignant supprimé.'); window.location.href='admin.php';</script>";
    exit();
}
?>
