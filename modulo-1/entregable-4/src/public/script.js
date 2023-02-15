const socket = io();

const paragraph = document.getElementById("paragraph")
const input = document.getElementById("input")

// LISTENERS
input.addEventListener("keyup", ( event ) => {
  let newProduct = event.target.value
  if(event.key === "Enter"){
    if(input.value.trim().length){
      socket.emit("message", newProduct)
    }
    input.value = ""
  }
})

// EMITER
socket.on("paragraph", data => {
  let html = data.map( (product) => {
    return `<span>Producto: ${product.prod}</span>`
  })
  paragraph.innerHTML = html
})