import mongoose from "mongoose";

mongoose.set('strictQuery', true)

const bookSchema = new mongoose.Schema( {
    name: {type: String, required:true},
    author: {type: String, required:true},
    description: String
})

export default mongoose.model('Book', bookSchema);