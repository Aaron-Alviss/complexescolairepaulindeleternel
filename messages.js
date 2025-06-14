document.addEventListener("DOMContentLoaded", function () {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const liste = document.getElementById("messageList");
    messages.forEach((msg, index) => {
        const li = document.createElement("li");
        li.textContent = `Message ${index + 1} : ${msg}`;
        liste.appendChild(li);
    });
});