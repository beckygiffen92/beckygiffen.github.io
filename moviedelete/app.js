const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb://admin:password1@ds119606.mlab.com:19606/moviequotes";
const url = "mongodb://localhost:27017/moviequotes";
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; //New part here allows the port number to be deifned by host env (heroku)

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/www/")
});

app.post("/addQuotes", (req, res) => {
    db.collection("quotes").insertOne(req.body, (err, result) => {
        if (err) throw err;
        console.log("Saved");
        res.redirect("/");
    })
})

app.get("/getQuotes", (req, res) => {
    db.collection("quotes").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//Delete Route - uses the post HTTP Method as we can't call a delete from a form, but Mongo Handles the delete for us with .deleteOne. We are using the _id value to make sure that we identify and delete the correct post
app.post("/deleteQuotes/:id", (req, res) => {
    var id = req.params.id;
    db.collection("quotes").deleteOne({ _id: new mongo.ObjectId(id) }, (err, obj) => {
        if (err) throw err;
        console.log(`Successfully Deleted Post with id of ${id}`);
        res.redirect("/");
    });
});

MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log("Connection to Database has been successful");
    db = client.db("moviequotes");
});

app.listen(port, function () {
    console.log(`App Listening on Port ${port}`);
});
