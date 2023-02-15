//NOTAS DE LA CLASE 7 DE SERVIDORES CON EXPRESS Y VERBOS HTTP

//VARIABLES GENERALES
const express = require('express');
// process.env.PORT es lo que se usa en entornos reales de trabajo. en caso de que no este va al 8080
const PORT = process.env.PORT || 8080; 
const users = [];
const app = express()

//ACTIVACION DE MEEDLEWEARS (1)
// .use() es una funcion que configura los meedlewears
// .json() es un meedleware para que la data que se envia sea en formato json para que sea apto para protocolos HTTP
app.use(express.json()); 

// express.urlencoded() es un meedlewear para que la data que llega se lea en formato como string y array
app.use(express.urlencoded({ extended: true }));

// RUTAS
// la funcion que sigue a app en cada ruta denota el metodo HTTP al que llama

// trae todos los users
app.get('/api/users', (req, res) => {
  res.json({
    status: "success", 
    data: users
  })
});

//usando los req.params trae un usuario en especifico
app.get('/api/users/:userName', (req, res) => {
  users
  res.json({
    status: "success",
    data: users
  })
});

// crea un usuario nuevo
app.post('/api/users/', (req, res) => {
  const user = req.body; // req.body es el json con la informacion que envia el usuario
  console.log("USER => ", user); // muestra por consola la respuesta
  if (!user.firstname || !user.lastname) { //si falta alguno de los dos campos envia un codigo de error
    return res.status(400).json({ // el codigo 400 indica un bad request
      status: "error",
      error: "Incomplete Values"
    });
  }
  users.push(user);
  res.json({
    status: "success",
    data: user
  });
})

// actualizar toda la info de un usuario
//por params llega el id del usuario nuevoy por req.body la info a actualizar
app.put('/api/users/:userName', (req, res) => { // se envia por params el id del usuario a actualizar
  const newUser = req.body;
  //validacion de que este toda la informacion del usuario cuando se envia la data
  if (!newUser.firstname || !newUser.lastname) {
    return res.status(400).json({
      status: "error",
      error: "Incomplete Values"
    });
  }
  // se busca la posicion del objeto con la info del array
  const userIndex = users.findIndex(user => user.firstname === req.params.userName);
  if (userIndex < 0) { // find index devuelve -1 si no se cumple la condicion y entra en el error
    return res.status(404).json({
      status: "error",
      error: "User not found"
    });
  }
  // se reemplazan los datos del usuario por los enviados en el doby en esa posicion del array
  users[userIndex] = newUser;
  console.log(users);
  res.json({
    status: "success",
    data: "User updated successfully"
  })
})

// borrar un usuario
app.delete('/api/users/:userName', (req, res) => {
  // no necesita body
  //se busca el usuario por params y se devuelve su indice en el array
  const userIndex = users.findIndex(user => user.firstname === req.params.userName);
  if (userIndex < 0) {
    return res.status(404).json({
      status: "error",
      error: "User not found"
    });
  }

  //splice elimina el elemento del array segun su indice
  users.splice(userIndex, 1);
  console.log(users);
  res.json({
    status: "success",
    data: "User deleted correctly"
  })
})


//ACTIVACION DEL SERVIDOR
app.listen(PORT, () => {
  console.log("Server is up and running in port", PORT);
});

// DEFINICIONES

//1- MEEDLEWARE:
//El middleware es un software con el que las diferentes aplicaciones se comunican entre sí. 
//Brinda funcionalidad para conectar las aplicaciones de manera inteligente y eficiente, de forma que se pueda innovar más rápido.
//tiene acceso al objeto de solicitud y al objeto de respueta