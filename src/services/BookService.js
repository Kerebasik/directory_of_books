const Book = require("../models/BookSchema.js");

class BookService {
    static async create(post){
        if(!post){
            throw new Error("Not Post");
        }
        return Book.create(post);
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
        return Book.findOneAndUpdate(post._id, post, {new:true});
    };

    static async delete(id){
        if(!id){
            throw new Error("Not ID")
        }
        return Book.findByIdAndDelete(id);
    }

    static async findName(name){
        if(!name){
            throw  new Error('Not name')
        }
        return Book.find({name:name});
    }
}

module.exports = { BookService };