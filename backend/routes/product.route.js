import express from 'express';

import { deleteProducts, getProducts , createProducts, updateProducts } from '../controllers/product.controller.js';

const router = express.Router();

//get api
router.get("/", getProducts);

//post api
router.post("/", createProducts);

//update api (put method - when updating all fields & path method - when updating some fields)
router.put("/:id", updateProducts)

//delete api
router.delete("/:id", deleteProducts);

export default router;