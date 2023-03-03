const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/bookRouter.js");
const fileMulter = require('./src/middlewares/multerConfig.js')

const PORT = 3000
const DB_URL = "mongodb+srv://Kerebasik:12345@atlascluster.5oe5ool.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(express.static("uploads"));
app.use(fileMulter.single("image"));

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