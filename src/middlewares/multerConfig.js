const multerConfig = require('multer');

const storage = multerConfig.diskStorage({
    destination(req, file, cb){
      cb(null, "uploads");
    },
    filename(req,file, cb){
        cb(null,  Date.now() + "-" + file.originalname )
    }
});

const types = ["image/png","image/jpeg", "image/jpg"]

const fileFilter = (req, file, cb)=>{
    if(types.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multerConfig({storage, fileFilter});