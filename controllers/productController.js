import asyncHandler from "express-async-handler"
import { body, validationResult } from "express-validator"
import Category from "../models/category.js"
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        // const filename = file.originalname
        // cb(null, filename)
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
         cb(null, uniqueSuffix + path.extname(file.originalname))
    },
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const isMimeTypeValid = allowedTypes.test(file.mimetype);
        const isExtNameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (isMimeTypeValid && isExtNameValid){
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!", false))
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 }
})

export const index = asyncHandler(async(req, res, next) => {

    const [categories, items] = await Promise.all([
        Category.find({}, "name").exec(),
        items.find()
    ])

    res.render("homepage/index", {layout: false})
})

export const category_create_get = (req, res, next) => {
    res.render("category_form", {title: "Create New Product Category", errors: []})
}

export const category_create_post = [
    
    upload.single('avatar'),

    body("category_name")
        .notEmpty()
        .withMessage("Category name is required!")
        .trim()
        .escape(),
    body("category_description")
        .notEmpty()
        .withMessage("Category description is required!")
        .trim()
        .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)

        const { category_name, category_description } = req.body
        // group them together in object
        // check for errors, if any, send it back to the form
        // send to database

        if (!errors.isEmpty()){
            return res.render("category_form", {
                title: "Create New Product Category",
                category_details,
                errors: errors.array()
            })
        }

        
})]

export const category_delete_get =(req, res, next) => {
    res.send("Category deletion")
}

export const category_update_get = (req, res, next) => {
    res.send("Update category get")
}

export const category_update_post = (req, res, next) => {
    res.send("Category update form")
}

export const category_one_get = (req, res, next) => {
    res.send("Get a specific category")
}

export const category_all_get = (req, res, next) => {
    res.send("Get all category")
}
