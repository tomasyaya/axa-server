const express = require('express')
const app = express()
const cors = require("cors")
const router = express.Router()
const bodyParser = require("body-parser")
const brastlewarkHandler = require("./getBrastlewark")

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors({
    origin: "*",
    credentials: false
}))

const route = router.post('/', brastlewarkHandler)

app.use("/", route)
 
module.exports = app