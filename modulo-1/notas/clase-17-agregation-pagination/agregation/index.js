const mongoose = require("mongoose");
const { ordersModel } = require("./models/orders.model");
mongoose.set("strictQuery", false);
const connection = "agregation";

// se usa asi porque es un db local, no hosteada en atlas
const connect = async () => {
  await mongoose.connect(`mongodb://localhost:27017/${connection}`);
  console.log("connected to db");

  // a aggregate se le pasa un array de objs de parametro. cada obj viene a ser un paso dentro del filtrado
  const response = await ordersModel.aggregate([
    {
      // filtrar por size medium. match viene a ser como un filter
      $match: { size: "medium" },
    },
    {
      // $group es agrupar segun lo que se pase en el campo id (en este caso todos los que tengan el mismo name)7
      // $sum suma los elementos que sean tipo numero de una ropiedad
      // se le pone el $ para que identifique la propiedad dentro de un documento
      $group: { _id: "$name", total: { $sum: "$quantity" } },
    },
    {
      // sort ordena de menor a mayor si el param es 1 y si es -1 de mayor a menor segun la propiedad indicada
      $sort: { total: -1 },
    },
    {
      // se agrupa el resultado de la coleccion anterior
      $group: {
        _id: 1, // se pone cualquier cosa en el identificador porque se los reune a todos
        orders: {
          $push: "$$ROOT", // es el identificador de esa salida
        },
      },
    },
    {
      // $project pasa un nuevo documento con la informacion dentro de s obj
      $project: {
        _id: 0, // se le pone 0 para que mongo autogenere
        orders: "$orders",
      },
    },
    {
      // agrega la info que llega del stage anterior a una nueva coleccion
      $merge: {
        // el into dice a que coleccion se agrega
        into: "reports",
      },
    },
  ]);
  console.log(response);
};

connect();
