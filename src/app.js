const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/bookRouter.js");
const fileMulter = require('./middlewares/multerConfig.js')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const PORT = 3000
const DB_URL = "mongodb://127.0.0.1:27017/booksdb";
//const DB_URL = "mongodb+srv://Kerebasik:12345@atlascluster.5oe5ool.mongodb.net/?retryWrites=true&w=majority";

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

startApp().then(()=> console.log("Port 3000 is open....."));

module.exports = app;