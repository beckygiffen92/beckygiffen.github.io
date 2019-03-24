const Express = require("express");
const BodyParser = require("body-parser");
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const dbName = "movieQuotes";
//const url = `mongodb://localhost:27017`;
const url = "mongodb+srv://admin:Password123@cluster0-mhtdk.mongodb.net/test?retryWrites=true";//Change this to your own


var app = Express();
var port = process.env.PORT || 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) throw error;
    database = client.db(dbName);
    collection = database.collection("quotes");
    console.log(`Connected to ${dbName}`);
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/www/")
});


app.post("/addQuotes", (req, res) => {
    database.collection("quotes").insertOne(req.body, (err, result) => {
        if (err) throw err;
        console.log("Saved");
        res.redirect("/");
    })
})

app.get("/getQuotes", (req, res) => {
    database.collection("quotes").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//Delete Route - uses the post HTTP Method as we can't call a delete from a form, but Mongo Handles the delete for us with .deleteOne. We are using the _id value to make sure that we identify and delete the correct post
app.post("/deleteQuotes/:id", (req, res) => {
    var id = req.params.id;
    database.collection("quotes").deleteOne({ _id: new mongo.ObjectId(id) }, (err, obj) => {
        if (err) throw err;
        console.log(`Successfully Deleted Post with id of ${id}`);
        res.redirect("/");
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
