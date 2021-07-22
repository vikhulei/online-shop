require('dotenv').config()

const sequelize = require("./db")
const models = require("./models/models")
const express = require('express')
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middlware/ErrorHadlingMiddleware")
const path = require("path")

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use("/api", router)
app.use(errorHandler)

// app.get("/", (req, res) => {
//     res.status(200).json({message: "WORKING!!!"})
// })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Hello I am here - PORT ${PORT}`))
    } catch (e) {
        console.log("CANNOT ESTABLISH", e)
    }
}

start()