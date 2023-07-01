import express from "express"
import cors from "cors"
import {routerApi} from "./routes/index.js"

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

routerApi(app)

app.listen(port, ()=>{
    console.log('Mi port ' + port)
  })