import express from "express";
import mongoose from "mongoose";

import router from "./src/routers/router.js";


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