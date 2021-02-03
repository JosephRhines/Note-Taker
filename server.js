var fs = require("fs");
var express = require("express");
var path = require("path");
var notes = []
var app = express();
var port = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./develop/public"));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/develop/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/develop/db/db.json"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/develop/public/index.html"));
});





app.post("/api/notes", function(req, res) {
    const userNote = req.body;
    const data = fs.readFileSync(__dirname + "/develop/db/db.json");
    const product = JSON.parse(data)
    userNote.id = product.length + 1;
    product.push(userNote)
      fs.writeFile(__dirname + "/develop/db/db.json", JSON.stringify(product), "utf-8", function(err) {
          if (err) throw err
          console.log("success")
      })  
res.json(userNote);
})



app.delete("/api/notes/:id", function(req, res) {
    const remove = req.params.id;
    const data = fs.readFileSync(__dirname + "/develop/db/db.json",);
    const product =JSON.parse(data)
    
    for(let i = 0; i < product.length; i++) {
        if(product[i].id == remove) {
        product.splice(i, 1)
        res.json(product)
          
        }
    
    
    }

    fs.writeFile(__dirname + "/develop/db/db.json", JSON.stringify(product), "utf-8", function(err) {
        if (err) throw err
        console.log("success")
    })



})

app.listen(port, function() {
    console.log("server listening on: http://localhost:" + port)
})