let username = prompt("Type your username");
const socket = io();

const input = document.getElementById("input");
const messagesDiv = document.getElementById("messagesDiv");

//emite el nuevo mensaje
input.addEventListener("keyup", (event) => {
  let newMessage = event.target.value;
  const obj = {username: username, newMessage}
  if (event.key === "Enter") {
    if (input.value.trim().length) {
      socket.emit("message", obj);
    }
    input.value = "";
  }
});

//renderiza el mensaje
// socket.on("showMessages", (messages) => {
//   console.log("msj")
//   //TODO aca no llega la info de los mensajes
//   let html = messages.map((message) => {
//     return `<p>${message.username}: ${message.newMessage}</p>`;
//   });
//   messagesDiv.innerHTML = html;
// });