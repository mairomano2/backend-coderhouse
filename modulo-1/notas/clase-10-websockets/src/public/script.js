// LADO DEL CLIENTE
 // conecta al socket server y emite un evento del tipo conection
const socket = io()

// EMITIR Y ESCUCHAR EVENTOS

// EMITIR
// emit emite eventos. el primer param es un string con el que se va a identificar el tipo de evento(puede ser cualquier cosa)
socket.emit("message", "evento desde cliente socket")

// ESCUCHAR
// escucha el socket individual
socket.on("socketIndividual", data => {
  console.log(data)
})
// escucha el que envia a todos menos el socket acutal
socket.on("variosClientes", data => {
  console.log(data)
})
// escucha el que envia a todos los clientes
socket.on("todos", data => {
  console.log(data)
})