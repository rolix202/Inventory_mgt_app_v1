import asyncHandler from "express-async-handler"
import { body, validationResult } from "express-validator"
import Category from "../models/category.js"

export const index = asyncHandler(async(req, res, next) => {

    const [categories, items] = await Promise.all([
        Category.find({}, "name").exec(),
        items.find()
    ])

    res.render("homepage/index", {layout: false})
})

export const category_create_get = (req, res, next) => {
    res.render("category_form", {title: "Create New Product Category"})
}

export const category_create_post = [
    body("category_name")
        .notEmpty()
        .withMessage("Category name is required")
        .trim()
        .escape(),
    body("category_desctiption")
        .notEmpty()
        .withMessage("Category description is required")
        .trim()
        .escape(),

    asyncHandler((req, res, next) => {
        const errors = validationResult(req)

        const { category_name, category_description } = req.body
        // group them together in object
        // check for errors, if any, send it back to the form
        // send to database
        
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
