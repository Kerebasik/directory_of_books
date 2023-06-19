require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/bookRouter.js");
const fileMulter = require('./middlewares/multerConfig.js')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const DB_URL = "mongodb://127.0.0.1:27017/booksdb";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static("uploads"));
app.use(fileMulter.single("image"));

app.use('/api', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

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

module.exports = app;