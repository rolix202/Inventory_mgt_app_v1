import { Router } from "express";
import { category_all_get, category_create_get, category_create_post, category_delete_get, category_one_get, category_update_get, category_update_post } from "../controllers/categoryController.js";
import { isGuest } from "../middleware/isUserLoggedIn.js";

const router = Router()

router.route("/new")
    .get(category_create_get)
    .post(isGuest, category_create_post);

router.get("/:id", category_one_get)

router.get("/:id/delete", isGuest, category_delete_get)

router.route("/:id/edit")
    .get(category_update_get)
    .post(isGuest, category_update_post)


router.get("/", category_all_get)


export default router