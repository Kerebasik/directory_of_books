const express = require("express");
const process = require("node:process");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true)

const app = express();
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    author: String,
    description: String
})

const Book = mongoose.model("Book", bookSchema);

app.use(express.json());

(async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/booksdb");
        app.listen(3000, ()=> console.log("Port 3000 is open....."))
    } catch (err){
        console.error(err)
    }
})();

app.get('/books', async function (req, res){
    try {
        const book = await Book.find({});
        res.send(book)
    } catch (err){
        console.error(err)
        res.sendStatus(500)
    }
})

app.get("/books/:id", async function (req, res){
    const id = req.params.id
    try {
        const book = await Book.find({_id:id});
        if(book) res.send(book);
        else res.sendStatus(404);
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }

})

app.put("/book/:id", async function (req, res){
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id
    const newBook = {...req.body}
    try {
        const result = await Book.findOneAndUpdate({_id:id}, newBook, {new:true});
        if (result) res.send(result);
        else res.sendStatus(404);
    } catch (err){
        console.error(err)
        res.sendStatus(500)
    }
})

app.delete("/book/:id",  async function (req, res){
    const idBook = req.params.id
    try{
        const result = await Book.findByIdAndDelete(idBook)
        if(result) res.send(result);
        else res.sendStatus(404);
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
})

app.post("/books", async function (req, res){
    if(!req.body) return res.sendStatus(400);
    const bookName = req.body.name;
    const bookAuthor = req.body.author;
    const bookDescription = req.body.description;
    const newBook = {
        name: bookName,
        author:bookAuthor,
        description:bookDescription
    }
    try {
        const book = new Book(newBook);
        await book.save();
        res.send(book);
    }
     catch (err){
        console.error(err);
        res.sendStatus(500);
    }
})

process.on("SIGINT",  async ()=>{
    await mongoose.disconnect();
    process.exit();
})