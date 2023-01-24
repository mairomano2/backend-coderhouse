let username = prompt("Type your username");
const socket = io();

const input = document.getElementById("input");
const messagesDiv = document.getElementById("messagesDiv");

//emite el nuevo mensaje
input.addEventListener("keyup", (event) => {
  let newMessage = event.target.value;
  if (event.key === "Enter") {
    if (input.value.trim().length) {
      socket.emit("message", { username, newMessage });
    }
    input.value = "";
  }
});

//renderiza el mensaje
socket.on("renderMessage", (data) => {
  console.log("message script: ", data)
  let html = data.map((message) => {
    return `<p>${message.username}: ${message.newMessage}</p>`;
  });
  messagesDiv.innerHTML = html;
});

//TODO ver que actualice en tiempo real. ahora solo lo hace cuando se envia un nuevo mensaje