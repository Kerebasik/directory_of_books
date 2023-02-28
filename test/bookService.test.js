const chai = require('chai');
const expect = chai.expect;

const BookService = require('../src/services/bookService.js').BookService;

const newPost = {
    name: "Test",
    author: "Test",
    description: "Test"
}

let buffer;

describe('Test functionality BookService',()=>{
    it('create',  (done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newPost);
            resolve(buffer);
        }).then((result)=>{
            expect(result).to.have.property('name').with.eql(buffer.name);
            expect(result).to.have.property('author').with.eql(buffer.author);
            expect(result).to.have.property('description').with.eql(buffer.description);
            expect(result).to.have.property('_id').with.eql(buffer._id);
            expect(result).to.be.a('object');
            done()
        }).finally(()=>{
            BookService.delete(buffer._id);
        });
    });

    it('findAll',  (done)=>{
        new Promise((resolve)=>{
            buffer = BookService.findAll()
            resolve(buffer);
        }).then((result)=>{
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object');
            expect(result[0]).to.have.property('name');
            expect(result[0]).to.have.property('author');
            expect(result[0]).to.have.property('description');
            expect(result[0]).to.have.property('_id');
            done()
        });
    });

    it('findOne',  (done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.findAll();
            resolve(BookService.findOne(buffer[4]._id));
        }).then((result)=>{
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object');
            expect(result[0]).to.have.property('name').with.eql(buffer[4].name);
            expect(result[0]).to.have.property('author').with.eql(buffer[4].author);
            expect(result[0]).to.have.property('description').with.eql(buffer[4].description);
            expect(result[0]).to.have.property('_id').with.eql(buffer[4]._id);
            done()
        }).finally(()=>{
            BookService.delete(buffer._id);
        });
    });
    it('update',  (done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newPost);
            resolve(BookService.update(buffer));
        }).then((result)=>{
            expect(result).to.be.a('object');
            expect(result).to.have.property('_id').with.eql(buffer._id);
            expect(result).to.have.property('name').with.eql(buffer.name);
            expect(result).to.have.property('author').with.eql(buffer.author);
            expect(result).to.have.property('description').with.eql(buffer.description);
            done()
        }).finally(()=>{
            BookService.delete(buffer._id);
        });
    });
    it('delete',  (done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newPost)
            resolve(BookService.delete(buffer._id));
        }).then((result)=>{
            expect(result).to.be.a('object');
            expect(result).to.have.property('_id').with.eql(buffer._id);
            expect(result).to.have.property('name').with.eql(buffer.name);
            expect(result).to.have.property('author').with.eql(buffer.author);
            expect(result).to.have.property('description').with.eql(buffer.description);
            done()
        });
    });
    it('findByName',(done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newPost);
            resolve(BookService.findByName(buffer.name));
        }).then((result)=>{
            expect(result[0]).to.be.a('object');
            expect(result).to.be.a('array');
            expect(result[0]).to.have.property('_id');
            expect(result[0]).to.have.property('name').with.eql(buffer.name);
            expect(result[0]).to.have.property('author');
            expect(result[0]).to.have.property('description');
            done()
        }).finally(()=>{
            BookService.delete(buffer._id);
        })
    });

    it('findByAuthor',(done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newPost);
            resolve(BookService.findByAuthor(buffer.author));
        }).then((result)=>{
            expect(result[0]).to.be.a('object');
            expect(result).to.be.a('array');
            expect(result[0]).to.have.property('_id');
            expect(result[0]).to.have.property('name').with.eql(buffer.author);
            expect(result[0]).to.have.property('author');
            expect(result[0]).to.have.property('description');
            done()
        }).finally(()=>{
            BookService.delete(buffer._id);
        })
    });
})