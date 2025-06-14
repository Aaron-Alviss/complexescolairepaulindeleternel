/* pour le formulaire de contact */
const form = document.getElementById("formContact");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const nom = document.getElementById("nom").value.trim();
  const message = document.getElementById("message").value.trim();

  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push({ nom, message });
  localStorage.setItem("messages", JSON.stringify(messages));

  alert("Message envoyé !");
  form.reset();
});


