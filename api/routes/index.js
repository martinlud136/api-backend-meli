import { Router } from "express"
import itemsRouter from "./items.routes.js"


export function routerApi(app){

    const router = Router()

    app.use("/api/v1", router)

    router.use("/items", itemsRouter)
}

