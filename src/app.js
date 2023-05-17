require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/bookRouter.js");
const fileMulter = require('./middlewares/multerConfig.js')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || "mongodb://mongodb:27017/booksdb";

const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(fileMulter.single("image"));

app.use('/api', router)
app.use('/doc-api', swaggerUi.serve, swaggerUi.setup(swaggerFile))

async function startApp(){
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT)
    } catch (err){
        console.error(err)
    }
}

startApp().then(()=> {
    console.log(DB_URL)
    console.log(`Port ${PORT}  is open....`)
});

process.on("SIGINT", async() => {
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});

module.exports = app;