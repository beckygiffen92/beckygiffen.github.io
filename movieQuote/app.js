const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/movieQuotes";
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/www/")

}
);

app.post("/addQuotes", (req, res)=>{
  db.collection("quotes").insertOne(req.body, (err,result)=>{
    if (err) throw err;
    console.log("Saved");
    res.redirect("/");
  }
)
var myQuote = {
  filmName: "Star Wars",
  characterName: "Obi Wan",
  quote: "hello there"
};
db.collection('quotes').insertOne(myQuote,(err,result)=>{
  if (err) throw err;
  console.log("Saved");
  res.redirect("/");

})
})


MongoClient.connect(url,(err, client)=>{
  if (err) throw err;
  console.log("Connection is successful");
  db = client.db("movieQuote");
})

app.listen (port, function(){
console.log(`App is listening on Port ${port}`);



});
