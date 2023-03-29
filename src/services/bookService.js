const Book = require("../models/bookSchema.js");

class BookService {
    static async create(post){
        if(!post){
            throw new Error("Not Post");
        }
        const newBook = await Book.create(post);
        return newBook
    }
    static async findOne(id){
        if(!id){
            throw new Error('Not Id')
        }
        return Book.find({_id:id});
    }

    static async findAll(){
        return Book.find({});
    }

    static async update(post){
        if(!post){
            throw new Error("Not Post")
        }
        return Book.findOneAndUpdate({_id:post._id}, post, {new:true});
    };

    static async delete(id){
        if(!id){
            throw new Error("Not ID")
        }
        return Book.findByIdAndDelete(id);
    }

    static async findByName(name){
        if(!name){
            throw  new Error('Not name')
        }
        return Book.find({name:name});
    }

    static async findByAuthor(author){
        if(!author){
            throw new Error('Not author')
        }
        return Book.find({author: author})
    }
}

module.exports = { BookService };