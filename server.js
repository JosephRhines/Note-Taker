var fs = require("fs");
var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/db/db.json"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});





app.post("/api/notes", function(req, res) {
    const userNote = req.body;
    const data = fs.readFileSync(__dirname + "/Develop/db/db.json");
    const product = JSON.parse(data)
    userNote.id = product.length + 1;
    product.push(userNote)
      fs.writeFile(__dirname + "/Develop/db/db.json", JSON.stringify(product), "utf-8", function(err) {
          if (err) throw err
          
      })  
res.json(userNote);
})



app.delete("/api/notes/:id", function(req, res) {
    const remove = req.params.id;
    const data = fs.readFileSync(__dirname + "/Develop/db/db.json",);
    const product =JSON.parse(data)
    
    for(let i = 0; i < product.length; i++) {
        if(product[i].id == remove) {
        product.splice(i, 1)
        res.json(product)
          
        }
    
    
    }

    fs.writeFile(__dirname + "/Develop/db/db.json", JSON.stringify(product), "utf-8", function(err) {
        if (err) throw err
        
    })



})

app.listen(port, function() {
    console.log("server listening on: http://localhost:" + port)
})