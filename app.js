const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const process = require("node:process");

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const app = express();
app.use(express.json());

(async ()=>{
    try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("booksdb").collection("books");
        app.listen(3000, ()=> console.log("Port 3000 is open....."))
    } catch (err){
        console.error(err)
    }
})();

app.get('/books', async function (req, res){
    const collection = req.app.locals.collection;
    try{
        const books = await collection.find({}).toArray();
        res.send(books);
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
})

app.get("/books/:id", async function (req, res){
    const collection = req.app.locals.collection;
    const id = new ObjectId(req.params.id);
    try{
        const book = await collection.findOne({_id:id});
        if(book) res.send(book);
        else res.sendStatus(404);
    } catch (err) {
        console.error(err)
        res.sendStatus(500);
    }

})

app.put("/book/:id", async function (req, res){
    if(!req.body) return res.sendStatus(400);
    const collection = app.locals.collection;
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await collection.findOneAndUpdate({_id:bookId},{
            $set:{...req.body}},{returnDocument: "after"})
        if (result.value) res.send(result.value);
        else res.sendStatus(404);
    } catch (err){
        console.error(err)
        res.sendStatus(500)
    }
})

app.delete("/book/:id",  async function (req, res){
    const bookId = new ObjectId(req.params.id);
    const collection = req.app.locals.collection;
    try{
        const result = await collection.findOneAndDelete({_id:bookId})
        if(result.value) res.send(result.value);
        else res.sendStatus(404);
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
})

app.post("/books", async function (req, res){
    if(!req.body) return res.sendStatus(400);
    const collection = req.app.locals.collection;
    const bookName = req.body.name;
    const bookAuthor = req.body.author;
    const bookDescription = req.body.description;
    const book = {
        name: bookName,
        author:bookAuthor,
        description:bookDescription
    }
    try {
        await collection.insertOne(book);
        res.send(book)
    }
     catch (err){
        console.error(err);
        res.sendStatus(500);
    }
})

process.on("SIGINT",  async ()=>{
    await mongoClient.close().then(()=> console.log("App close"))
    process.exit();
})