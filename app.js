const fs = require("node:fs");

const express = require("express");

const app = express();

function readBdFile(){
    return JSON.parse(fs.readFileSync("books.json", "utf-8"))
}

function writeBdFile(booksBdFile, newBook){
    return fs.writeFileSync('books.json', JSON.stringify([...booksBdFile, newBook]));
}

app.use(express.json());

app.get('/books', function (req, res){
    let books = readBdFile();
    res.send(books)
})

app.get("/book/:id", function (req, res){
    let books = readBdFile();
    let bookId = req.params.id
    let book = null;

    books.forEach(function (item, index){
        if(index === parseInt(bookId)){
            book = item;
        }
    })
    res.send(book)
})

app.put("/book/:id", function (req, res){
    let books = readBdFile();
    let body = req.body;
    let indexBook = req.params.id;
    books.forEach((book, index)=>{
        if(book.id ===  parseInt(indexBook)){
            books[index] = body
        }
    })
    fs.writeFileSync("books.json", JSON.stringify(books));
    res.send(`Books updated`);
})

app.delete("/book/:id", function (req, res){
    let bookId = req.params.id;
    let books = readBdFile();
    let index = -1;
    books.forEach(()=>{
        if (books.id === parseInt(bookId)) {
            index = books.id;
        }
    })
    if( index > -1 ){
        books.splice(index,1);
        fs.writeFileSync("books.json",  JSON.stringify(books));
        res.send("Successfully deleted")
    } else {
        res.status(400).send("Bad request");
    }


})

app.post("/book", function (req, res){
    let booksBdFile = readBdFile();
    let nameNewBook = req.body.name;
    let authorNewBook = req.body.author;
    let descriptionNewBook = req.body.description;
    let idBooks = []
    let newBook = { name: nameNewBook, author:authorNewBook, description:descriptionNewBook};
    for (let i = 0; i < booksBdFile.length; i++){
        idBooks.push(booksBdFile[i].id);
    }
    if(idBooks.includes(booksBdFile.length))
    {
        newBook.id = booksBdFile.length + 1
    }   else {
        newBook.id = booksBdFile.length
    }
    writeBdFile(booksBdFile,newBook);
    res.send(newBook)
})

app.listen(3000)