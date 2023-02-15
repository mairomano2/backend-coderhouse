const express = require("express")
const apiRoutes = require("./routers/app.routers")

const PORT = process.env.PORT || 8080; 
const app = express()

app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use("/api", apiRoutes)


app.listen(PORT, () => {
  console.log("Server up and runing in port", PORT)
})