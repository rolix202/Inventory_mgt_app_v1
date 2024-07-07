import { Router } from "express";
import { category_all_get, category_create_get, category_create_post, category_delete_get, category_one_get, category_update_get, category_update_post } from "../controllers/categoryController.js";

const router = Router()

router.route("/new")
    .get(category_create_get)
    .post(category_create_post);

router.route("/:id")
    .get(category_one_get)
    .get(category_delete_get)

router.route("/:id/edit")
    .get(category_update_get)
    .post(category_update_post)


router.get("/", category_all_get)


export default router