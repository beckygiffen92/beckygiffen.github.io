const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('www'));
app.get(`/aboutme.html`,(req,res)=>{
  res.sendFile(__dirname + `/aboutme.html`)
});
app.get("/index.html", (req, res) =>{
  res.sendFile(__dirname +`/index.html`)
});
app.get("/lovely.html", (req, res) =>{
  res.sendFile(__dirname +`/lovely.html`)
});
app.listen(port, ()=>{
  console.log(`listening on Port $(port)`);
})
