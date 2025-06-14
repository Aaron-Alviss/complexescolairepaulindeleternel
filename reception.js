  // Charger les inscriptions
  const inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];
  const listeInscriptions = document.getElementById("listeInscriptions");

  if (inscriptions.length === 0) {
    listeInscriptions.innerHTML = "<li>Aucune inscription reçue.</li>";
  } else {
    inscriptions.forEach(eleve => {
      const item = document.createElement("li");
      item.textContent = `${eleve.nom} – Né(e) le ${eleve.dateNaissance} – Niveau : ${eleve.niveau}`;
      listeInscriptions.appendChild(item);
    });
  }

  // Charger les messages
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const listeMessages = document.getElementById("listeMessages");

  if (messages.length === 0) {
    listeMessages.innerHTML = "<li>Aucun message reçu.</li>";
  } else {
    messages.forEach(msg => {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${msg.nom} :</strong> ${msg.message}`;
      listeMessages.appendChild(item);
    });
  }