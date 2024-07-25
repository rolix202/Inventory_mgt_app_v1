import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

import User from "../models/users.js";

passport.use(new LocalStrategy(async (username, password, done) => {
    try {

        if (!username || !password){
            return done(null, false, {
                message: "Please provide username or password!"
            })
        }

        const user = await User.findOne({username: username})

        if (!user || !(await user.comparePassword(password, user.password))){
            return done(null, false, {
                message: "Invalid Username or Password!"
            })
        }

        return done(null, user)
    } catch (error) {
        return done(error)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export default passport