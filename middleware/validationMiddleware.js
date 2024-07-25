import { body } from "express-validator";

export const add_category_validation = [
    body("category_name")
        .notEmpty()
        .withMessage("Category name is required!")
        .trim()
        .escape(),
    body("category_description")
        .notEmpty()
        .withMessage("Category description is required!")
        .trim()
]

export const add_item_validation = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required!")
        .trim()
        .escape(),
    body("description")
        .notEmpty()
        .withMessage("Product description is required!")
        .trim(),
    body("category")
        .notEmpty()
        .withMessage("Choose product category!")
        .trim()
        .escape(),
    body("price")
        .notEmpty()
        .withMessage("Product price is required!")
        .trim()
        .escape(),
    body("number_in_stock")
        .notEmpty()
        .withMessage("Number of products in stock!")
        .trim()
        .escape(),
]

export const sign_up_validation = [
    body("username")
        .notEmpty()
        .withMessage("Username is required!")
        .trim()
        .escape(),
    body("password")
        .notEmpty()
        .withMessage("Password is required!")
        .trim()
        .escape()
]