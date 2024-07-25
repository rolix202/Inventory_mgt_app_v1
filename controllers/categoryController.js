import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator"
import Category from "../models/category.js"
import cloudinary from "cloudinary";
import fs from "fs";
import Item from "../models/items.js";
import fileUpload from "../middleware/multerMiddleware.js";
import { add_category_validation } from "../middleware/validationMiddleware.js";

export const index = asyncHandler(async (req, res, next) => {

    const categoriesWithCount = await Category.aggregate([
        {
            $lookup: {
                from: "items",
                localField: "_id",
                foreignField: "category",
                as: "items"
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                category_image_secure_id: 1,
                itemCount: {
                    $size: "$items"
                }
            }
        }
    ])

    categoriesWithCount.forEach((category) => {
        category.url = `/categories/${category._id}`
    })

    res.render("homepage/index", { 
        title: "Dashboard",
        categories: categoriesWithCount,
        item: false,
    })
})

export const category_create_get = (req, res, next) => {
    res.render("category_form", { title: "Create New Product Category", category_details: {}, message: null, errors: [], item: false })
}

export const category_create_post = [

    fileUpload("avatar"),
    ...add_category_validation,

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
                errors: errorArray,
                item: false
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
                    item: false,
                    errors: [{ msg: "Image upload failed. Try again!" }]
                });
            }
        }

        try {
            const category = new Category(category_details)
            await category.save()

            res.redirect(category.url)

        } catch (dbError) {
            if (category_details.category_image_public_id) {
                await cloudinary.v2.uploader.destroy(category_details.category_image_public_id)
            }

            const errorMsg = dbError.code === 11000 ? "Category already exists!" : "Failed to create category. Try again!";
            return res.render("category_form", {
                title: "Create New Product Category",
                category_details,
                item: false,
                errors: [{ msg: errorMsg }],
            });
        }

    })
];


export const category_delete_get = asyncHandler(async (req, res, next) => {
    const [category, products] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category: req.params.id}).populate("category", "name").exec()
    ])

    let title = ""

    products.forEach((product) => {
        title = product.category.name
    })

    const delete_product_msg = req.flash('error', "Category not empty! Delete the following products first!")
    const messages = req.flash('success')
    const errors = req.flash('error')
    const delete_msg = req.flash('deleted_message')


    if (products.length > 0){
        return res.render("product_catalog", {
            title: title,
            products,
            messages,
            errors,
            delete_msg,
            delete_product_msg,
            item: false
        })
    }
}) 

export const category_update_get = (req, res, next) => {
    res.send("Update category get")
}

export const category_update_post = (req, res, next) => {
    res.send("Category update form")
}

export const category_one_get = asyncHandler(async (req, res, next) => {
    const products = await Item.find({category: req.params.id}).populate("category", "name").exec()

    if (!products) {
        const err = new Error("No Products found!")
        err.status = 404
        return next(err)
    }

    let title = ""

    products.forEach((product) => {
        title = product.category.name
    })

    const messages = req.flash('success')
    const errors = req.flash('error')
    const delete_msg = req.flash('deleted_message')
    const delete_product_msg = req.flash('error', "Category not empty! Delete the following products first!")

    res.render("product_catalog", {
        title: title,
        products,
        messages,
        errors,
        delete_msg,
        delete_product_msg,
        item: false
    })
}) 

export const category_all_get = (req, res, next) => {
    res.send("Get all category")
}



