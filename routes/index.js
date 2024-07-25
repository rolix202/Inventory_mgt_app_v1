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
      }))

/* GET home page. */
router.get('/', isUserLoggedIn, index);

export default router
