let userName = prompt("Type your user name");
const socket = io();

const input = document.getElementById("input");
const messagesDiv = document.getElementById("messagesDiv");

//emite el nuevo mensaje
input.addEventListener("keyup", (event) => {
  let newMessage = event.target.value;
  const msj = { userName: userName, message: newMessage };
  if (event.key === "Enter") {
    if (input.value.trim().length) {
      socket.emit("newMessage", msj);
    }
    input.value = "";
  }
});

//renderiza el mensaje
socket.on("showMessages", (data) => {
  console.log("show ", data);
  //TODO aca no llega la info de los mensajes
  let html = data.map((message) => {
    return `<p>${message.userName}: ${message.message}</p>`;
  });
  messagesDiv.innerHTML = html;
});
