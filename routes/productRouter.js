import { Router } from "express";
import { category_all_get, category_create_get, category_create_post, category_delete_get, category_one_get, category_update_get, category_update_post, index } from "../controllers/productController.js";

const router = Router()

router.get("/", index)
router.get("/category", category_create_get)
router.post("/category", category_create_post)

router.get("/category/:id/delete", category_delete_get)

router.get("/category/:id/update", category_update_get)
router.post("/category/:id/update", category_update_post)

router.get("/category/:id", category_one_get)
router.get("/category",  category_all_get)

export default router