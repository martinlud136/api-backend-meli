import { Router } from "express";

import { getItemsFromQuery, getItemFromId } from  "../controllers/items.controllers.js"

const router = Router()

router.get("/", getItemsFromQuery)
router.get("/:id", getItemFromId)

export default router