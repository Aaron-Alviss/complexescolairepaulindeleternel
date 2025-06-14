// ===================== Vérification de Connexion =====================
if (sessionStorage.getItem("adminConnecté") !== "oui" && window.location.pathname.includes("admin")) {
  alert("Accès refusé. Veuillez vous connecter.");
  window.location.href = "login.html";
}

// ===================== Authentification =====================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const identifier = document.getElementById('identifier').value.trim();
      const password = document.getElementById('login_password').value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(user =>
          (user.username === identifier || user.email === identifier) &&
          user.password === password
      );

      const loginError = document.getElementById('loginError');
      if (foundUser) {
          localStorage.setItem("newUser", foundUser.username);
          alert("Connexion réussie !");
          window.location.href = "index.html";
      } else {
          if (loginError) loginError.textContent = "Identifiants incorrects. Veuillez réessayer.";
      }
  });
}

// ===================== Enregistrement de Compte =====================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      const errorDiv = document.getElementById('errorMessage');
      const successDiv = document.getElementById('successMessage');
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

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(user => user.email === email)) {
          errorDiv.textContent = 'Un compte avec cet email existe déjà.';
          return;
      }

      users.push({ username, email, password });
      localStorage.setItem('users', JSON.stringify(users));

      successDiv.textContent = 'Compte créé avec succès 🎉';

      setTimeout(() => {
          window.location.href = 'index.html';
      }, 1500);
  });
}

// ===================== Inscriptions d'élèves =====================
document.addEventListener("DOMContentLoaded", () => {
  const formInscription = document.getElementById("formInscription");
  if (formInscription) {
      formInscription.addEventListener("submit", function (e) {
          e.preventDefault();

          const nom = document.getElementById("nom").value.trim();
          const dateNaissance = document.getElementById("date_naissance").value;
          const niveau = document.getElementById("niveau").value;

          if (!nom || !dateNaissance || !niveau) {
              alert("Veuillez remplir tous les champs !");
              return;
          }

          const eleve = { nom, dateNaissance, niveau };
          const inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];
          inscriptions.push(eleve);
          localStorage.setItem("inscriptions", JSON.stringify(inscriptions));

          alert("Inscription réussie pour " + nom + " !");
          formInscription.reset();
      });
  }

  // Affichage des inscriptions
  const listeInscriptions = document.getElementById("listeInscriptions");
  if (listeInscriptions) {
      const inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];
      if (inscriptions.length === 0) {
          listeInscriptions.innerHTML = "<li>Aucune inscription reçue.</li>";
      } else {
          inscriptions.forEach(eleve => {
              const li = document.createElement("li");
              li.textContent = `${eleve.nom} – Né(e) le ${eleve.dateNaissance} – Niveau : ${eleve.niveau}`;
              listeInscriptions.appendChild(li);
          });
      }
  }
});

// ===================== Messagerie =====================
document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("messageForm");
  if (messageForm) {
      messageForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const message = document.getElementById("nouveauMessage").value.trim();
          if (message) {
              const messages = JSON.parse(localStorage.getItem("messages")) || [];
              messages.push(message);
              localStorage.setItem("messages", JSON.stringify(messages));
              alert("Message publié !");
              document.getElementById("nouveauMessage").value = "";
          }
      });
  }

  const listeMessages = document.getElementById("listeMessages");
  if (listeMessages) {
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      if (messages.length === 0) {
          listeMessages.innerHTML = "<li>Aucun message reçu.</li>";
      } else {
          messages.forEach((msg, index) => {
              const item = document.createElement("li");
              item.innerHTML = `<strong>Message ${index + 1} :</strong> ${typeof msg === "string" ? msg : msg.message}`;
              listeMessages.appendChild(item);
          });
      }
  }

  // Formulaire de contact
  const contactForm = document.getElementById("formContact");
  if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const nom = document.getElementById("nom").value.trim();
          const message = document.getElementById("message").value.trim();

          const messages = JSON.parse(localStorage.getItem("messages")) || [];
          messages.push({ nom, message });
          localStorage.setItem("messages", JSON.stringify(messages));

          alert("Message envoyé !");
          contactForm.reset();
      });
  }
});

// ===================== Examens (Quiz) =====================
const questions = {
  Math: [
      { question: "Combien font 2 + 2 ?", options: ["3", "4", "5"], answer: "4" },
      { question: "12+12 vaut?", options: ["24", "4", "5"], answer: "24" },
      { question: "Quelle est la racine carrée de 9 ?", options: ["2", "3", "4"], answer: "3" },
      { question: "combien font 10/2?", options: ["5", "15", "4,5"], answer: "5" },
  ],
  Francais: [
      { question: "Quel est le synonyme de 'joyeux' ?", options: ["triste", "heureux", "colère"], answer: "heureux" },
      { question: "Combien y a-t-il de lettres dans l’alphabet français ?", options: ["24", "26", "28"], answer: "26" }
  ],
  Latin: [
      { question: "Que signifie 'Carpe diem' ?", options: ["Profite du jour", "Va au marché", "Lis un livre"], answer: "Profite du jour" }
  ]
};

let timerInterval;

function startTimer(duration = 60) {
  let time = duration;
  const timer = document.getElementById("timer");
  timer.textContent = `Temps restant : ${time}s`;
  timerInterval = setInterval(() => {
      time--;
      timer.textContent = `Temps restant : ${time}s`;
      if (time <= 0) {
          clearInterval(timerInterval);
          timer.textContent = "Temps écoulé !";
          checkAnswers();
      }
  }, 1000);
}

function startExam() {
  const selectedCourses = [];
  if (document.getElementById("Math").checked) selectedCourses.push("Math");
  if (document.getElementById("Francais").checked) selectedCourses.push("Francais");
  if (document.getElementById("Latin").checked) selectedCourses.push("Latin");

  if (selectedCourses.length === 0) {
      alert("Choisis au moins un cours !");
      return;
  }

  document.getElementById("text-exam").style.display = "none";
  document.getElementById("start-btn").style.display = "none";

  let quizHTML = "";
  selectedCourses.forEach(cours => {
      quizHTML += `<h3>${cours}</h3>`;
      questions[cours].forEach((q, i) => {
          quizHTML += `<p>${q.question}</p>`;
          q.options.forEach(opt => {
              quizHTML += `
                  <label>
                      <input type="radio" name="${cours}_q${i}" value="${opt}"> ${opt}
                  </label><br>`;
          });
      });
  });
  quizHTML += `<br><button onclick="checkAnswers()">Valider mes réponses</button>`;
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = quizHTML;
  quizContainer.style.display = "block";

  startTimer(60);
}

function checkAnswers() {
  clearInterval(timerInterval);
  let score = 0;
  let total = 0;

  for (const cours in questions) {
      questions[cours].forEach((q, i) => {
          const userAnswer = document.querySelector(`input[name="${cours}_q${i}"]:checked`);
          if (userAnswer && userAnswer.value === q.answer) {
              score++;
          }
          total++;
      });
  }

  document.getElementById("result").innerText = `Tu as eu ${score} bonnes réponses sur ${total}`;
  document.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
  const validationButton = document.querySelector("#quiz-container button");
  if (validationButton) {
      validationButton.disabled = true;
      validationButton.innerText = "Réponses envoyées";
  }
}

// ===================== Rideau d'accueil =====================
window.addEventListener('load', () => {
  const left = document.querySelector('.curtain-left');
  const right = document.querySelector('.curtain-right');
  const curtain = document.querySelector('.curtain');
  const content = document.querySelector('.page-content');

  if (left && right && curtain && content) {
      setTimeout(() => {
          left.style.transform = 'translateX(-100%)';
          right.style.transform = 'translateX(100%)';
      }, 500);

      setTimeout(() => {
          curtain.style.display = 'none';
          document.body.style.overflow = 'auto';
          content.style.opacity = 1;
      }, 2500);
  }
});

// ===================== Recherche dynamique =====================
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
      const filter = this.value.toLowerCase();
      const rows = document.querySelectorAll("#teacherTable tbody tr");
      rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(filter) ? "" : "none";
      });
  });
}

// ===================== Suppression d'un enseignant =====================
document.querySelectorAll(".delete-btn").forEach(button => {
  button.addEventListener("click", function () {
      if (confirm("Voulez-vous vraiment supprimer cet enseignant ?")) {
          this.closest("tr").remove();
      }
  });
});
