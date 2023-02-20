const chai = require('chai');
const expect = chai.expect;

const BookService = require('../src/services/BookService.js').BookService;


describe('Test functionality BookService',()=>{
    it('Create',  (done)=>{
        new Promise((resolve)=>{
            resolve(BookService.create({
                name: "Check my dead",
                author: "Junior Back",
                description: "Dead is my end"
            }));
        }).then((result)=>{
            expect(result).to.have.property('name').with.eql("Check my dead");
            expect(result).to.have.property('author').with.eql("Junior Back");
            expect(result).to.have.property('description').with.eql("Dead is my end");
            expect(result).to.have.property('_id');
            expect(result).to.be.a('object');
            done()
        })
    });
    it('findAll',  (done)=>{
        new Promise((resolve)=>{
            resolve(BookService.findAll());
        }).then((result)=>{
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object');
            expect(result[0]).to.have.property('name');
            expect(result[0]).to.have.property('author');
            expect(result[0]).to.have.property('description');
            expect(result[0]).to.have.property('_id');
            done()
        })
    });
    it('findOne',  (done)=>{
        new Promise((resolve)=>{
            resolve(BookService.findOne("63e640d9b8658af490156574"));
        }).then((result)=>{
            expect(result).to.be.a('array')
            expect(result[0]).to.be.a('object');
            expect(result[0]).to.have.property('name')
            expect(result[0]).to.have.property('author')
            expect(result[0]).to.have.property('description')
            expect(result[0]).to.have.property('_id')
            done()
        })
    });
    it('update',  (done)=>{
        new Promise((resolve)=>{
            resolve(BookService.update({
                _id: "63e10d064e94222145a08cd4",
                name: "Vinter is life2",
                author: "Vinter2",
                description: "Vinter"
            }));
        }).then((result)=>{
            expect(result).to.be.a('object');
            expect(result).to.have.property('_id');
            expect(result).to.have.property('name').with.eql('Vinter is life2');
            expect(result).to.have.property('author').with.eql('Vinter2');
            expect(result).to.have.property('description').with.eql('Vinter');
            done()
        })
    });
    // it('delete',  (done)=>{
    //     new Promise((resolve)=>{
    //         resolve(BookService.delete("63e3d63cb08c511b05aa46dc"));
    //     }).then((result)=>{
    //         expect(result).to.be.a('object');
    //         expect(result).to.have.property('_id');
    //         expect(result).to.have.property('name');
    //         expect(result).to.have.property('author');
    //         expect(result).to.have.property('description');
    //         done()
    //     })
    // })
})