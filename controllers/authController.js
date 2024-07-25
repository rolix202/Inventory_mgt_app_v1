import asyncHandler from "express-async-handler"
import User from "../models/users.js"
import { sign_up_validation } from "../middleware/validationMiddleware.js"
import { validationResult } from "express-validator"

export const sign_up_get = (req, res, next) => {
    res.render("homepage/sign_up", {layout: false, item: false, errors: []})
}

export const sign_up_post = [
    ...sign_up_validation,

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.render("homepage/sign_up", {
                errors: errors.array(),
                layout: false, 
                item: false,
            })
        }

    const user = await User.create(req.body)

    if (!user){
        return res.render("homepage/sign_up", {
            errors: [{msg: "Could not create user. Try again!"}],
            layout: false, 
            item: false,
        })
    }

    req.flash("success", "User created successfully!")
    res.redirect("/login")
})]

export const login_get = (req, res, next) => {
    res.render("homepage/login", {layout: false, item: false})
}
