import multer from "multer";
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'public/uploads')

if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, {recursive: true})
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const isMimeTypeValid = allowedTypes.test(file.mimetype);
        const isExtNameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (isMimeTypeValid && isExtNameValid){
            cb(null, true)
        } else {
            cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed.", false))
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 }
})

const fileUpload = (field_name) => (req, res, next) => {
    
    upload.single(field_name)(req, res, function(err){
        if (err instanceof multer.MulterError || err){
            req.fileValidationError = err.message;
        } 
        
        next()
    })
}

export default fileUpload