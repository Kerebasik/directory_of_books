const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/bookRouter.js");

const app = express();

const PORT = 3000
const DB_URL = "mongodb://127.0.0.1:27017/booksdb";

app.use(express.json());
app.use('/api', router)

async function startApp(){
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT)
    } catch (err){
        console.error(err)
    }
}

startApp().then(()=> console.log("Port 3000 is open....."));

module.exports = app;