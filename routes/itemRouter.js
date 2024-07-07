import { Router } from "express";
const router = Router()

import { item_all_get, item_create_get, item_create_post, item_delete, item_one_get, item_update_get, item_update_post } from "../controllers/ItemController.js";

router.route("/new")
    .get(item_create_get)
    .post(item_create_post)

router.route("/:id")
    .get(item_one_get)
    .get(item_delete)

router.route("/:id/edit")
    .get(item_update_get)
    .post(item_update_post)


router.get("/", item_all_get)

export default router