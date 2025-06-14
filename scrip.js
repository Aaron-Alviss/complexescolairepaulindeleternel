/* pour l'inscription de compte d'un parentt ou un eleve*/
const form = document.getElementById('registerForm');
const errorDiv = document.getElementById('errorMessage');
const successDiv = document.getElementById('successMessage');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  errorDiv.textContent = '';
  successDiv.textContent = '';

  if (password.length < 6) {
    errorDiv.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
    return;
  }

  if (password !== confirmPassword) {
    errorDiv.textContent = 'Les mots de passe ne correspondent pas.';
    return;
  }

  // Stocker dans localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    errorDiv.textContent = 'Un compte avec cet email existe déjà.';
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  successDiv.textContent = 'Compte créé avec succès 🎉';

  form.reset();

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  successDiv.textContent = 'Compte créé avec succès 🎉';

  // Petite pause de 1.5 seconde avant redirection
  setTimeout(() => {
    window.location.href = 'index.html'; // Tu peux changer ce lien si nécessaire
  }, 1500);

  form.reset();

});