const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const identifier = document.getElementById('identifier').value.trim();
      const password = document.getElementById('login_password').value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Vérifie si l'utilisateur existe
      const foundUser = users.find(user =>
        (user.username === identifier || user.email === identifier) &&
        user.password === password
      );
 
      if (foundUser) {
        localStorage.setItem("newUser", foundUser.username);
        alert("Connexion réussie !");
        window.location.href = "index.html";
      } else {
        loginError.textContent = "Identifiants incorrects. Veuillez réessayer.";
      }
    });