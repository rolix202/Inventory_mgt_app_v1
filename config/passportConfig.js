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


// Strategy for guest users
// passport.use('guest', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
//     const guestUser = {
//         id: 'guest_user_id',
//         username: 'guest',
//         role: 'guest',
//     };
//     console.log("Guest user created:", guestUser);
//     return done(null, guestUser);  // Return the guest user directly
// }));



// passport.serializeUser((guestUser, done) => {
//     console.log("Serializing user:", guestUser.id);
//     done(null, guestUser.id);
// });

// passport.deserializeUser(async (id, done) => {
//     console.log("Deserializing user with ID:", id);
//     try {
//         if (id === 'guest_user_id') {
//             const guestUser = { id: 'guest_user_id', username: 'Guest', role: 'guest' };
//             console.log("Returning guest user:", guestUser);
//             return done(null, guestUser);
//         }

//         const user = await User.findById(id);
//         console.log("Returning regular user:", user);
//         done(null, user);
//     } catch (error) {
//         console.error("Error deserializing user:", error);
//         done(error);
//     }
// });


export default passport