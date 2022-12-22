async function getData () {
  const data = await fs.readFile("./db/products.json" , "utf-8");
  // const products = await JSON.parse(data);
  console.log(data)
}