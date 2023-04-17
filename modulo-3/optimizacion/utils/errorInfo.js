generateErrorInfo = (product) => {
  return `Faltan propiedades. Propiedades requeridas:
  * titulo -> String. Se recibió ${product.title}.
  * precio -> Number. Se recibió ${product.price}`
}

module.exports = generateErrorInfo