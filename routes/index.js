import { Router } from 'express';
import { index } from '../controllers/categoryController.js';
import { login_get, sign_up_get, sign_up_post } from '../controllers/authController.js';
import passport from 'passport';
import { isUserLoggedIn } from '../middleware/isUserLoggedIn.js';

const router = Router()


router.route("/sign-up")
    .get(sign_up_get)
    .post(sign_up_post)

router.route("/login")
    .get(login_get)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));

    router.get('/login/guest', (req, res, next) => {
        passport.authenticate('guest', (err, user, info) => {
            if (err) {
                console.error("Authentication error:", err);
                return next(err);
            }
            if (!user) {
                console.error("Guest user not found");
                console.log(user);
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error("Error logging in:", err);
                    return next(err);
                }
                console.log("Logged in as guest:", user);
                req.flash('success', 'Logged in as a guest.');
                return res.redirect('/');
            });
        })(req, res, next);
    });
    



/* GET home page. */
router.get('/', isUserLoggedIn, index);

export default router
