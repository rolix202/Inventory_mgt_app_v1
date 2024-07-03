import asyncHandler from "express-async-handler"
import { body, validationResult } from "express-validator"
import Category from "../models/category.js"
import multer from "multer";
import path from "path";
import cloudinary from "cloudinary";
import fs from "fs";

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

        if (isMimeTypeValid && isExtNameValid) {
            cb(null, true);
        } else {
            cb(new Error("Image upload failed or invalid file type.", false))
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 }
})

export const index = asyncHandler(async (req, res, next) => {

    const [categories, items] = await Promise.all([
        Category.find({}, "name").exec(),
        items.find()
    ])

    res.render("homepage/index", { layout: false })
})

export const category_create_get = (req, res, next) => {
    res.render("category_form", { title: "Create New Product Category", category_details: {}, message: null, errors: [] })
}

export const category_create_post = [

    (req, res, next) => {
        upload.single('avatar')(req, res, function (err) {
            if (err instanceof multer.MulterError || err) {
                req.fileValidationError = err.message;
            } else if (!req.file) {
                req.fileValidationError = "Please upload an image file."
            }
            next()
        });
    },

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

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const category_details = {
            name: req.body.category_name,
            description: req.body.category_description
        };

        let errorArray = errors.array();
        if (req.fileValidationError) {
            errorArray.push({ msg: req.fileValidationError })
        }

        if (errorArray.length > 0) {

            if(req.file){
                await fs.promises.unlink(req.file.path);
            }

            return res.render("category_form", {
                title: "Create New Product Category",
                category_details: category_details,
                errors: errorArray
            });
        }

        if (req.file) {
            try {
                const response = await cloudinary.v2.uploader
                    .upload(req.file.path, {
                        folder: "Inventory_web_app",
                    })
                await fs.promises.unlink(req.file.path)

                category_details.category_image_public_id = response.public_id,
                category_details.category_image_secure_id = response.secure_url

            } catch (uploadError) {

                return res.render("category_form", {
                    title: "Create New Product Category",
                    category_details,
                    errors: [{ msg: "Image upload failed. Try again!" }]
                });
            }
        }

        try {
            const category = new Category(category_details)
            await category.save()

        } catch (dbError) {
            if (category_details.category_image_public_id) {
                await cloudinary.v2.uploader.destroy(category_details.category_image_public_id)
            }

            const errorMsg = dbError.code === 11000 ? "Category already exists!" : "Failed to create category. Try again!";
            return res.render("category_form", {
                title: "Create New Product Category",
                category_details,
                errors: [{ msg: errorMsg }],
            });
        }

    })
];


export const category_delete_get = (req, res, next) => {
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
