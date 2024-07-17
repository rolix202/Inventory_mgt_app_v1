import { Router } from "express";
const router = Router()

// import { index } from "../controllers/categoryController.js";
import { item_all_get } from "../controllers/ItemController.js";

router.get("/", item_all_get)

export default router