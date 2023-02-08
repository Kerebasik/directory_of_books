import Book from "../models/BookSchema.js";

class BookService {
    async create(post){
        if(!post){
            throw new Error("Not Post");
        }
        return Book.create(post);
    }
    async findOne(id){
        if(!id){
            throw  new Error('Not Id')
        }
        return Book.find({_id:id});
    }

    async findAll(){
        return Book.find({});
    }

    async update(post){
        if(!post){
            throw new Error("Not Post")
        }
        return Book.findOneAndUpdate({_id:post._id});
    }

    async delete(id){
        if(!id){
            throw new Error("Not ID")
        }
        return Book.findByIdAndDelete(id);
    }
}

export default new BookService()