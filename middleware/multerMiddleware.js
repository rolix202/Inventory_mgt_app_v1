import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
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
            cb(new Error("Image upload failed or Invalid file type.", false))
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 }
})

const fileUpload = (field_name) => (req, res, next) => {

    upload.single(field_name)(req, res, function(err){
        if (err instanceof multer.MulterError || err){
            req.fileValidationError = err.message;
        } else if (!req.file){
            req.fileValidationError = "Please upload an image file."
        }
        next()
    })
}

export default fileUpload