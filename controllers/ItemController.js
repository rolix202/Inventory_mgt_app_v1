import asyncHandler from "express-async-handler"
import fs from "fs"
import { validationResult } from "express-validator"
import cloudinary from "cloudinary"

import Category from "../models/category.js"
import fileUpload from "../middleware/multerMiddleware.js"
import { add_item_validation } from "../middleware/validationMiddleware.js"
import Item from "../models/items.js"


export const item_create_get = asyncHandler(async (req, res, next) => {

    const category = await Category.find({}, "name").exec()

    res.render("item_form", {
        title: "Add New Product",
        category,
        product_info: {},
        update: false,
        errors: []
    })
})

export const item_create_post = [
    fileUpload("avatar"),

    ...add_item_validation,

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const product_info = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock
        }

        const errorsArray = errors.array()

        if (req.fileValidationError) {
            errorsArray.push({ msg: req.fileValidationError })
        }

        const allCategory = await Category.find({}, "name").exec();

        for (const category of allCategory) {
            if (product_info.category === category._id.toString()) {
                category.selected = true;
            }
        }

        if (errorsArray.length > 0) {
            if (req.file) {
                await fs.promises.unlink(req.file.path)
            }
            return res.render("item_form", {
                title: "Add New Product",
                product_info,
                category: allCategory,
                update: false,
                errors: errorsArray
            })
        }

        if (req.file) {
            try {
                const response = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "Inventory_web_app",
                })

                await fs.promises.unlink(req.file.path)

                product_info.product_public_id = response.public_id,
                    product_info.product_secure_url = response.secure_url
            } catch (uploadError) {
                await fs.promises.unlink(req.file.path)

                return res.render("item_form", {
                    title: "Add New Product",
                    product_info,
                    category: allCategory,
                    update: false,
                    errors: [{ msg: "Image upload failed. Try again!" }]
                })
            }
        }

        try {
            const product = new Item(product_info)

            await product.save()

            res.redirect(product.url)
        } catch (dbError) {

            if (product_info.product_public_id) {
                await cloudinary.v2.uploader.destroy(product_info.product_public_id)
            }

            return res.render("item_form", {
                title: "Add New Product",
                product_info,
                category: allCategory,
                update: false,
                errors: [{ msg: "Failed to create category. Try again!" }]
            })
        }
    })
]

export const item_delete = (req, res, next) => {
    res.send("Delete Item")
}

export const item_update_get = asyncHandler(async (req, res, next) => {

    const [product_info, categories] = await Promise.all([
        Item.findById({ _id: req.params.id }).populate("category", "name"),
        Category.find({}, "name").exec()
    ])

    for (const category of categories) {
        if (product_info.category && product_info.category._id.toString() === category._id.toString()) {
            category.selected = true;
        }
    }

    const update = true

    res.render("item_form", {
        title: "Update Product",
        product_info,
        category: categories,
        update,
        errors: [],

    })
})

export const item_update_post = [
    fileUpload("avatar"),

    ...add_item_validation,

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const product_info = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock
        }

        const errorsArray = errors.array()

        if (req.fileValidationError){
            errorsArray.push({msg: req.fileValidationError})
        }

        const allCategory = await Category.find({}, "name").exec();

        for (const category of allCategory){
            if (product_info.category === category._id.toString()){
                category.selected = true;
            }
        }

        if (errorsArray.length > 0){
            if (req.file){
                await fs.promises.unlink(req.file.path)
            }

            return res.render("item_form", {
                title: "Update Product",
                product_info,
                category: allCategory,
                update: true,
                errors: errorsArray,
        
            })
        }

        if (req.file){
            try {
                const prev_info = await Item.find({_id: req.params.id}, "product_public_id").exec()

                await cloudinary.v2.uploader.destroy(prev_info.product_public_id)

                const response = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "Inventory_web_app"
                })

                await fs.promises.unlink(req.file.path)

                product_info.product_public_id = response.public_id,
                product_info.product_secure_url = response.secure_url

            } catch (uploadError) {
                await fs.promises.unlink(req.file.path)

                return res.render("item_form", {
                    title: "Update Product",
                    product_info,
                    category: allCategory,
                    update: true,
                    errors: [{ msg: "Image upload failed. Try again!" }]
                })
            }
        }

        try {
            const updated_product = new Item(product_info)

            await updated_product.save()
            res.redirect(product.url)
        } catch (dbError) {
            if (product_info.product_public_id) {
                await cloudinary.v2.uploader.destroy(product_info.product_public_id)
            }

            return res.render("item_form", {
                title: "Update Product",
                product_info,
                category: allCategory,
                update: true,
                errors: [{ msg: "Failed to create category. Try again!" }]
            })
        }
    })
]

export const item_one_get = (req, res, next) => {
    res.send("each item get")
}

export const item_all_get = asyncHandler(async (req, res, next) => {

    // const products = await Item.find().sort({ name: 1 }).populate("category", "name")
    const products = await Item.find({}, "name price number_in_stock product_secure_url").populate("category", "name").sort({name: 1}).exec()

    if (products === null) {
        const err = new Error("No Products found!")
        err.status = 404
        return next(err)
    }

    res.render("product_catalog", {
        title: "All Products",
        products
    })
})


