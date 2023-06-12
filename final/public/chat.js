let userName = prompt("Type your user name");
const socket = io();

const input = document.getElementById("input");
const messagesDiv = document.getElementById("messagesDiv");

//helpers
const renderMessage = (userName, message) => {
  const html = `<p>${userName}: ${message}</p>`;
  return html
}

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
socket.on("showMessages",async (data) => {
  let html = await data.map((message) => {
    return renderMessage(message.userName, message.message)
  });
  messagesDiv.innerHTML = html;
});
