import { Router } from 'express';
import { index } from '../controllers/categoryController.js';
const router = Router()

/* GET home page. */
router.get('/', index);

export default router
