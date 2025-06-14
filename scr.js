const questions = {
    Math: [
        { question: "Combien font 2 + 2 ?", options: ["3", "4", "5"], answer: "4" },
        { question: "12+12 vaut?", options: ["24", "4", "5"], answer: "24" },
        { question: "Quelle est la racine carrée de 9 ?", options: ["2", "3", "4"], answer: "3" },
        { question: "combien font 10/2?", options:["5","15", "4,5"], answer:"5"},
    ],
    Francais: [
        { question: "Quel est le synonyme de 'joyeux' ?", options: ["triste", "heureux", "colère"], answer: "heureux" },
        { question: "Combien y a-t-il de lettres dans l’alphabet français ?", options: ["24", "26", "28"], answer: "26" }
   ],
    Latin: [
        { question: "Que signifie 'Carpe diem' ?", options: ["Profite du jour", "Va au marché", "Lis un livre"], answer: "Profite du jour" }
    ],

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

    startTimer(60); // 60 secondes pour tout l’examen
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

// Désactiver tous les boutons radio
const allRadios = document.querySelectorAll('input[type="radio"]');
allRadios.forEach(radio => {
radio.disabled = true;
});

// Supprimer le bouton de validation après réponse
const validationButton = document.querySelector("#quiz-container button");
if (validationButton) {
validationButton.disabled = true;
validationButton.innerText = "Réponses envoyées";
}
}