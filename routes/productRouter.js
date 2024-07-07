import { Router } from "express";
const router = Router()

import { index } from "../controllers/categoryController.js";

router.get("/", index)

export default router