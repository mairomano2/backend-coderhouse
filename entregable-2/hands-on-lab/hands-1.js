const fs = require("fs");

const date = new Date()
const currentDate = date.toLocaleDateString()
const currentHour = date.toLocaleTimeString()
const data = `"${currentDate} ${currentHour}"`

fs.writeFile("date.js", data, (err) => {
  if(err){
    console.log(err)
  } else {
    fs.readFile("date.js", "utf-8", (err, content) =>{
      if(err){
       return console.log(err)
      }
      console.log(content)
    })
  }
})