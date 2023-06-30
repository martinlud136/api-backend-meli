import express from "express"

import {routerApi} from "./routes/index.js"

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

routerApi(app)

app.listen(port, ()=>{
    console.log('Mi port ' + port)
  })